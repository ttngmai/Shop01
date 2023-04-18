import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  line-height: 2rem;
  font-size: 1rem;
  cursor: pointer;

  &::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 1rem;
    margin-top: 2.3px;
    margin-right: 1rem;
    margin-left: 1rem;
    background-color: black;
  }
`;

const DeleteItemsButton = ({ onClick }) => {
   return (
     <StyledButton type="button" onClick={onClick}>
       선택 삭제
     </StyledButton>
   )
}

export default DeleteItemsButton;
