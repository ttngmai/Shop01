import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectCategoryBox from '../../components/product/SelectCategoryBox';
import { listCategories } from '../../modules/categories';
import { changeField } from '../../modules/product';

const SelectCategoryBoxContainer = () => {
  const dispatch = useDispatch();
  const { categories, loading, error, selectedCategory } = useSelector(
    ({ categories, loading, product }) => ({
      categories: categories.categories,
      loading: loading['categories/LIST_CATEGORIES'],
      error: categories.error,
      selectedCategory: product.register.category,
    }),
  );

  const [categoryList, setCategoryList] = useState([]);
  const [input, setInput] = useState('');

  const handleChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleClick = useCallback(
    (id) => {
      dispatch(
        changeField({
          form: 'register',
          key: 'category',
          value: id,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories, setCategoryList]);

  useEffect(() => {
    if (categories) {
      setCategoryList(
        categories.filter((category) =>
          category.name.toLowerCase().includes(input),
        ),
      );
    }
  }, [categories, input, setCategoryList]);

  return (
    <SelectCategoryBox
      input={input}
      categories={categoryList}
      loading={loading}
      selectedCategory={selectedCategory}
      error={error}
      onClick={handleClick}
      onChange={handleChange}
    />
  );
};

export default SelectCategoryBoxContainer;
