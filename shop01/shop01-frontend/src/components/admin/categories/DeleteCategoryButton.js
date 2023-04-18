import React from 'react';
import palette from '../../../lib/styles/palette';
import IconButton from '../../common/IconButton';
import { VscTrash } from 'react-icons/vsc';

const DeleteCategoryButton = ({ onClick }) => {
  return (
    <IconButton type="button" color={palette.red[7]} onClick={onClick}>
      <VscTrash />
    </IconButton>
  );
};

export default DeleteCategoryButton;
