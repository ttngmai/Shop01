import React from 'react';
import Button from '../common/Button';
import { useMediaQuery } from 'react-responsive';

const EditShippingAddressButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      fullWidth={useMediaQuery({
        query: '(min-width: 1024px)',
      })}
    >
      배송지 변경
    </Button>
  );
};

export default EditShippingAddressButton;
