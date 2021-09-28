import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import cn from 'classnames';
import { AiOutlineMenu } from 'react-icons/ai';
import palette from '../../lib/styles/palette';

const ProductCategoryMenuBlock = styled.div`
  align-self: stretch;
  display: flex;
  position: relative;
`;

const ProductCategoryMenuHeading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > svg {
    margin-top: 2.5px;
    margin-right: 0.5rem;
  }
`;

const ProductCategoryMenuContent = styled.nav`
  position: absolute;
  top: 3.5rem;
  left: 0;

  &[aria-expanded='true'] {
    display: none;
  }
`;

const CategoryListBlock = styled.ul`
  width: 200px;
  max-height: calc(19.5rem + 2px);
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
`;

const CategoryItemBlock = styled.li`
  display: block;

  a {
    display: block;
    padding: 0.25rem 0.5rem;

    &:hover {
      color: ${palette.indigo[7]};
    }
  }
`;

const CategoryItem = React.memo(({ category }) => {
  return (
    <CategoryItemBlock>
      <Link to={`/product-list?category=${category.id}`}>{category.name}</Link>
    </CategoryItemBlock>
  );
});

const CategoryList = React.memo(({ categories }) => {
  return (
    <CategoryListBlock>
      {categories &&
        categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
    </CategoryListBlock>
  );
});

const ProductCategoryMenu = ({ categories, loading, error }) => {
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(!isDropdownOpen);
      }
    };

    if (isDropdownOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isDropdownOpen]);

  return (
    <ProductCategoryMenuBlock ref={dropdownRef}>
      <ProductCategoryMenuHeading onClick={handleToggle}>
        <AiOutlineMenu size="1.2rem" />
        카테고리
      </ProductCategoryMenuHeading>
      <ProductCategoryMenuContent aria-expanded={!isDropdownOpen}>
        <CategoryList categories={categories} />
      </ProductCategoryMenuContent>
    </ProductCategoryMenuBlock>
  );
};

export default ProductCategoryMenu;
