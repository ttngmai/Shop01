import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectCategoryBox from '../../components/product/SelectCategoryBox';
import { listCategories } from '../../modules/categories';
import { changeField } from '../../modules/product';

const SelectCategoryBoxContainer = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    ({ categories, loading }) => ({
      categories: categories.categories,
      loading: loading['categories/LIST_CATEGORIES'],
      error: categories.error,
    }),
  );

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleClick = useCallback(
    (category) => {
      if (category.depth + 1 > selectedCategories.length) {
        setSelectedCategories(selectedCategories.concat(category)); // 선택
      } else {
        const selectedCategoryIndex = selectedCategories
          .map((selectedCategory) => selectedCategory.id)
          .indexOf(category.id);
        if (selectedCategoryIndex !== -1) {
          setSelectedCategories(
            selectedCategories.slice(0, selectedCategoryIndex), // 기존 선택 취소
          );
        } else {
          setSelectedCategories(
            selectedCategories.slice(0, category.depth).concat(category), // 기존 선택 변경
          );
        }
      }
    },
    [selectedCategories],
  );

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    const selectedCategoryId =
      selectedCategories.length > 0
        ? selectedCategories[selectedCategories.length - 1].id
        : null;

    dispatch(
      changeField({
        form: 'register',
        key: 'category',
        value: selectedCategoryId,
      }),
    );
  }, [selectedCategories, dispatch]);

  return (
    <SelectCategoryBox
      categories={categories}
      selectedCategories={selectedCategories}
      loading={loading}
      error={error}
      onClick={handleClick}
    />
  );
};

export default SelectCategoryBoxContainer;
