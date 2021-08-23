import React from 'react';
import qs from 'qs';
import styled from 'styled-components';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin: 0 auto;
`;
const PageNumber = styled.div``;

const buildLink = ({ category, name, page }) => {
  const query = qs.stringify({ category, name, page });
  return `/product-list?${query}`;
};

const Pagination = ({ category, name, page, lastPage }) => {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ category, name, page: page - 1 })
        }
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ category, name, page: page + 1 })
        }
      >
        다음
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;
