import React from 'react';
import styled from 'styled-components';
import { VscEdit, VscTrash, VscAdd } from 'react-icons/vsc';
import palette from '../../lib/styles/palette';

const CategoryButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0.425rem;
  right: 0;
`;

const CreateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${palette.indigo[7]};
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: white;
  color: ${palette.indigo[7]};
  cursor: pointer;

  &:hover {
    border: none;
    background-color: ${palette.indigo[7]};
    color: white;
  }

  & .vscAdd {
    width: 1rem;
    height: 1rem;
  }
`;

const EditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${palette.indigo[7]};
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: white;
  color: ${palette.indigo[7]};
  cursor: pointer;

  &:hover {
    border: none;
    background-color: ${palette.indigo[7]};
    color: white;
  }

  & .vscEdit {
    width: 1rem;
    height: 1rem;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${palette.red[7]};
  border-radius: 50%;
  background-color: white;
  color: ${palette.red[7]};
  cursor: pointer;

  &:hover {
    border: none;
    background-color: ${palette.red[7]};
    color: white;
  }

  & .vscTrash {
    width: 1rem;
    height: 1rem;
  }
`;

const CategoryButtons = ({ onCreateButtonClick, onEditButtonClick, onDeleteButtonClick }) => {
  return (
    <CategoryButtonsBlock>
      <CreateButton type="button" onClick={onCreateButtonClick}>
        <VscAdd className="vscAdd" />
      </CreateButton>
      <EditButton type="button" onClick={onEditButtonClick}>
        <VscEdit className="vscEdit" />
      </EditButton>
      <DeleteButton type="button" onClick={onDeleteButtonClick}>
        <VscTrash className="vscTrash" />
      </DeleteButton>
    </CategoryButtonsBlock>
  );
};

export default CategoryButtons;
