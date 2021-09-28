const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const db = {};
const User = require('./user');
const Role = require('./role');
const ShippingAddress = require('./shippingAddress');
const Product = require('./product');
const ProductCategory = require('./productCategory');
const ProductImage = require('./productImage');
const Cart = require('./cart');
const Order = require('./order');
const OrderStatus = require('./orderStatus');
const OrderDetail = require('./orderDetail');
const Review = require('./review');
const ReviewImage = require('./reviewImage');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;

db.User = User;
db.Role = Role;
db.ShippingAddress = ShippingAddress;
db.Product = Product;
db.ProductCategory = ProductCategory;
db.ProductImage = ProductImage;
db.Cart = Cart;
db.Order = Order;
db.OrderStatus = OrderStatus;
db.OrderDetail = OrderDetail;
db.Review = Review;
db.ReviewImage = ReviewImage;

User.init(sequelize);
Role.init(sequelize);
ShippingAddress.init(sequelize);
Product.init(sequelize);
ProductCategory.init(sequelize);
ProductImage.init(sequelize);
Cart.init(sequelize);
Order.init(sequelize);
OrderStatus.init(sequelize);
OrderDetail.init(sequelize);
Review.init(sequelize);
ReviewImage.init(sequelize);

User.associate(db);
Role.associate(db);
ShippingAddress.associate(db);
Product.associate(db);
ProductCategory.associate(db);
ProductImage.associate(db);
Cart.associate(db);
Order.associate(db);
OrderStatus.associate(db);
OrderDetail.associate(db);
Review.associate(db);
ReviewImage.associate(db);

module.exports = db;
