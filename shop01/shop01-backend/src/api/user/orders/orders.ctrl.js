const dotenv = require('dotenv');
const { sequelize } = require('../../../models');
const { Op } = require('sequelize');
const axios = require('axios');
const Order = require('../../../models/order');
const OrderDetail = require('../../../models/orderDetail');
const Review = require('../../../models/review');
const { orderStatusMap } = require('../../../lib/columnMap');

dotenv.config();

const getIamportToken = async () => {
  const iamportToken = await axios.post(
    'https://api.iamport.kr/users/getToken',
    {
      imp_key: process.env.IMP_KEY,
      imp_secret: process.env.IMP_SECRET,
    },
  );
  const accessToken = iamportToken.data.response.access_token;

  if (!accessToken) {
    throw new Error('AccessToken is not exist');
  }

  return accessToken;
};

exports.validate = async (req, res, next) => {
  let isMobile = req.params.device === 'mobile';
  let { imp_uid, merchant_uid } = isMobile ? req.query : req.body;

  try {
    // AccessToken 가져오기
    const accessToken = await getIamportToken();

    // 아임포트 결제 정보 조회 API 호출
    const iamportPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: 'GET',
      headers: { Authorization: accessToken },
    });

    const iamportAmount = iamportPaymentData.data.response.amount;
    const iamportStatus = iamportPaymentData.data.response.status;

    const dbPaymentData = await Order.findOne({
      where: { merchant_uid },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.literal(
              '`OrderDetails`.`price` * `OrderDetails`.`quantity`',
            ),
          ),
          'amount',
        ],
      ],
      include: [
        {
          model: OrderDetail,
          attributes: [],
        },
      ],
    });

    const dbAmount = parseInt(dbPaymentData.dataValues.amount, 10);

    if (iamportStatus === 'paid' && iamportAmount === dbAmount) {
      await Order.update(
        {
          imp_uid,
          order_status_id: orderStatusMap.PAID,
        },
        {
          where: { merchant_uid },
        },
      );
      res.json({ status: 'success', type: 'payment' });
      return;
    }

    await Order.update(
      {
        imp_uid,
        order_status_id: orderStatusMap.PAYMENT_FAILED,
      },
      {
        where: { merchant_uid },
      },
    );

    res.status(400).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const user = req.user;
  const { products, amount } = req.body;

  try {
    const transaction = await sequelize.transaction();
    const order = await Order.create(
      { amount, order_status_id: orderStatusMap.PROCESSING, user_id: user.id },
      { transaction },
    );

    for (product of products) {
      const { id, name, price, quantity, image } = product;
      let orderDetail = await OrderDetail.create(
        { product_id: id, name, price, quantity, image },
        { transaction },
      );

      await order.addOrderDetail(orderDetail, { transaction });
    }

    await transaction.commit();

    res.json(order);
  } catch (err) {
    await transaction.rollback();

    console.log(err);
    next(err);
  }
};

exports.list = async (req, res, next) => {
  const user = req.user;
  const page = parseInt(req.query.page || '1', 10);

  if (page < 1) {
    res.status(400).end();
    return;
  }

  try {
    const ordersPerPage = 10;
    const orders = await Order.findAll({
      where: { user_id: user.id, order_status_id: orderStatusMap.PAID },
      include: [{ model: OrderDetail }],
      order: [['id', 'DESC']],
      limit: ordersPerPage,
      offset: (page - 1) * ordersPerPage,
    });

    const { count: ordersCount } = await Order.findAndCountAll({
      where: { user_id: user.id },
    });

    res
      .set('Orders-Total-Page', Math.ceil(ordersCount / ordersPerPage))
      .json(orders);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.chart = async (req, res, next) => {
  let { year, month } = req.query;

  if (Array.isArray(year)) {
    year = year[0];
  }

  if (Array.isArray(month)) {
    month = month[0];
  }

  const yearCondition = year
    ? sequelize.where(sequelize.fn('YEAR', sequelize.col('created_at')), year)
    : sequelize.where(
        sequelize.fn('YEAR', sequelize.col('created_at')),
        sequelize.fn('YEAR', sequelize.fn('NOW')),
      );
  const monthCondition = month
    ? sequelize.where(sequelize.fn('MONTH', sequelize.col('created_at')), month)
    : {};

  const whereClause = {
    [Op.and]: [
      yearCondition,
      monthCondition,
      { order_status_id: orderStatusMap.PAID },
    ],
  };

  try {
    const data = await Order.findAll({
      where: whereClause,
      attributes: [
        [sequelize.fn('YEAR', sequelize.col('created_at')), 'year'],
        [sequelize.fn('MONTH', sequelize.col('created_at')), 'month'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'amount'],
      ],
      order: [[sequelize.literal('month'), 'ASC']],
      group: ['year', 'month'],
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { order_status_id } = req.body;

  try {
    const updatedOrderCount = await Order.update(
      { order_status_id },
      { where: { id } },
    );

    if (updatedOrderCount[0] < 1) {
      res.status(404).end();
      return;
    }

    res.json(updatedOrderCount[0]);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.refund = async (req, res, next) => {
  const { merchant_uid, reason, cancel_request_amount } = req.body;

  try {
    const paymentData = await Order.findOne({ where: { merchant_uid } });
    const { imp_uid, amount, cancel_amount } = paymentData.dataValues;
    const cancelableAmount = amount - cancel_amount;

    if (cancelableAmount <= 0) {
      return res.status(400).end();
    }

    // AccessToken 가져오기
    const accessToken = await getIamportToken();

    // 아임포트 환불 API 호출
    const getCancelData = await axios({
      url: 'https://api.iamport.kr/payments/cancel',
      method: 'POST',
      headers: { Authorization: accessToken },
      data: {
        imp_uid,
        reason,
        amount: cancel_request_amount,
        checksum: cancelableAmount,
      },
    });

    const { response } = getCancelData.data;
    const isSuccess = !!response;

    if (isSuccess) {
      await Order.update(
        {
          order_status_id: orderStatusMap.REFUNDED,
          cancel_amount: response.cancel_amount,
        },
        {
          where: { merchant_uid },
        },
      );
    } else {
      await Order.update(
        {
          order_status_id: orderStatusMap.REFUND_FAILED,
        },
        {
          where: { merchant_uid },
        },
      );
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
