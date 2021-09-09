import React from 'react';
import ProductRefundButton from '../../components/orders/ProductRefundButton';
import { refund } from '../../lib/api/orders';

const ProductRefundButtonContainer = ({
  merchant_uid,
  reason,
  cancel_request_amount,
}) => {
  const handleClick = () => {
    refund({ merchant_uid, reason, cancel_request_amount });
  };

  return <ProductRefundButton onClick={handleClick} />;
};

export default ProductRefundButtonContainer;
