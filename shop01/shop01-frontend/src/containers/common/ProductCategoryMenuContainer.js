import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCategoryMenu from '../../components/common/ProductCategoryMenu';
import { listCategories } from '../../modules/categories';

const ProductCategoryMenuContainer = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    ({ categories, loading }) => ({
      categories: categories.categories,
      loading: loading['categories/LIST_CATEGORIES'],
      error: categories.error,
    }),
  );

  const [activeCategories, setActiveCategories] = useState([]);

  const handleMouseOverCategoryItem = useCallback(
    (category, e) => {
      e.stopPropagation();
      if (category.depth + 1 > activeCategories.length) {
        setActiveCategories(activeCategories.concat(category)); // 선택
      } else {
        setActiveCategories(
          activeCategories.slice(0, category.depth).concat(category), // 기존 선택 변경
        );
      }
    },
    [activeCategories],
  );

  const handleMouseLeave = useCallback(() => {
    setActiveCategories([]);
  }, []);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <ProductCategoryMenu
      categories={categories}
      activeCategories={activeCategories}
      loading={loading}
      error={error}
      onMouseOverCategoryItem={handleMouseOverCategoryItem}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default ProductCategoryMenuContainer;
