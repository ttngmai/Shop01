import React from 'react';
import styled from 'styled-components';
import { Tablet, Desktop } from '../../lib/styles/deviceLayout';
import palette from '../../lib/styles/palette';
import WhiteBox from '../common/WhiteBox';
import ShippingAddressBoxContainer from '../../containers/cart/ShippingAddressBoxContainer';
import OrderButtonContainer from '../../containers/order/OrderButtonContainer';
import * as portals from 'react-reverse-portal';
import addComma from '../../lib/addComma';

const FlexBox = styled.div`
  display: flex;
`;

const OrderViewerBlock = styled.div`
  flex-grow: 1;
`;

const Heading = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.25rem;
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
  }
`;

const ProductQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductAmount = styled.div`
  justify-self: center;

  .num {
    margin-right: 0.1rem;
    font-style: normal;
  }
`;

const ProductBlock = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 2fr 2fr;
  column-gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid ${palette.gray[3]};
  border-bottom: 1px solid ${palette.gray[3]};

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: max-content 1fr;
    grid-template-rows: repeat(2, auto);
    row-gap: 0.5rem;
    column-gap: 0.5rem;

    ${ProductImageBox} {
      grid-column: 1 / 2;
      grid-row: 2 / 4;
    }

    ${ProductName} {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }

    ${ProductQuantity} {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }

    ${ProductAmount} {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }
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
    font-size: 2rem;
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

const Product = ({ product }) => {
  return (
    <ProductBlock>
      <ProductImageBox>
        <img src={`/images/${product.image}`} alt={product.name} />
      </ProductImageBox>
      <ProductName>
        <strong>{product.name}</strong>
      </ProductName>
      <ProductQuantity>
        <span>{product.quantity}개</span>
      </ProductQuantity>
      <ProductAmount>
        <strong>
          <em className="num">{addComma(product.price * product.quantity)}</em>
          원
        </strong>
      </ProductAmount>
    </ProductBlock>
  );
};

const OrderViewer = ({ product, amount }) => {
  const portalNode = React.useMemo(() => portals.createHtmlPortalNode(), []);

  return (
    <FlexBox>
      <OrderViewerBlock>
        <Tablet>
          <Heading>배송지</Heading>
          <WhiteBox marginBottom="2rem">
            <portals.OutPortal node={portalNode} />
          </WhiteBox>
        </Tablet>
        <Heading>주문 상품</Heading>
        <WhiteBox>
          <Product product={product} />
          <Tablet>
            <TotalAmount>
              <dt>총 상품 금액:</dt>
              <dd>
                <em className="num">{addComma(amount)}</em>원
              </dd>
            </TotalAmount>
          </Tablet>
        </WhiteBox>
      </OrderViewerBlock>
      <Desktop>
        <StickyBox>
          <WhiteBox padding="1rem">
            <div className="shipping-address-box">
              <portals.OutPortal node={portalNode} />
            </div>
            <TotalAmount>
              <dt>총 상품 금액:</dt>
              <dd>
                <em className="num">{addComma(amount)}</em>원
              </dd>
            </TotalAmount>
          </WhiteBox>
          <div className="button-box">
            <OrderButtonContainer product={product} amount={amount} />
          </div>
        </StickyBox>
      </Desktop>
      <Tablet>
        <FixedButtonBox>
          <OrderButtonContainer product={product} amount={amount} />
        </FixedButtonBox>
      </Tablet>
      <portals.InPortal node={portalNode}>
        <ShippingAddressBoxContainer />
      </portals.InPortal>
    </FlexBox>
  );
};

export default OrderViewer;
