import React from 'react';
import styled, { css } from 'styled-components';
import { VscEdit, VscTrash, VscAdd } from 'react-icons/vsc';
import palette from '../../lib/styles/palette';

const CategoryEditButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0.425rem;
  right: 0;

  & svg {
    width: 1rem;
    height: 1rem;
  }
`;

const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
`;

const CreateButton = styled.button`
  ${buttonStyle}
  border: 1px solid ${palette.indigo[7]};
  margin-right: 0.5rem;
  color: ${palette.indigo[7]};

  &:hover {
    border: none;
    background-color: ${palette.indigo[7]};
    color: white;
  }
`;

const EditButton = styled.button`
  ${buttonStyle}
  border: 1px solid ${palette.indigo[7]};
  margin-right: 0.5rem;
  color: ${palette.indigo[7]};

  &:hover {
    border: none;
    background-color: ${palette.indigo[7]};
    color: white;
  }
`;

const DeleteButton = styled.button`
  ${buttonStyle}
  border: 1px solid ${palette.red[7]};
  color: ${palette.red[7]};

  &:hover {
    border: none;
    background-color: ${palette.red[7]};
    color: white;
  }
`;

const CategoryEditButtons = ({
  onCreateButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
}) => {
  return (
    <CategoryEditButtonsBlock>
      <CreateButton type="button" onClick={onCreateButtonClick}>
        <VscAdd />
      </CreateButton>
      <EditButton type="button" onClick={onEditButtonClick}>
        <VscEdit />
      </EditButton>
      <DeleteButton type="button" onClick={onDeleteButtonClick}>
        <VscTrash />
      </DeleteButton>
    </CategoryEditButtonsBlock>
  );
};

export default CategoryEditButtons;
