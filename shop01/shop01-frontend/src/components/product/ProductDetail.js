import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import ProductBuyButtonsContainer from '../../containers/product/ProductBuyButtonsContainer';
import addComma from '../../lib/addComma';

const ProductDetailBlock = styled(Responsive)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
  margin-top: 3rem;
`;

const ProductImagesBlock = styled.div`
  .product-image {
    height: 0;
    padding-bottom: 70%;
    margin-bottom: 0.5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: lightgray;
  }

  .product-image-list {
    display: flex;
    justify-content: center;
    align-items: center;

    figure {
      width: 100px;
      height: 0;
      padding-bottom: 70%;
      margin: 0 0.25rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-color: lightgray;
      opacity: 0.5;
      cursor: pointer;

      &.active {
        border: 2px solid ${palette.indigo[7]};
        opacity: 1;
      }
    }
  }
`;

const ProductInfoBlock = styled.div`
  display: flex;
  flex-direction: column;

  .product-info-box {
    padding: 1rem 0;
    border-bottom: 1px solid ${palette.gray[3]};
  }

  .product-category {
    display: inline-block;
    padding: 0.2em;
    border-radius: 0.5em;
    background-color: black;
    font-size: 0.75rem;
    color: white;
  }

  .product-name {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .product-price {
    font-size: 1.25rem;
  }

  .num {
    font-style: normal;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const ProductDetail = ({
  product,
  loading,
  activeImageIndex,
  error,
  onMouseOver,
}) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <ProductDetailBlock>존재하지 않는 상품입니다.</ProductDetailBlock>;
    }

    return <ProductDetailBlock>에러가 발생했습니다.</ProductDetailBlock>;
  }

  if (loading || !product) {
    return null;
  }

  const images = product.ProductImages;
  const { name: activeImage } = product.ProductImages[activeImageIndex];
  const { name: category } = product.ProductCategory;
  const { name, price } = product;

  return (
    <ProductDetailBlock>
      <ProductImagesBlock>
        <figure
          className="product-image"
          style={{
            backgroundImage: `url('http://localhost:4000/images/${activeImage}')`,
          }}
        />
        <ul className="product-image-list">
          {images.map((image, index) => (
            <li key={image.id} onMouseOver={() => onMouseOver(index)}>
              <figure
                className={cn({ active: index === activeImageIndex })}
                style={{
                  backgroundImage: `url('http://localhost:4000/images/${image.name}')`,
                }}
              />
            </li>
          ))}
        </ul>
      </ProductImagesBlock>
      <ProductInfoBlock>
        <div className="product-info-box product-category-box">
          <p className="product-category">{category}</p>
        </div>
        <div className="product-info-box product-name-box">
          <h1 className="product-name">{name}</h1>
        </div>
        <div className="product-info-box product-price-box">
          <p className="product-price">
            <em className="num">{addComma(price)}</em>원
          </p>
        </div>
        <ProductBuyButtonsContainer product={product} />
      </ProductInfoBlock>
    </ProductDetailBlock>
  );
};

export default ProductDetail;
