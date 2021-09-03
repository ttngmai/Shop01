import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import CheckAllBoxContainer from '../../containers/cart/CheckAllBoxContainer';
import CheckBoxContainer from '../../containers/cart/CheckBoxContainer';
import ItemDeleteButtonContainer from '../../containers/cart/ItemDeleteButtonContainer';
import addComma from '../../lib/addComma';

const CartBoxBlock = styled.div``;

const CartItemListBlock = styled.div``;

const CartItemBlock = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 8% 15% 35% 17% 17% 8%;
  padding: 1rem 0;
  border-bottom: 1px solid ${palette.gray[5]};

  &:first-child {
    border-top: 1px solid ${palette.gray[5]};
  }

  figure {
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: ${palette.gray[1]};
  }
`;

const ItemInfo = styled.div`
  display: flex;
  padding-left: 1rem;

  .product-name {
    display: block;
    font-weight: 400;
    white-space: pre-line;
    cursor: pointer;

    &:hover {
      color: ${palette.indigo[7]};
    }
  }
`;

const Amount = styled.div`
  .num {
    margin-right: 0.1rem;
    font-style: normal;
  }
`;

const CartItem = ({ item }) => {
  return (
    <CartItemBlock>
      <CheckBoxContainer item={item} />
      <figure
        className="product-image"
        style={{
          backgroundImage: `url('/images/${item.image}')`,
        }}
      />
      <ItemInfo>
        <strong className="product-name">
          <Link to={`product-detail/${item.id}`}>{item.name}</Link>
        </strong>
      </ItemInfo>
      <div>수량 조절 Input</div>
      <Amount>
        <strong className="amount">
          <em className="num">{addComma(item.price * item.quantity)}</em>원
        </strong>
      </Amount>
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

const Cart = ({ cart }) => {
  return (
    <CartBoxBlock>
      <CheckAllBoxContainer />
      <CartItemList cart={cart} />
    </CartBoxBlock>
  );
};

export default Cart;
