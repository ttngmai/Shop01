import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import WhiteBox from '../../common/WhiteBox';
import ToggleSwitchContainer from '../../../containers/admin/products/ToggleSwitchContainer';
import PaginationContainer from '../../../containers/admin/products/PaginationContainer';
import { IoAlertCircleSharp, IoStar } from 'react-icons/io5';
import addComma from '../../../lib/util/addComma';

const ProductListBlock = styled.div``;

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
  display: grid;
  align-items: center;
  grid-template-columns: max-content 1fr 1fr 1fr 1fr max-content;
  column-gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${palette.gray[3]};

  &:first-child {
    border-top: 1px solid ${palette.gray[3]};
  }
`;

const ProductImageBox = styled.div`
  position: relative;
  width: 100px;
  height: 75px;
  border-radius: 9px;
  overflow: hidden;

  img {
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

const Name = styled.p`
  white-space: pre-line;

  a {
    display: block;
    cursor: pointer;

    &:hover {
      color: ${palette.indigo[7]};
    }
  }
`;

const StarRating = styled.div`
  text-align: center;

  .star_rating_average {
    svg {
      margin-right: 0.25rem;
      margin-bottom: 3px;
      vertical-align: middle;
    }
  }

  .reviews_total_count {
    font-size: 0.75rem;
    color: ${palette.gray[5]};
  }

  .no_star_rating {
    font-size: 0.75rem;
    color: ${palette.gray[5]};
  }
`;
const Price = styled.strong`
  .num {
    margin-right: 0.1rem;
    font-style: normal;
  }
`;

const Category = styled.p``;

const Display = styled.div``;

const PaginationBox = styled.div`
  padding-top: 3rem;
`;

const ProductItem = React.memo(({ product }) => {
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
      <Name>
        <Link to={`/product-detail/${id}`}>{name}</Link>
      </Name>
      <StarRating>
        {product.star_rating_average ? (
          <>
            <p className="star_rating_average">
              <IoStar size="1rem" color={palette.indigo[7]} />
              {product.star_rating_average}
            </p>
            <p className="reviews_total_count">
              ({product.reviews_total_count} 리뷰)
            </p>
          </>
        ) : (
          <span className="no_star_rating">평가 없음</span>
        )}
      </StarRating>
      <Price>
        <em className="num">{addComma(price)}</em>원
      </Price>
      <Category>{category}</Category>
      <Display>
        <ToggleSwitchContainer item={product} />
      </Display>
    </ProductItemBlock>
  );
});

const ManageProductListBox = ({ products, loading, error }) => {
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
        <p>등록된 상품이 없습니다.</p>
      </EmptyProductList>
    </ProductListBlock>;
  }

  return (
    <ProductListBlock>
      <WhiteBox>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
        <PaginationBox>
          <PaginationContainer />
        </PaginationBox>
      </WhiteBox>
    </ProductListBlock>
  );
};

export default ManageProductListBox;
