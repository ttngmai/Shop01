import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import Responsive from '../../common/Responsive';
import PaginationContainer from '../../../containers/user/products/PaginationContainer';
import { IoAlertCircleSharp } from 'react-icons/io5';
import addComma from '../../../lib/util/addComma';

const ProductListBlock = styled(Responsive)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1em;
  margin-top: 3rem;
`;

const EmptyProductList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid ${palette.gray[5]};
  border-bottom: 1px solid ${palette.gray[5]};

  svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }
`;

const ProductItemBlock = styled.div`
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const ProductImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  overflow: hidden;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: ${palette.gray[1]};
    transition: all 0.2s linear;
  }

  img:hover {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;

  .product-category {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    color: ${palette.gray[5]};
  }

  .product-name {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 400;
    white-space: pre-line;

    a {
      display: block;
      cursor: pointer;

      &:hover {
        color: ${palette.indigo[7]};
      }
    }
  }

  .product-price {
    display: block;
  }

  .num {
    margin-right: 0.1rem;
    font-style: normal;
  }
`;

const PaginationBox = styled.div`
  padding: 3rem 0;
`;

const ProductItem = ({ product }) => {
  const image = product.ProductImages[0].name;
  const category = product.ProductCategory.name;
  const { id, name, price } = product;

  return (
    <ProductItemBlock>
      <Link to={`/product-detail/${id}`}>
        <ProductImageBox>
          <img src={`/images/${image}`} alt={name} />
        </ProductImageBox>
      </Link>
      <ProductInfo>
        <p className="product-category">{category}</p>
        <strong className="product-name">
          <Link to={`/product-detail/${id}`}>{name}</Link>
        </strong>
        <strong className="product-price">
          <em className="num">{addComma(price)}</em>원
        </strong>
      </ProductInfo>
    </ProductItemBlock>
  );
};

const ProductList = ({ products, loading, error }) => {
  if (error) {
    return <ProductListBlock>에러가 발생했습니다.</ProductListBlock>;
  }

  if (loading || !products) {
    return null;
  }

  if (products.length === 0) {
    <ProductListBlock>
      <EmptyProductList>
        <IoAlertCircleSharp />
        <p>상품 준비중 입니다.</p>
      </EmptyProductList>
    </ProductListBlock>;
  }

  return (
    <>
      <ProductListBlock>
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ProductListBlock>
      <PaginationBox>
        <PaginationContainer />
      </PaginationBox>
    </>
  );
};

export default ProductList;
