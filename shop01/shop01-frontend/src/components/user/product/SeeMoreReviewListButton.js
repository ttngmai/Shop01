import React from 'react';
import styled from 'styled-components';
import { BiChevronDown } from 'react-icons/bi';
import palette from '../../../lib/styles/palette';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
  width: 100%;
  background-color: white;
  font-size: 1rem;
  color: ${palette.indigo[7]};
  cursor: pointer;
`;

const SeeMoreReviewListButton = ({
  currentPage,
  totalPage,
  onClick,
}) => {
  if (currentPage >= totalPage) {
    return null;
  }

  return (
    <StyledButton onClick={onClick}>
      더보기
      <BiChevronDown />
    </StyledButton>
  );
};

export default SeeMoreReviewListButton;
