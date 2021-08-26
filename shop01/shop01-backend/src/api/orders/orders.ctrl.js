const Sequelize = require('sequelize');
const axios = require('axios');
const Order = require('../../models/order');
const OrderDetail = require('../../models/orderDetail');

const getIamportToken = async () => {
  const iamportToken = await axios.post(
    'https://api.iamport.kr/users/getToken',
    {
      imp_key: '2993379252229988',
      imp_secret:
        '4lP2EHCTHyg4jggSvv5urWitq8gze03jlSmZAYTix9mQqDIV8OqAKI3aRkK5kNpGGLGhKzzhJW79zQ5I',
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
    const iamportPayment = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: 'GET',
      headers: { Authorization: accessToken },
    });

    const iamportAmount = iamportPayment.data.response.amount;
    const iamportStatus = iamportPayment.data.response.status;

    const dbPayment = await axios({
      url: `http://localhost:4000/api/orders/${merchant_uid}`,
      method: 'GET',
    });

    const dbAmount = parseInt(dbPayment.data.amount, 10);

    console.log('--------------------');
    console.log(iamportStatus);
    console.log(iamportAmount);
    console.log(dbAmount);
    console.log('--------------------');

    if (iamportStatus === 'paid' && iamportAmount === dbAmount) {
      await Order.update(
        {
          imp_uid,
          status: 'PAID',
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
          status: 'PAID',
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
          status: 'FAILED',
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
  const { products } = req.body;

  try {
    const order = await Order.create();

    products.forEach(async (product) => {
      const { name, price } = product;
      let orderDetail = await OrderDetail.create({ name, price });

      order.addOrderDetail(orderDetail);
    });

    res.json(order);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.list = async (req, res, next) => {
  const page = parseInt(req.query.page || '1', 10);

  if (page < 1) {
    res.status(400).end();
    return;
  }

  try {
    const orders = await Order.findAll({
      include: [{ model: OrderDetail }],
      order: [['id', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    const ordersCount = await Order.count(); // 나중에 조건이 붙는다면 findAndCountAll() 사용해 볼 것!
    res.set('Orders-Last-Page', Math.ceil(ordersCount / 10)).json(orders);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.read = async (req, res, next) => {
  const { merchant_uid } = req.params;

  try {
    const order = await Order.findOne({
      where: { merchant_uid },
      attributes: [
        'id',
        'imp_uid',
        'merchant_uid',
        'cancel_amount',
        'status',
        'created_at',
        'user_id',
        [
          Sequelize.fn(
            'SUM',
            Sequelize.literal(
              '`OrderDetails`.`price` * `OrderDetails`.`count`',
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

    res.json(order);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.refund = async (req, res, next) => {
  const { merchant_uid } = req.params;

  try {
    const product = await Order.findOne({ where: { merchant_uid } });

    console.log('-----product-----');
    console.log(product);
    console.log('--------------------');

    // AccessToken 가져오기
    const accessToken = await getIamportToken();

    // 아임포트 환불 API 호출
    const refundRet = await axios({
      url: 'https://api.iamport.kr/payments/cancel',
      method: 'POST',
      headers: { Authorization: accessToken },
      data: {
        imp_uid: product.dataValues.imp_uid,
        // reason,
        checksum: product.dataValues.price,
      },
    });

    const isSuccess = !!refundRet.data.response;

    if (isSuccess) {
      // 환불 완료
      await Order.update(
        {
          status: 'REFUNDED',
        },
        {
          where: { merchant_uid },
        },
      );
    } else {
      // 환불 실패
      await Order.update(
        {
          status: 'REFUND_FAILED',
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
