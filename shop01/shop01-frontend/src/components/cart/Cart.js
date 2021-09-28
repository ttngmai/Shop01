import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoAlertCircleSharp } from 'react-icons/io5';
import palette from '../../lib/styles/palette';
import CheckAllBoxContainer from '../../containers/cart/CheckAllBoxContainer';
import ItemsDeleteButtonContainer from '../../containers/cart/ItemsDeleteButtonContainer';
import CheckBoxContainer from '../../containers/cart/CheckBoxContainer';
import ItemDeleteButtonContainer from '../../containers/cart/ItemDeleteButtonContainer';
import ItemQuantityInputContainer from '../../containers/cart/ItemQuantityInputContainer';
import ItemQuantitySaveButtonContainer from '../../containers/cart/ItemQuantitySaveButtonContainer';
import ItemsOrderButtonContainer from '../../containers/cart/ItemsOrderButtonContainer';
import addComma from '../../lib/addComma';

const CartBlock = styled.div``;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-top: 1px solid ${palette.gray[3]};
  border-bottom: 1px solid ${palette.gray[3]};

  svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }
`;

const ButtonsBox = styled.div`
  display: inline-flex;
  align-items: center;
  padding-bottom: 1rem;
`;

const CartItemListBlock = styled.div``;

const CartItemBlock = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 3rem 1.5fr 3fr 2fr 2fr 3rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${palette.gray[3]};

  &:first-child {
    border-top: 1px solid ${palette.gray[3]};
  }
`;

const ProductImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: ${palette.gray[1]};
  }
`;

const ItemInfo = styled.div`
  padding: 0 1rem;

  .product-name {
    display: block;
    font-weight: 400;
    white-space: pre-line;
    cursor: pointer;

    &:hover {
      color: ${palette.indigo[7]};
    }

    a {
      display: block;
    }
  }
`;

const ItemQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemAmount = styled.div`
  justify-self: end;

  .num {
    margin-right: 0.1rem;
    font-style: normal;
  }
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;

  .total-amount {
    font-weight: 400;
  }

  .total-amount-label {
    margin-right: 0.5rem;
    font-size: 1rem;
  }

  .num {
    margin-right: 0.2rem;
    vertical-align: -1px;
    font-style: normal;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const CartItem = ({ item }) => {
  return (
    <CartItemBlock>
      <CheckBoxContainer item={item} />
      <Link to={`/product-detail/${item.id}`}>
        <ProductImageBox>
          <img src={`/images/${item.image}`} alt={item.name} />
        </ProductImageBox>
      </Link>
      <ItemInfo>
        <strong className="product-name">
          <Link to={`/product-detail/${item.id}`}>{item.name}</Link>
        </strong>
      </ItemInfo>
      <ItemQuantity>
        <ItemQuantityInputContainer item={item} />
        <ItemQuantitySaveButtonContainer item={item} />
      </ItemQuantity>
      <ItemAmount>
        <strong className="amount">
          <em className="num">{addComma(item.price * item.quantity)}</em>원
        </strong>
      </ItemAmount>
      <ItemDeleteButtonContainer item={item} />
    </CartItemBlock>
  );
};

const CartItemList = ({ cart }) => {
  return (
    <CartItemListBlock>
      {cart && cart.map((item) => <CartItem key={item.id} item={item} />)}
    </CartItemListBlock>
  );
};

const Cart = ({ cart, totalAmount, loading, error }) => {
  if (error) {
    return <CartBlock>에러가 발생했습니다.</CartBlock>;
  }

  if (loading || !cart) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <CartBlock>
        <EmptyCart>
          <IoAlertCircleSharp />
          <p>장바구니에 담긴 상품이 없습니다.</p>
        </EmptyCart>
      </CartBlock>
    );
  }

  return (
    <CartBlock>
      <ButtonsBox>
        <CheckAllBoxContainer />
        <ItemsDeleteButtonContainer />
      </ButtonsBox>
      <CartItemList cart={cart} />
      <TotalAmount>
        <strong className="total-amount">
          <span className="total-amount-label">총 상품 금액:</span>
          <em className="num">{addComma(totalAmount)}</em>원
        </strong>
      </TotalAmount>
      <ItemsOrderButtonContainer />
    </CartBlock>
  );
};

export default Cart;
