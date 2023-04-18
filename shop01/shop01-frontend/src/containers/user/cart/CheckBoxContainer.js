import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggleChecked } from '../../../modules/cart';
import CheckBox from '../../../components/user/cart/CheckBox';

const CheckBoxContainer = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(toggleChecked(item.id));
  }, [item, dispatch]);

  return <CheckBox item={item} onClick={handleClick} />;
};

export default CheckBoxContainer;
