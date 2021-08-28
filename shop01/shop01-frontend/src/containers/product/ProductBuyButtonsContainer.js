import React from 'react';
import { useSelector } from 'react-redux';
import ProductBuyButtons from '../../components/product/ProductBuyButtons';
import client from '../../lib/api/client';

const ProductBuyButtonsContainer = () => {
  const { product, totalAmount } = useSelector(({ product }) => ({
    product: product.read.product,
    totalAmount: product.read.totalAmount,
  }));

  const handleBuyButtonClick = async () => {
    const { data } = await client.post('/api/orders', {
      products: [product],
    });
    const { merchant_uid } = data;

    const { IMP } = window;

    IMP.init('imp04871174');

    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: merchant_uid,
        name: product.name,
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

          var msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
        } else {
          msg += '에러내용 : ' + rsp.error_msg;
        }

        alert(msg);
      },
    );
  };

  return <ProductBuyButtons onBuyButtonClick={handleBuyButtonClick} />;
};

export default ProductBuyButtonsContainer;
