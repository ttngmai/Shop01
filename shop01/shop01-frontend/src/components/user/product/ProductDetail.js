import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../../lib/styles/palette';
import Responsive from '../../common/Responsive';
import { IoStar } from 'react-icons/io5';
import ProductImagesBoxContainer from '../../../containers/user/product/ProductImagesBoxContainer';
import ProductQuantityInputContainer from '../../../containers/user/product/ProductQuantityInputContainer';
import AddToCartButtonContainer from '../../../containers/user/product/AddToCartButtonContainer';
import OrderProductButtonContainer from '../../../containers/user/product/OrderProductButtonContainer';
import addComma from '../../../lib/util/addComma';

const ProductDetailBlock = styled(Responsive)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfo = styled.div`
  padding-bottom: 1.5rem;

  .product-name {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .product-price {
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

const CategoryInfo = styled.div`
  display: flex;
  padding-bottom: 0.5rem;

  span {
    font-size: 0.75rem;
    color: ${palette.gray[5]};
  }

  ${(props) =>
    props.morePadding &&
    css`
      padding-bottom: 1rem;
    `}
`;

const StarRatingInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.5rem;

  .star_rating_average {
    padding-right: 0.5rem;
    font-size: 0.75rem;
  }

  .reviews_total_count {
    font-size: 0.75rem;
    color: ${palette.gray[5]};
  }
`;

const StarRatingBox = styled.div`
  position: relative;
  width: 5rem;
  height: 1.25rem;
  margin-right: 0.5rem;
`;

const EmptyStarsIconBox = styled.div`
  position: absolute;
  width: 5rem;
  color: ${palette.gray[5]};
  overflow: hidden;
`;

const FillStarsIconBox = styled.div`
  position: absolute;
  width: 0;
  color: ${palette.indigo[7]};
  overflow: hidden;
  white-space: nowrap;

  ${(props) =>
    props.starRatingAverage &&
    css`
      width: ${(props.starRatingAverage / 5) * 100}%;
    `}
`;

const ProductQuantity = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 1.5rem;
`;

const TotalAmount = styled.dl`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  padding: 2rem 0;
  border-top: 1px solid ${palette.gray[3]};

  dt {
    margin-right: 0.5rem;
  }

  .num {
    margin-right: 0.2rem;
    vertical-align: -1px;
    font-style: normal;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  align-items: center;

  button + button {
    margin-left: 0.5rem;
  }
`;

const ProductDetail = ({ product, totalAmount, loading, error }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <ProductDetailBlock>존재하지 않는 상품입니다.</ProductDetailBlock>;
    }

    return <ProductDetailBlock>에러가 발생했습니다.</ProductDetailBlock>;
  }

  if (loading || !product) {
    return null;
  }

  const category = product.ProductCategory.name;
  const { name, price, reviews_total_count, star_rating_average } = product;

  return (
    <ProductDetailBlock>
      <ProductImagesBoxContainer />
      <ProductInfoBox>
        <CategoryInfo morePadding={reviews_total_count === 0}>
          <span>{category}</span>
        </CategoryInfo>
        {reviews_total_count > 0 ? (
          <StarRatingInfo>
            <StarRatingBox>
              <EmptyStarsIconBox>
                {[...Array(5)].map((item, index) => (
                  <IoStar key={`empty-star-icon-${index}`} size="1rem" />
                ))}
              </EmptyStarsIconBox>
              <FillStarsIconBox starRatingAverage={star_rating_average}>
                {[...Array(5)].map((item, index) => (
                  <IoStar key={`fill-star-icon-${index}`} size="1rem" />
                ))}
              </FillStarsIconBox>
            </StarRatingBox>
            <span className="star_rating_average">{star_rating_average}</span>
            <span className="reviews_total_count">
              ({reviews_total_count} 리뷰)
            </span>
          </StarRatingInfo>
        ) : null}
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
          <dt>총 상품 금액:</dt>
          <dd>
            <em className="num">{addComma(totalAmount)}</em>원
          </dd>
        </TotalAmount>
        <ButtonsBox>
          <AddToCartButtonContainer />
          <OrderProductButtonContainer />
        </ButtonsBox>
      </ProductInfoBox>
    </ProductDetailBlock>
  );
};

export default ProductDetail;
