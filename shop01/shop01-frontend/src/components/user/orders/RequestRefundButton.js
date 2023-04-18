import React from 'react';
import Button from '../../common/Button';

const RequestRefundButton = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      환불 요청
    </Button>
  );
};

export default RequestRefundButton;
