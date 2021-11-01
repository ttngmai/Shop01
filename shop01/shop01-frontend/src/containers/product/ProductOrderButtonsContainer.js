import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import client from '../../lib/api/client';
import ProductOrderButtons from '../../components/product/ProductOrderButtons';
import ToastPortal from '../../lib/ToastPortal';

const ProductOrderButtonsContainer = ({ history }) => {
  const { product, totalAmount } = useSelector(({ product }) => ({
    product: product.read.product,
    totalAmount: product.read.totalAmount,
  }));

  const toastRef = useRef();

  const handleAddToCartButtonClick = async () => {
    await client.post('/api/carts', { product });
    toastRef.current.addMessage({
      mode: 'info',
      message: '해당 상품을 장바구니에 담았습니다.',
    });
  };

  const handleOrderButtonClick = async () => {
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

  return (
    <>
      <ProductOrderButtons
        onAddToCartButtonClick={handleAddToCartButtonClick}
        onOrderButtonClick={handleOrderButtonClick}
      />
      <ToastPortal ref={toastRef} autoClose />
    </>
  );
};

export default withRouter(ProductOrderButtonsContainer);
