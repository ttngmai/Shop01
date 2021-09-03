import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import ProductQuantityInputContainer from '../../containers/product/ProductQuantityInputContainer';
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
    padding-bottom: 75%;
    margin-bottom: 0.5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: ${palette.gray[1]};
  }
`;

const ProductImages = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.li`
  width: 24%;
  margin: 0 0.5%;

  figure {
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: ${palette.gray[1]};
    opacity: 0.5;
    cursor: pointer;

    &.active {
      border: 2px solid ${palette.indigo[7]};
      opacity: 1;
    }
  }
`;

const ProductInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfo = styled.div`
  padding-bottom: 1.5rem;

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
    font-weight: 400;
  }

  .num {
    margin-right: 0.15rem;
    vertical-align: -1px;
    font-style: normal;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const ProductQuantity = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 1.5rem;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid ${palette.gray[3]};

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

const ButtonsBox = styled.div``;

const ProductDetail = ({
  product,
  totalAmount,
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
            backgroundImage: `url('/images/${activeImage}')`,
          }}
        />
        <ProductImages>
          {images.map((image, index) => (
            <ProductImage key={image.id} onMouseOver={() => onMouseOver(index)}>
              <figure
                className={cn({ active: index === activeImageIndex })}
                style={{
                  backgroundImage: `url('/images/${image.name}')`,
                }}
              />
            </ProductImage>
          ))}
        </ProductImages>
      </ProductImagesBlock>
      <ProductInfoBlock>
        <ProductInfo>
          <p className="product-category">{category}</p>
        </ProductInfo>
        <ProductInfo>
          <h1 className="product-name">{name}</h1>
        </ProductInfo>
        <ProductInfo>
          <strong className="product-price">
            <em className="num">{addComma(price)}</em>원
          </strong>
        </ProductInfo>
        <ProductQuantity>
          <ProductQuantityInputContainer />
        </ProductQuantity>
        <TotalAmount>
          <strong className="total-amount">
            <span className="total-amount-label">총 상품 금액:</span>
            <em className="num">{addComma(totalAmount)}</em>원
          </strong>
        </TotalAmount>
        <ButtonsBox>
          <ProductBuyButtonsContainer />
        </ButtonsBox>
      </ProductInfoBlock>
    </ProductDetailBlock>
  );
};

export default ProductDetail;
