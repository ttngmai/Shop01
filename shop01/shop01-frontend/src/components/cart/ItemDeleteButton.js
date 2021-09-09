import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { IoMdClose } from 'react-icons/io';

const StyledButton = styled.button`
  justify-self: end;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${palette.gray[5]};

    &:hover {
      color: ${palette.red[7]};
    }
  }
`;

const ItemDeleteButton = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      <IoMdClose />
    </StyledButton>
  );
};

export default ItemDeleteButton;
