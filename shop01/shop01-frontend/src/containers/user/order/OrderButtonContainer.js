import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import client from '../../../lib/api/client';
import { createOrder, updateOrder } from '../../../lib/api/orders';
import OrderButton from '../../../components/user/order/OrderButton';

const orderStatusMap = {
  PROCESSING: 1,
  PAID: 2,
  PAYMENT_FAILED: 3,
  REFUNDED: 4,
  REFUND_FAILED: 5,
};

const OrderButtonContainer = ({ history, product, amount }) => {
  const { user, shippingAddress } = useSelector(
    ({ user, shippingAddress }) => ({
      user: user.user,
      shippingAddress: shippingAddress.read.shippingAddress,
    }),
  );

  const handleClick = async () => {
    if (!product || product.quantity === 0) {
      alert('잘못된 요청입니다.');
      return;
    }

    if (!shippingAddress) {
      alert('배송지를 선택해 주세요.');
      return;
    }

    const { data } = await createOrder({
      products: [product],
      amount,
    });
    let wl = window.location;
    let after_success_url = `${wl.protocol}//${wl.host}/items`;
    let after_failure_url = `${wl.protocol}//${wl.host}/items`;

    const { IMP } = window;

    IMP.init('imp04871174');

    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: data.merchant_uid,
        name: product.name,
        amount,
        buyer_email: user.email,
        buyer_name: user.nick,
        buyer_tel: user.phone,
        buyer_addr: `${shippingAddress.address1} ${shippingAddress.address2}`,
        buyer_postcode: shippingAddress.post_code,
        m_redirect_url: '/api/orders/iamport/mobile/complete',
        custom_data: { after_success_url, after_failure_url },
      },
      function (res) {
        if (res.success) {
          client.post('/api/orders/iamport/desktop/complete', res);

          history.push({
            pathname: '/user/order/success',
            state: { name: res.name, amount: res.paid_amount },
          });
        } else {
          updateOrder({
            id: data.id,
            order_status_id: orderStatusMap.PAYMENT_FAILED,
          });
          alert(res.error_msg);
        }
      },
    );
  };

  return <OrderButton amount={amount} onClick={handleClick} />;
};

export default withRouter(OrderButtonContainer);
