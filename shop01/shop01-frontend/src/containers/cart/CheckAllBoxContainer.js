import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { toggleAllChecked } from '../../modules/cart';
import CheckAllBox from '../../components/cart/CheckAllBox';

const CheckAllBoxContainer = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(
    ({ cart }) => ({
      cart: cart.cart,
    }),
    shallowEqual,
  );

  const [checkedItemCount, setCheckedItemCount] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(true);

  const handleClick = useCallback(() => {
    dispatch(toggleAllChecked(!isAllChecked));
  }, [isAllChecked, dispatch]);

  useEffect(() => {
    let tempCheckedItemCount = 0;

    cart &&
      cart.forEach((item) => {
        if (item.checked === true) tempCheckedItemCount++;
      });

    cart && cart.length === tempCheckedItemCount
      ? setIsAllChecked(true)
      : setIsAllChecked(false);

    setCheckedItemCount(tempCheckedItemCount);
  }, [cart]);

  return (
    <CheckAllBox
      itemCount={cart ? cart.length : 0}
      checkedItemCount={checkedItemCount}
      isAllChecked={isAllChecked}
      onClick={handleClick}
    />
  );
};

export default CheckAllBoxContainer;
