import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import IconButton from './IconButton';
import {
  BiChevronsLeft,
  BiChevronLeft,
  BiChevronRight,
  BiChevronsRight,
} from 'react-icons/bi';

const PaginationBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  margin: 0 auto;
`;

const StyledButton = styled(IconButton)``;

const StyledButtonWithMarginRight = styled(StyledButton)`
  margin-right: 0.25rem;
`;

const StyledButtonWithMarginLeft = styled(StyledButton)`
  margin-left: 0.25rem;
`;

const PageNumbers = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-right: 0.25rem;

    &:last-child {
      margin-right: 0;
    }

    &.current {
      background-color: ${palette.indigo[7]};
      color: white;
    }

    &:not(.current):hover {
      background-color: ${palette.indigo[1]};
    }
  }
`;

const Pagination = ({ category, name, page, totalPage, buildLink }) => {
  const pageButtonsCount = 5;

  let first = Math.floor((page - 1) / pageButtonsCount) * pageButtonsCount + 1;
  let last = first + pageButtonsCount - 1;
  if (last > totalPage) {
    last = totalPage;
  }

  const pageNumbers = [];
  for (let i = first; i <= last; i++) {
    pageNumbers.push(i);
  }

  if (totalPage === 0) {
    return null;
  }

  return (
    <PaginationBlock>
      <StyledButtonWithMarginRight
        disabled={page === 1}
        to={page === 1 ? undefined : buildLink({ category, name, page: 1 })}
        size="large"
      >
        <BiChevronsLeft />
      </StyledButtonWithMarginRight>
      <StyledButton
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ category, name, page: page - 1 })
        }
        size="large"
      >
        <BiChevronLeft />
      </StyledButton>
      <PageNumbers>
        {pageNumbers.map((pageNumber) => (
          <Link
            to={buildLink({ category, name, page: pageNumber })}
            className={cn({ current: pageNumber === page })}
            key={pageNumber}
          >
            {pageNumber}
          </Link>
        ))}
      </PageNumbers>
      <StyledButton
        disabled={page === totalPage}
        to={
          page === totalPage
            ? undefined
            : buildLink({ category, name, page: page + 1 })
        }
        size="large"
      >
        <BiChevronRight />
      </StyledButton>
      <StyledButtonWithMarginLeft
        disabled={page === totalPage}
        to={
          page === totalPage
            ? undefined
            : buildLink({ category, name, page: totalPage })
        }
        size="large"
      >
        <BiChevronsRight />
      </StyledButtonWithMarginLeft>
    </PaginationBlock>
  );
};

export default Pagination;
