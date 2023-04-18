import React from 'react';
import Button from '../../common/Button';
import { BiCart } from 'react-icons/bi';

const AddToCartButton = ({ onClick }) => {
  return (
    <Button type="button" size="large" onClick={onClick} fullWidth>
      <BiCart size="1.5rem" />
      담기
    </Button>
  );
};

export default AddToCartButton;
