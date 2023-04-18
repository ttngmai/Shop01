const roleMap = {
  USER: 1,
  ADMIN: 2,
};

const orderStatusMap = {
  PROCESSING: 1,
  PAID: 2,
  PAYMENT_FAILED: 3,
  REFUNDED: 4,
  REFUND_FAILED: 5,
};

module.exports = {
  roleMap,
  orderStatusMap,
};
