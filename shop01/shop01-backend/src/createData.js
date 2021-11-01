const bcrypt = require('bcrypt');
const {
  User,
  Role,
  Product,
  ProductCategory,
  ProductImage,
  OrderStatus,
} = require('./models');

module.exports = async function createData() {
  try {
    // 계정 권한 생성
    const userRole = await Role.create({
      name: 'USER',
    });
    const adminRole = await Role.create({
      name: 'ADMIN',
    });

    // 관리자 계정 생성
    const hash = await bcrypt.hash('1234', 12);
    const user = await User.create({
      email: 'mweapon@naver.com',
      password: hash,
      nick: '이승환',
      phone: '01011111111',
    });

    adminRole.addUser(user);

    // 카테고리 생성
    const category1 = await ProductCategory.create({ name: '책상' });
    const category2 = await ProductCategory.create({ name: '의자' });
    const category3 = await ProductCategory.create({ name: '침대' });

    const childCategory1 = await ProductCategory.create({
      name: '원목 책상',
      depth: 1,
    });
    const childCategory2 = await ProductCategory.create({
      name: '원목 의자',
      depth: 1,
    });
    const childCategory3 = await ProductCategory.create({
      name: '돌 침대',
      depth: 1,
    });

    const childCategory1_1 = await ProductCategory.create({
      name: '멀쩡한 원목 책상',
      depth: 2,
    });
    const childCategory1_2 = await ProductCategory.create({
      name: '썩은 원목 책상',
      depth: 2,
    });
    const childCategory2_1 = await ProductCategory.create({
      name: '멀쩡한 원목 의자',
      depth: 2,
    });
    const childCategory2_2 = await ProductCategory.create({
      name: '썩은 원목 의자',
      depth: 2,
    });
    const childCategory3_1 = await ProductCategory.create({
      name: '멀쩡한 돌 침대',
      depth: 2,
    });
    const childCategory3_2 = await ProductCategory.create({
      name: '박살난 돌 침대',
      depth: 2,
    });

    await category1.addSubCategory(childCategory1);
    await category2.addSubCategory(childCategory2);
    await category3.addSubCategory(childCategory3);

    await childCategory1.addSubCategory(childCategory1_1);
    await childCategory1.addSubCategory(childCategory1_2);
    await childCategory2.addSubCategory(childCategory2_1);
    await childCategory2.addSubCategory(childCategory2_2);
    await childCategory3.addSubCategory(childCategory3_1);
    await childCategory3.addSubCategory(childCategory3_2);

    // 상품 생성
    const desks = [...Array(20).keys()].map((i) => ({
      category_id: 1,
      name: `책상 #${i + 1}`,
      price: 100,
    }));
    const chair = [...Array(20).keys()].map((i) => ({
      category_id: 2,
      name: `의자 #${i + 1}`,
      price: 100,
    }));
    const beds = [...Array(20).keys()].map((i) => ({
      category_id: 3,
      name: `침대 #${i + 1}`,
      price: 100,
    }));

    const products = desks.concat(chair).concat(beds);

    for (let i = 0; i < products.length; i++) {
      let image = await ProductImage.create({
        name: 'logo.png',
        order: 1,
      });

      let product = await Product.create(products[i]);
      await product.addProductImage(image);
    }

    // 주문 상태 생성
    await OrderStatus.create({ name: 'PROCESSING' });
    await OrderStatus.create({ name: 'PAID' });
    await OrderStatus.create({ name: 'PAYMENT_FAILED' });
    await OrderStatus.create({ name: 'REFUNDED' });
    await OrderStatus.create({ name: 'REFUND_FAILED' });
  } catch (err) {
    console.log(err);
  }
};
