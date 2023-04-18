import React from 'react';
import SaveItemQuantityButton from '../../../components/user/cart/SaveItemQuantityButton';
import { updateItem } from '../../../lib/api/carts';

const SaveItemQuantityButtonContainer = ({ item }) => {
  const handleClick = () => {
    updateItem(item.id, item.quantity);
  };

  return <SaveItemQuantityButton onClick={handleClick} />;
};

export default SaveItemQuantityButtonContainer;
