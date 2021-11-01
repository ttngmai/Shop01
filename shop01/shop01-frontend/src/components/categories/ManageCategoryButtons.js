import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import IconButton from '../common/IconButton';
import { VscEdit, VscTrash, VscAdd } from 'react-icons/vsc';

const ManageCategoryButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  button:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;

const ManageCategoryButtons = ({
  depth,
  onCreateCategoryButtonClick,
  onEditCategoryButtonClick,
  onDeleteCategoryButtonClick,
}) => {
  return (
    <ManageCategoryButtonsBlock>
      {depth < 2 ? (
        <IconButton type="button" onClick={onCreateCategoryButtonClick}>
          <VscAdd />
        </IconButton>
      ) : null}
      <IconButton type="button" onClick={onEditCategoryButtonClick}>
        <VscEdit />
      </IconButton>
      <IconButton
        type="button"
        color={palette.red[7]}
        onClick={onDeleteCategoryButtonClick}
      >
        <VscTrash />
      </IconButton>
    </ManageCategoryButtonsBlock>
  );
};

export default ManageCategoryButtons;
