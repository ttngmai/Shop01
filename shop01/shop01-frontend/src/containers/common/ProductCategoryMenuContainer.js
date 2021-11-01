import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { listCategories } from '../../modules/categories';
import ProductCategoryMenu from '../../components/common/ProductCategoryMenu';

const ProductCategoryMenuContainer = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(
    ({ categories }) => ({ categories: categories.categories }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return <ProductCategoryMenu categories={categories} />;
};

export default ProductCategoryMenuContainer;
