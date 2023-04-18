import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ItemQuantityInput from '../../../components/user/cart/ItemQuantityInput';
import {
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
} from '../../../modules/cart';

const ItemQuantityInputContainer = ({ item }) => {
  const dispatch = useDispatch();

  const handleDecreaseButtonClick = useCallback(() => {
    const difference = 1;
    dispatch(decreaseQuantity({ id: item.id, difference }));
  }, [item.id, dispatch]);

  const handleIncreaseButtonClick = useCallback(() => {
    const difference = 1;
    dispatch(increaseQuantity({ id: item.id, difference }));
  }, [item.id, dispatch]);

  const handleChange = useCallback(
    (e) => {
      let { value } = e.target;

      value = value.replace(/[^0-9]/g, '');

      if (value !== '') {
        value = parseInt(value);
      }

      if (value !== item.quantity) {
        dispatch(changeQuantity({ id: item.id, quantity: value }));
      }
    },
    [item.id, item.quantity, dispatch],
  );

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
