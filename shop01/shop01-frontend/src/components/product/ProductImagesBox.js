import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const ProductImagesBoxBlock = styled.div``;

const ProductImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  margin-bottom: 0.5rem;

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

const ProductImageList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImageItemBox = styled.li`
  position: relative;
  width: 24%;
  height: 0;
  padding-bottom: 18%;
  margin: 0 0.5%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: ${palette.gray[1]};
    opacity: 0.5;
    cursor: pointer;

    &.active {
      border: 2px solid ${palette.indigo[7]};
      opacity: 1;
    }
  }
`;

const ProductImagesBox = ({ product, activeImageIndex, onMouseOver }) => {
  const images = product.ProductImages;
  const activeImage = product.ProductImages[activeImageIndex].name;

  return (
    <ProductImagesBoxBlock>
      <ProductImageBox>
        <img src={`/images/${activeImage}`} alt="" />
      </ProductImageBox>
      <ProductImageList>
        {images.map((image, index) => (
          <ProductImageItemBox
            key={image.id}
            onMouseOver={() => onMouseOver(index)}
          >
            <img
              className={cn({ active: index === activeImageIndex })}
              src={`/images/${image.name}`}
              alt=""
            />
          </ProductImageItemBox>
        ))}
      </ProductImageList>
    </ProductImagesBoxBlock>
  );
};

export default ProductImagesBox;
