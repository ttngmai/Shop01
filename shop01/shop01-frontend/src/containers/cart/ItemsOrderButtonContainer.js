import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ItemsOrderButton from '../../components/cart/ItemsOrderButton';
import { deleteItems } from '../../lib/api/carts';
import { createOrder } from '../../lib/api/orders';
import client from '../../lib/api/client';

const ItemsOrderButtonContainer = ({ history }) => {
  const { cart, totalAmount } = useSelector(({ cart }) => ({
    cart: cart.cart,
    totalAmount: cart.totalAmount,
  }));

  const handleClick = async () => {
    const items = cart && cart.filter((item) => item.checked === true);

    if (!items || items.length === 0) {
      console.log('구매할 상품을 선택하세요!');
    } else {
      const { data } = await createOrder({
        products: items,
        amount: totalAmount,
      });
      const { merchant_uid } = data;
      const ids = items.map((item) => item.id);
      const name =
        items.length > 1
          ? `${items[0].name} 외 ${items.length - 1}종`
          : `${items[0].name}`;

      const { IMP } = window;

      IMP.init('imp04871174');

      IMP.request_pay(
        {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid,
          name,
          amount: totalAmount,
          buyer_email: 'iamport@siot.do',
          buyer_name: '구매자이름',
          buyer_tel: '010-1234-5678',
          buyer_addr: '서울특별시 강남구 삼성동',
          buyer_postcode: '123-456',
          m_redirect_url: '/api/orders/iamport/mobile/complete',
        },
        function (rsp) {
          if (rsp.success) {
            client.post('/api/orders/iamport/desktop/complete', rsp);
            deleteItems(ids);

            history.push({
              pathname: '/user/order/success',
              state: { name, amount: rsp.paid_amount },
            });
          } else {
            const msg = '에러내용 : ' + rsp.error_msg;
            alert(msg);
          }
        },
      );
    }
  };

  return <ItemsOrderButton onClick={handleClick} />;
};

export default withRouter(ItemsOrderButtonContainer);
