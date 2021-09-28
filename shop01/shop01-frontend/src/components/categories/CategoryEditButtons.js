import React from 'react';
import styled, { css } from 'styled-components';
import { VscEdit, VscTrash, VscAdd } from 'react-icons/vsc';
import palette from '../../lib/styles/palette';

const CategoryEditButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
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
  depth,
  onCreateButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
}) => {
  return (
    <CategoryEditButtonsBlock>
      {depth < 2 ? (
        <CreateButton type="button" onClick={onCreateButtonClick}>
          <VscAdd size="1rem" />
        </CreateButton>
      ) : null}
      <EditButton type="button" onClick={onEditButtonClick}>
        <VscEdit size="1rem" />
      </EditButton>
      <DeleteButton type="button" onClick={onDeleteButtonClick}>
        <VscTrash size="1rem" />
      </DeleteButton>
    </CategoryEditButtonsBlock>
  );
};

export default CategoryEditButtons;
