import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductImagesBox from '../../../components/user/product/ProductImagesBox';

const ProductImagesBoxContainer = () => {
  const { product } = useSelector(({ product }) => ({
    product: product.read.product,
  }));

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleMouseOver = (index) => {
    setActiveImageIndex(index);
  };

  return (
    <ProductImagesBox
      product={product}
      activeImageIndex={activeImageIndex}
      onMouseOver={handleMouseOver}
    />
  );
};

export default ProductImagesBoxContainer;
