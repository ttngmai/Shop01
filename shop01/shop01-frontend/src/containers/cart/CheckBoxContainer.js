import React from 'react';
import { useDispatch } from 'react-redux';
import CheckBox from '../../components/cart/CheckBox';
import { toggleChecked } from '../../modules/cart';

const CheckBoxContainer = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleChecked(item.id));
  };

  return <CheckBox item={item} onClick={handleClick} />;
};

export default CheckBoxContainer;
