const dotenv = require('dotenv');
const { sequelize } = require('../../models');
const axios = require('axios');
const Order = require('../../models/order');
const OrderDetail = require('../../models/orderDetail');

dotenv.config();

const orderStatusMap = {
  PROCESSING: 1,
  PAID: 2,
  PAYMENT_FAILED: 3,
  REFUNDED: 4,
  REFUND_FAILED: 5,
};

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
    } else if (iamportStatus === 'ready' && iamportAmount === dbAmount) {
      await Order.update(
        {
          imp_uid,
          order_status_id: orderStatusMap.PAID,
        },
        {
          where: { merchant_uid },
        },
      );
      res.json({ status: 'success', type: 'vbank' });
    } else {
      await Order.update(
        {
          imp_uid,
          order_status_id: orderStatusMap.PAYMENT_FAILED,
        },
        {
          where: { merchant_uid },
        },
      );
      res.status(400).json({ error: "Payment info dosen't match" });
    }
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
      { amount, user_id: user.id, order_status_id: orderStatusMap.PROCESSING },
      { transaction },
    );

    for (product of products) {
      const { name, price, quantity, image } = product;
      let orderDetail = await OrderDetail.create(
        { name, price, quantity, image },
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
    const orders = await Order.findAll({
      where: { user_id: user.id },
      include: [{ model: OrderDetail }],
      order: [['id', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    const { count: ordersCount } = await Order.findAndCountAll({
      where: { user_id: user.id },
    });

    res.set('Orders-Last-Page', Math.ceil(ordersCount / 10)).json(orders);
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
      return res.status(400).json({ message: '이미 전액 환불된 주문입니다.' });
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
