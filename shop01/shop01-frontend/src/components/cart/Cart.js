import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tablet, Desktop } from '../../lib/styles/deviceLayout';
import palette from '../../lib/styles/palette';
import WhiteBox from '../common/WhiteBox';
import CheckAllBoxContainer from '../../containers/cart/CheckAllBoxContainer';
import DeleteItemsButtonContainer from '../../containers/cart/DeleteItemsButtonContainer';
import CheckBoxContainer from '../../containers/cart/CheckBoxContainer';
import DeleteItemButtonContainer from '../../containers/cart/DeleteItemButtonContainer';
import ItemQuantityInputContainer from '../../containers/cart/ItemQuantityInputContainer';
import SaveItemQuantityButtonContainer from '../../containers/cart/SaveItemQuantityButtonContainer';
import ShippingAddressBoxContainer from '../../containers/cart/ShippingAddressBoxContainer';
import OrderItemsButtonContainer from '../../containers/cart/OrderItemsButtonContainer';
import { IoAlertCircleSharp } from 'react-icons/io5';
import * as portals from 'react-reverse-portal';
import addComma from '../../lib/addComma';

const FlexBox = styled.div`
  display: flex;
`;

const CartBlock = styled.div`
  flex-grow: 1;
`;

const Heading = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
`;

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
    margin-bottom: 1rem;
  }
`;

const StickyBox = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 3.5rem;
  width: 280px;
  border-radius: 16px;
  margin-left: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);

  .shipping-address-box {
    margin-bottom: 1rem;
  }

  .button-box {
    margin-top: 1rem;
  }
`;

const ButtonsBox = styled.div`
  display: inline-flex;
  align-items: center;
  padding-bottom: 1rem;
`;

const CartItemListBlock = styled.ul``;

const CartItemBlock = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: max-content 1fr 2fr max-content 2fr max-content;
  column-gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${palette.gray[3]};

  .delete-button {
    display: flex;
    justify-content: flex-end;
  }

  &:first-child {
    border-top: 1px solid ${palette.gray[3]};
  }

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: max-content 1fr 1.5fr max-content;
    grid-template-rows: repeat(3, auto);
    row-gap: 0.5rem;
    column-gap: 0.5rem;

    .check-box {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    .product-name {
      grid-column: 2 / 4;
      grid-row: 1 / 2;
    }

    .delete-button {
      grid-column: 4 / 5;
      grid-row: 1 / 2;
    }

    .product-image {
      grid-column: 2 / 3;
      grid-row: 2 / 4;
    }

    .item-amount {
      grid-column: 3 / 5;
      grid-row: 2 / 3;
    }

    .item-quantity {
      grid-column: 3 / 5;
      grid-row: 3 / 4;
    }
  }
`;

const ProductImageBox = styled.div`
  position: relative;
  min-width: 100px;
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

const ProductName = styled.div`
  strong {
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

  @media ${(props) => props.theme.mobile} {
    padding: 0;
  }
`;

const ItemQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemAmount = styled.div`
  justify-self: center;

  .num {
    margin-right: 0.1rem;
    font-style: normal;
  }
`;

const TotalAmount = styled.dl`
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;

  dt {
    flex-shrink: 0;
    margin-right: 0.5rem;
  }

  .num {
    margin-right: 0.2rem;
    vertical-align: -1px;
    font-style: normal;
    font-size: 1.5rem;
    font-weight: 700;
  }

  @media ${(props) => props.theme.tablet} {
    margin-top: 2rem;
  }
`;

const FixedButtonBox = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0.25rem;
  background-color: white;
`;

const CartItem = React.memo(({ item }) => {
  return (
    <CartItemBlock>
      <div className="check-box">
        <CheckBoxContainer item={item} />
      </div>
      <Link className="product-image" to={`/product-detail/${item.id}`}>
        <ProductImageBox>
          <img src={`/images/${item.image}`} alt={item.name} />
        </ProductImageBox>
      </Link>
      <ProductName className="product-name">
        <strong>
          <Link to={`/product-detail/${item.id}`}>{item.name}</Link>
        </strong>
      </ProductName>
      <ItemQuantity className="item-quantity">
        <ItemQuantityInputContainer item={item} />
        <SaveItemQuantityButtonContainer item={item} />
      </ItemQuantity>
      <ItemAmount className="item-amount">
        <strong>
          <em className="num">{addComma(item.price * item.quantity)}</em>원
        </strong>
      </ItemAmount>
      <div className="delete-button">
        <DeleteItemButtonContainer item={item} />
      </div>
    </CartItemBlock>
  );
});

const CartItemList = ({ cart }) => {
  return (
    <CartItemListBlock>
      {cart && cart.map((item) => <CartItem key={item.id} item={item} />)}
    </CartItemListBlock>
  );
};

const Cart = ({ cart, totalAmount, loading, error }) => {
  const portalNode = React.useMemo(() => portals.createHtmlPortalNode(), []);

  if (error) {
    return (
      <CartBlock>
        <WhiteBox>에러가 발생했습니다.</WhiteBox>
      </CartBlock>
    );
  }

  if (loading || !cart) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <CartBlock>
        <WhiteBox>
          <EmptyCart>
            <IoAlertCircleSharp size="3rem" />
            <p>장바구니에 담긴 상품이 없습니다.</p>
          </EmptyCart>
        </WhiteBox>
      </CartBlock>
    );
  }

  return (
    <FlexBox>
      <CartBlock>
        <Tablet>
          <Heading>배송지</Heading>
          <WhiteBox marginBottom="2rem">
            <portals.OutPortal node={portalNode} />
          </WhiteBox>
        </Tablet>
        <Heading>담긴 상품</Heading>
        <WhiteBox>
          <ButtonsBox>
            <CheckAllBoxContainer />
            <DeleteItemsButtonContainer />
          </ButtonsBox>
          <CartItemList cart={cart} />
          <Tablet>
            <TotalAmount>
              <dt>총 상품 금액:</dt>
              <dd>
                <em className="num">{addComma(totalAmount)}</em>원
              </dd>
            </TotalAmount>
          </Tablet>
        </WhiteBox>
      </CartBlock>

      <Tablet>
        <FixedButtonBox>
          <OrderItemsButtonContainer />
        </FixedButtonBox>
      </Tablet>

      <Desktop>
        <StickyBox>
          <WhiteBox padding="1rem">
            <div className="shipping-address-box">
              <portals.OutPortal node={portalNode} />
            </div>
            <TotalAmount>
              <dt>총 상품 금액:</dt>
              <dd>
                <em className="num">{addComma(totalAmount)}</em>원
              </dd>
            </TotalAmount>
          </WhiteBox>
          <div className="button-box">
            <OrderItemsButtonContainer />
          </div>
        </StickyBox>
      </Desktop>

      <portals.InPortal node={portalNode}>
        <ShippingAddressBoxContainer />
      </portals.InPortal>
    </FlexBox>
  );
};

export default Cart;
