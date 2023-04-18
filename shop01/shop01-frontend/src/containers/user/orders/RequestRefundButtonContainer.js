import React from 'react';
import RequestRefundButton from '../../../components/user/orders/RequestRefundButton';
import { refund } from '../../../lib/api/orders';

const RequestRefundButtonContainer = ({
  merchant_uid,
  reason,
  cancel_request_amount,
}) => {
  const handleClick = () => {
    refund({ merchant_uid, reason, cancel_request_amount });
  };

  return <RequestRefundButton onClick={handleClick} />;
};

export default RequestRefundButtonContainer;
