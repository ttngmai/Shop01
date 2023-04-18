import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import client from '../../../lib/api/client';
import { createOrder } from '../../../lib/api/orders';
import { deleteItems } from '../../../lib/api/carts';
import OrderItemsButton from '../../../components/user/cart/OrderItemsButton';

const OrderItemsButtonContainer = ({ history }) => {
  const { user, shippingAddress, cart, totalAmount } = useSelector(
    ({ user, shippingAddress, cart }) => ({
      user: user.user,
      shippingAddress: shippingAddress.read.shippingAddress,
      cart: cart.cart,
      totalAmount: cart.totalAmount,
    }),
  );

  const handleClick = async () => {
    const items = cart && cart.filter((item) => item.checked === true);

    if (!items || items.length === 0) {
      alert('구매할 상품을 선택해 주세요.');
      return;
    }

    if (!shippingAddress) {
      alert('배송지를 선택해 주세요.');
      return;
    }

    const { data } = await createOrder({
      products: items,
      amount: totalAmount,
    });
    const { merchant_uid } = data;
    const orderName =
      items.length > 1
        ? `${items[0].name} 외 ${items.length - 1}건`
        : `${items[0].name}`;
    const ids = items.map((item) => item.id);

    const { IMP } = window;

    IMP.init('imp04871174');

    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid,
        name: orderName,
        amount: totalAmount,
        buyer_email: user.email,
        buyer_name: user.nick,
        buyer_tel: user.phone,
        buyer_addr: `${shippingAddress.address1} ${shippingAddress.address2}`,
        buyer_postcode: shippingAddress.post_code,
        m_redirect_url: '/api/orders/iamport/mobile/complete',
      },
      function (res) {
        if (res.success) {
          client.post('/api/orders/iamport/desktop/complete', res);
          deleteItems(ids);

          history.push({
            pathname: '/user/order/success',
            state: { name: orderName, amount: res.paid_amount },
          });
        } else {
          alert(res.error_msg);
        }
      },
    );
  };

  return <OrderItemsButton amount={totalAmount} onClick={handleClick} />;
};

export default withRouter(OrderItemsButtonContainer);
