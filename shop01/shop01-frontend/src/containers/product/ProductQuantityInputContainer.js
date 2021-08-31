import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductQuantityInput from '../../components/product/ProductQuantityInput';
import {
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
  changeTotalAmount,
} from '../../modules/product';

const ProductQuantityInputContainer = () => {
  const dispatch = useDispatch();
  const { product } = useSelector(({ product }) => ({
    product: product.read.product,
  }));

  const handleDecreaseButtonClick = () => {
    const difference = 1;
    dispatch(decreaseQuantity(difference));
  };

  const handleIncreaseButtonClick = () => {
    const difference = 1;
    dispatch(increaseQuantity(difference));
  };

  const handleChange = (e) => {
    let { value } = e.target;

    value = value.replace(/[^0-9]/g, '');

    if (value !== '') {
      value = parseInt(value);
    }

    dispatch(changeQuantity(value));
  };

  useEffect(() => {
    if (product) {
      const totalAmount = product.price * product.quantity;
      dispatch(changeTotalAmount(totalAmount));
    }
  }, [product, dispatch]);

  return (
    <ProductQuantityInput
      product={product}
      onDecreaseButtonClick={handleDecreaseButtonClick}
      onIncreaseButtonClick={handleIncreaseButtonClick}
      onChange={handleChange}
    />
  );
};

export default ProductQuantityInputContainer;
