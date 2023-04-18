import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { listCategories } from '../../../modules/categories';
import SelectCategoryBox from '../../../components/admin/product/SelectCategoryBox';

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

  const didMount = useRef(false);
  const { register, setValue } = useFormContext();

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
    register('category');
  }, [dispatch, register]);

  useEffect(() => {
    const id =
      selectedCategories.length > 0
        ? selectedCategories[selectedCategories.length - 1].id
        : null;

    if (didMount.current) {
      setValue('category', id, { shouldValidate: true, shouldDirty: true });
    } else {
      didMount.current = true;
    }
  }, [selectedCategories, setValue, dispatch]);

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
