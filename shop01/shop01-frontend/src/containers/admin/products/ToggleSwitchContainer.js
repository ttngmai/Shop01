import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateDisplay } from '../../../modules/products';
import ToggleSwitch from '../../../components/admin/products/ToggleSwitch';

const ToggleSwitchContainer = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(updateDisplay({ id: item.id, display: !item.display }));
  }, [item, dispatch]);

  return <ToggleSwitch item={item} onClick={handleClick} />;
};

export default ToggleSwitchContainer;
