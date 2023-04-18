import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManageCategoryBox from '../../../components/admin/categories/ManageCategoryBox';
import { listCategories } from '../../../modules/categories';

const ManageCategoryBoxContainer = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    ({ categories, loading }) => ({
      categories: categories.categories,
      loading: loading['categories/LIST_CATEGORIES'],
      error: categories.error,
    }),
  );

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <ManageCategoryBox
      categories={categories}
      loading={loading}
      error={error}
    />
  );
};

export default ManageCategoryBoxContainer;
