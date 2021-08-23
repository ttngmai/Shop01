const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const db = {};
const User = require('./user');
const Role = require('./role');
const Product = require('./product');
const ProductCategory = require('./productCategory');
const ProductImage = require('./productImage');
const Cart = require('./cart');
const Order = require('./order');
const OrderDetail = require('./orderDetail');
const Comment = require('./comment');
const CommentImage = require('./commentImage');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;

db.User = User;
db.Role = Role;
db.Product = Product;
db.ProductCategory = ProductCategory;
db.ProductImage = ProductImage;
db.Cart = Cart;
db.Order = Order;
db.OrderDetail = OrderDetail;
db.Comment = Comment;
db.CommentImage = CommentImage;

User.init(sequelize);
Role.init(sequelize);
Product.init(sequelize);
ProductCategory.init(sequelize);
ProductImage.init(sequelize);
Cart.init(sequelize);
Order.init(sequelize);
OrderDetail.init(sequelize);
Comment.init(sequelize);
CommentImage.init(sequelize);

User.associate(db);
Role.associate(db);
Product.associate(db);
ProductCategory.associate(db);
ProductImage.associate(db);
Cart.associate(db);
Order.associate(db);
OrderDetail.associate(db);
Comment.associate(db);
CommentImage.associate(db);

module.exports = db;
