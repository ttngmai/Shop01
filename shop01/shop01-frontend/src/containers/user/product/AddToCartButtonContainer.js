import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import AddToCartButton from '../../../components/user/product/AddToCartButton';
import { addToCart } from '../../../lib/api/carts';
import ToastPortal from '../../../lib/portal/ToastPortal';

const AddToCartButtonContainer = () => {
  const { product } = useSelector(({ product }) => ({
    product: product.read.product,
  }));

  const toastRef = useRef();

  const handleClick = async () => {
    await addToCart(product);
    toastRef.current.addMessage({
      mode: 'info',
      message: '해당 상품을 장바구니에 담았습니다.',
    });
  };

  return (
    <>
      <AddToCartButton onClick={handleClick} />
      <ToastPortal ref={toastRef} autoClose />
    </>
  );
};

export default AddToCartButtonContainer;
