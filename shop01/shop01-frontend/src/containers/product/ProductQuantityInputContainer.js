import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductQuantityInput from '../../components/product/ProductQuantityInput';
import {
  changeField,
  decreaseQuantity,
  increaseQuantity,
  changeTotalAmount,
} from '../../modules/product';

const ProductQuantityInputContainer = () => {
  const dispatch = useDispatch();
  const { product, quantity, totalAmount } = useSelector(({ product }) => ({
    product: product.read.product,
    quantity: product.read.quantity,
    totalAmount: product.read.totalAmount,
  }));

  const handleDecreaseButtonClick = (difference) => {
    dispatch(decreaseQuantity(difference));
  };

  const handleIncreaseButtonClick = (difference) => {
    dispatch(increaseQuantity(difference));
  };

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    value = value.replace(/[^0-9]/g,'');

    if (value !== '') {
      value = parseInt(value);
    }

    dispatch(
      changeField({
        form: 'read',
        key: name,
        value: value,
      }),
    );
  };

  useEffect(() => {
    if (product) {
      const totalAmount = product.price * quantity;
      dispatch(changeTotalAmount(totalAmount));
    }
  }, [product, quantity, dispatch]);

  return (
    <ProductQuantityInput
      quantity={quantity}
      onDecreaseButtonClick={handleDecreaseButtonClick}
      onIncreaseButtonClick={handleIncreaseButtonClick}
      onChange={handleChange}
    />
  );
};

export default ProductQuantityInputContainer;
