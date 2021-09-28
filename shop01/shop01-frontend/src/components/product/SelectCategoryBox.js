import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import palette from '../../lib/styles/palette';

const SelectCategoryBoxBlock = styled.div`
  display: flex;
`;

const CategoryListBlock = styled.ul`
  width: 33.3333%;
  max-height: calc(19.5rem + 2px);
  border: 1px solid ${palette.gray[5]};
  border-radius: 4px;
  overflow-y: auto;
`;

const Category = styled.li`
  padding: 0.25rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${palette.indigo[1]};
  }

  &.checked {
    background-color: ${palette.indigo[7]};
    color: white;
  }
`;

const CategoryList = React.memo(({ categories, selectedCategory, onClick }) => (
  <CategoryListBlock>
    {categories &&
      categories.length > 0 &&
      categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          selectedCategory={selectedCategory}
          onClick={onClick}
        />
      ))}
  </CategoryListBlock>
));

const CategoryItem = React.memo(({ category, selectedCategory, onClick }) => (
  <Category
    className={cn({ checked: category.id === selectedCategory?.id })}
    onClick={() => onClick(category)}
  >
    {category.name}
  </Category>
));

const SelectCategoryBox = ({
  categories,
  selectedCategories,
  loading,
  error,
  onClick,
}) => {
  if (error) {
    return (
      <SelectCategoryBoxBlock>에러가 발생했습니다.</SelectCategoryBoxBlock>
    );
  }

  return (
    <SelectCategoryBoxBlock>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategories[0]}
        onClick={onClick}
      />
      {selectedCategories &&
        selectedCategories.map(
          (selectedCategory, index) =>
            selectedCategory.children && (
              <CategoryList
                key={selectedCategory.id}
                categories={selectedCategory.children}
                selectedCategory={selectedCategories[index + 1]}
                onClick={onClick}
              />
            ),
        )}
    </SelectCategoryBoxBlock>
  );
};

export default SelectCategoryBox;
