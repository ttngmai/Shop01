const bcrypt = require('bcrypt');
const {
  sequelize,
  Role,
  User,
  ShippingAddress,
  Product,
  ProductCategory,
  ProductImage,
  OrderStatus,
  Order,
  OrderDetail,
} = require('./models');

const createRoles = async (roles) => {
  for (let role of roles) {
    await Role.create({
      name: role.name,
    });
  }
};

const createCategories = async (categories, parentCategory = null) => {
  for (let category of categories) {
    let createdCategory = null;

    if (parentCategory) {
      createdCategory = await ProductCategory.create({
        name: category.name,
        depth: parentCategory.depth + 1,
        parent_id: parentCategory.id,
      });
    } else {
      createdCategory = await ProductCategory.create({
        name: category.name,
      });
    }

    if (category.children) {
      await createCategories(category.children, createdCategory);
    }
  }
};

const createOrderStatuses = async (orderStatuses) => {
  for (let orderStatus of orderStatuses) {
    await OrderStatus.create({
      name: orderStatus.name,
    });
  }
};

module.exports = async function createData() {
  const roles = [{ name: 'USER' }, { name: 'ADMIN' }];
  const categories = [
    {
      name: '침실',
      children: [{ name: '침대' }, { name: '매트리스' }, { name: '옷장' }],
    },
    {
      name: '거실',
      children: [
        { name: '소파' },
        { name: '수납장/장식장' },
        { name: 'TV/멀티미디어가구' },
      ],
    },
    {
      name: '주방',
      children: [
        { name: '주방 부속품' },
        { name: '주방 조리대' },
        { name: '주방 싱크대/수도꼭지' },
      ],
    },
    {
      name: '다이닝',
      children: [{ name: '식탁의자' }, { name: '식탁' }, { name: '식탁세트' }],
    },
  ];
  const orderStatuses = [
    { name: 'PROCESSING' },
    { name: 'PAID' },
    { name: 'PAYMENT_FAILED' },
    { name: 'REFUNDED' },
    { name: 'REFUND_FAILED' },
  ];

  try {
    // 계정 권한 생성
    await createRoles(roles);

    // 관리자 계정 생성
    const hashedPassword = await bcrypt.hash('1234', 12);
    const user = await User.create({
      email: 'mweapon@naver.com',
      password: hashedPassword,
      nick: '이승환',
      phone: '01011111111',
    });
    const adminRole = await Role.findOne({ name: 'ADMIN' });
    const shippingAddress = await ShippingAddress.create({
      post_code: '06035',
      address1: '서울 강남구 가로수길 5 (신사동)',
      is_default: true,
    });

    adminRole.addUser(user);
    user.addShippingAddress(shippingAddress);

    // 카테고리 생성
    await createCategories(categories);

    // 상품 생성
    const products1 = [...Array(20).keys()].map((i) => ({
      category_id: 1,
      name: `침실 가구 #${i + 1}`,
      price: 100,
    }));
    const products2 = [...Array(20).keys()].map((i) => ({
      category_id: 5,
      name: `거실 가구 #${i + 1}`,
      price: 100,
    }));
    const products3 = [...Array(20).keys()].map((i) => ({
      category_id: 9,
      name: `주방 가구 #${i + 1}`,
      price: 100,
    }));
    const products4 = [...Array(20).keys()].map((i) => ({
      category_id: 13,
      name: `다이닝 가구 #${i + 1}`,
      price: 100,
    }));

    const products = [...products1, ...products2, ...products3, ...products4];

    for (let i = 0; i < products.length; i++) {
      let product = await Product.create(products[i]);
      let image = await ProductImage.create({
        name: 'logo.png',
        order: 1,
      });

      product.addProductImage(image);
    }

    // 주문 상태 생성
    await createOrderStatuses(orderStatuses);

    // 주문 생성
    for (let i = 0; i < 20; i++) {
      let month = Math.floor(Math.random() * 12) + 1;
      let transaction = await sequelize.transaction();
      let order = await Order.create(
        {
          amount: 100,
          order_status_id: 2,
          user_id: 1,
          created_at: `2021-${month}-01 12:00:00`,
        },
        { transaction },
      );
      let orderDetail = await OrderDetail.create(
        {
          product_id: 1,
          name: '더미 데이터',
          price: 100,
          quantity: 1,
          image: 'logo.png',
        },
        { transaction },
      );

      await order.addOrderDetail(orderDetail, { transaction });

      await transaction.commit();
    }
  } catch (err) {
    console.log(err);
  }
};
