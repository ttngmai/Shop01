import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import addComma from '../../lib/addComma';

const ProductListBlock = styled(Responsive)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1em;
  margin-top: 3rem;
`;

const ProductItemBlock = styled.div`
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);

  .product-image {
    height: 0;
    padding-bottom: 70%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: lightgray;
  }

  .product-info {
    padding: 1em;
  }

  .product-category {
    display: inline-block;
    padding: 0.2em;
    margin-bottom: 1rem;
    border-radius: 0.5em;
    background-color: black;
    font-size: 0.75rem;
    color: white;
  }

  .product-name {
    display: block;
    padding-bottom: 1rem;
    font-weight: 400;
    white-space: pre-line;

    &:hover {
      color: ${palette.indigo[7]};
    }
  }

  .product-price {
    display: block;
  }

  .num {
    margin-right: 0.1875rem;
    font-style: normal;
    vertical-align: -1px;
    font-size: 1.5rem;
  }
`;
const ProductItem = ({ product }) => {
  const { name: image } = product.ProductImages[0];
  const { name: category } = product.ProductCategory;
  const { id, name, price } = product;

  return (
    <ProductItemBlock>
      <figure
        className="product-image"
        style={{
          backgroundImage: `url('http://localhost:4000/images/${image}')`,
        }}
      />
      <div className="product-info">
        <p className="product-category">{category}</p>
        <strong className="product-name">
          <Link to={`product-detail/${id}`}>{name}</Link>
        </strong>
        <strong className="product-price">
          <em className="num">{addComma(price)}</em>원
        </strong>
      </div>
    </ProductItemBlock>
  );
};

const ProductList = ({ products, loading, error }) => {
  if (error) {
    return <ProductListBlock>에러가 발생했습니다.</ProductListBlock>;
  }

  return (
    <ProductListBlock>
      {!loading &&
        products &&
        products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
    </ProductListBlock>
  );
};

export default ProductList;
