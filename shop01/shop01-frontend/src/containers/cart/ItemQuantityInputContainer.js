import React from 'react';
import { useDispatch } from 'react-redux';
import ItemQuantityInput from '../../components/cart/ItemQuantityInput';
import {
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
} from '../../modules/cart';

const ItemQuantityInputContainer = ({ item }) => {
  const dispatch = useDispatch();

  const handleDecreaseButtonClick = () => {
    const difference = 1;
    dispatch(decreaseQuantity({ id: item.id, difference }));
  };

  const handleIncreaseButtonClick = () => {
    const difference = 1;
    dispatch(increaseQuantity({ id: item.id, difference }));
  };

  const handleChange = (e) => {
    let { value } = e.target;

    value = value.replace(/[^0-9]/g, '');

    if (value !== '') {
      value = parseInt(value);
    }

    if (value !== item.quantity) {
      dispatch(changeQuantity({ id: item.id, quantity: value }));
    }
  };

  return (
    <ItemQuantityInput
      item={item}
      onDecreaseButtonClick={handleDecreaseButtonClick}
      onIncreaseButtonClick={handleIncreaseButtonClick}
      onChange={handleChange}
    />
  );
};

export default ItemQuantityInputContainer;
