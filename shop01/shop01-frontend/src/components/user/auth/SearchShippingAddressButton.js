import React from 'react';
import Button from '../../common/Button';

const SearchShippingAddressButton = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      배송지 등록
    </Button>
  );
};

export default SearchShippingAddressButton;
