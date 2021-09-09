import React from 'react';
import styled from 'styled-components';
import { BiDollarCircle } from 'react-icons/bi';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 49%;
  height: 3.5rem;
  border: 1px solid ${palette.indigo[7]};
  border-radius: 4px;
  margin: auto;
  background-color: white;
  font-size: 1.25rem;
  color: ${palette.indigo[7]};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${palette.indigo[7]};
    color: white;
    box-shadow: 0px 2px 8px #4c72ff;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const ItemsOrderButton = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <BiDollarCircle />
      주문
    </StyledButton>
  );
};

export default ItemsOrderButton;
