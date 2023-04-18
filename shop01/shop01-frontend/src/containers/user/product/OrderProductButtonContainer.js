import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import OrderProductButton from '../../../components/user/product/OrderProductButton';

const OrderProductButtonContainer = ({ history }) => {
  const { product, totalAmount } = useSelector(({ product }) => ({
    product: product.read.product,
    totalAmount: product.read.totalAmount,
  }));

  const handleClick = async () => {
    if (product.quantity === 0) {
      alert('구매할 상품을 선택해 주세요.');
      return;
    }

    history.push({
      pathname: '/user/order',
      state: {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          image: product.ProductImages[0].name,
        },
        amount: totalAmount,
      },
    });
  };

  return <OrderProductButton onClick={handleClick} />;
};

export default withRouter(OrderProductButtonContainer);
