import React from 'react';
import ItemQuantitySaveButton from '../../components/cart/ItemQuantitySaveButton';
import { updateItem } from '../../lib/api/carts';

const ItemQuantitySaveButtonContainer = ({ item }) => {
  const handleClick = () => {
    updateItem(item.id, item.quantity);
  };

  return <ItemQuantitySaveButton onClick={handleClick} />;
};

export default ItemQuantitySaveButtonContainer;
