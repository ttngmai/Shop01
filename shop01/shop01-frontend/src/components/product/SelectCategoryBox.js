import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import palette from '../../lib/styles/palette';

const SelectCategoryBoxBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(3rem, auto);
  align-items: center;
  row-gap: 0.5rem;

  label {
    grid-column: 1;
  }
`;

const SearchBarBlock = styled.div`
  grid-column: 2 / 6;
  display: flex;
  align-items: center;
  position: relative;

  input {
    width: 100%;
    max-width: 300px;
    padding-bottom: 0.5rem;
    padding-left: 2rem;
    border-bottom: 1px solid ${palette.gray[5]};
    line-height: 1.2rem;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-bottom: 1px solid ${palette.gray[7]};
    }
  }
`;

const CategoryListBlock = styled.ul`
  grid-column: 2 / 6;
  max-width: 200px;
  max-height: 18.5rem;
  border: 1px solid ${palette.gray[5]};
  border-radius: 4px;
  overflow-y: scroll;
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

const SearchCategoryInput = React.memo(({ value, onChange }) => {
  return (
    <SearchBarBlock>
      <CgSearch
        style={{ position: 'absolute', bottom: '0.3rem', fontSize: '1.5rem' }}
      />
      <input
        type="search"
        autoComplete="off"
        placeholder="카테고리 검색"
        name="name"
        value={value}
        onChange={onChange}
      />
    </SearchBarBlock>
  );
});

const CategoryList = React.memo(({ categories, selectedCategory, onClick }) => (
  <CategoryListBlock>
    {categories.map((category) => (
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
    className={cn({ checked: category.id === selectedCategory })}
    onClick={() => onClick(category.id)}
  >
    {category.name}
  </Category>
));

const SelectCategoryBox = ({
  input,
  categories,
  loading,
  selectedCategory,
  error,
  onClick,
  onChange,
}) => {
  return (
    <SelectCategoryBoxBlock>
      <label className="category-list-label">카테고리</label>
      <SearchCategoryInput value={input} onChange={onChange} />
      {!loading && categories && (
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onClick={onClick}
        />
      )}
    </SelectCategoryBoxBlock>
  );
};

export default SelectCategoryBox;
