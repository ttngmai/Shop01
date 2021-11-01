import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import cn from 'classnames';
import palette from '../../lib/styles/palette';
import { AiOutlineMenu } from 'react-icons/ai';
import { CgChevronRight } from 'react-icons/cg';

const MenuBlock = styled.div`
  align-self: stretch;
  display: flex;
  position: relative;
`;

const MenuHeading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > svg {
    margin-top: 2.5px;
    margin-right: 0.5rem;
  }
`;

const MenuContent = styled.nav`
  position: absolute;
  top: 3.5rem;
  left: 0;

  &[aria-expanded='true'] {
    display: none;
  }
`;

const ListBlock = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`;

const List = styled.ul`
  width: 200px;
  min-height: 9.75rem;
  max-height: 9.75rem;
  border-radius: 4px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ItemBlock = styled.li`
  display: block;
  background-color: white;

  a {
    flex-grow: 1;
    display: block;
    padding: 0.25rem 0.5rem;

    &:hover {
      color: ${palette.indigo[7]};
    }
  }

  ${ListBlock} {
    display: none;
    position: absolute;
    z-index: 10;
  }

  ${(props) =>
    props.isOpen &&
    css`
      & > ${ListBlock} {
        display: block;
        top: 0;
        left: 200px;
      }
    `}
`;

const ItemHeading = styled.div`
  display: flex;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    border-radius: 50%;
    background: white;
    cursor: pointer;

    svg {
      &.open {
        transform: rotateZ(-180deg);
      }
    }

    &:hover {
      background-color: ${palette.gray[1]};
      color: ${palette.indigo[7]};
    }
  }
`;

const Item = React.memo(({ item, onOpen, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  item.close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) onOpen(item.category.id);
  }, [item, isOpen, onOpen]);

  return (
    <ItemBlock isOpen={isOpen}>
      <ItemHeading>
        <Link to={`/product-list?category=${item.category.id}`}>
          {item.category.name}
        </Link>
        {children && (
          <button type="button" onClick={handleToggle}>
            <CgChevronRight size="1rem" className={cn({ open: isOpen })} />
          </button>
        )}
      </ItemHeading>
      {item.category.children && isOpen && children}
    </ItemBlock>
  );
});

const CategoryList = React.memo(({ categories }) => {
  const items = categories.map((category) => {
    return { category, close: null };
  });

  const handleOpen = (id) => {
    items.forEach((item) => {
      if (item.category.id !== id && item.close !== null) {
        item.close();
      }
    });
  };

  return (
    <ListBlock>
      <List>
        {items.map((item) => (
          <Item key={item.category.id} item={item} onOpen={handleOpen}>
            {item.category.children && (
              <CategoryList categories={item.category.children} />
            )}
          </Item>
        ))}
      </List>
    </ListBlock>
  );
});

const ProductCategoryMenu = ({ categories }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <MenuBlock onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MenuHeading>
        <AiOutlineMenu size="1.2rem" />
        카테고리
      </MenuHeading>
      <MenuContent aria-expanded={!isDropdownOpen}>
        {categories && isDropdownOpen && (
          <CategoryList categories={categories} />
        )}
      </MenuContent>
    </MenuBlock>
  );
};

export default ProductCategoryMenu;
