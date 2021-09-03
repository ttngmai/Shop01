import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckAllBox from '../../components/cart/CheckAllBox';
import { toggleAllChecked } from '../../modules/cart';

const CheckAllBoxContainer = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ cart }) => ({
    cart: cart.cart,
  }));

  const [checkedItemCount, setCheckedItemCount] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(true);

  const handleClick = () => {
    console.log('전체 선택 클릭!');
    dispatch(toggleAllChecked(!isAllChecked));
  };

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
      itemCount={cart && cart.length}
      checkedItemCount={checkedItemCount}
      isAllChecked={isAllChecked}
      onClick={handleClick}
    />
  );
};

export default CheckAllBoxContainer;
