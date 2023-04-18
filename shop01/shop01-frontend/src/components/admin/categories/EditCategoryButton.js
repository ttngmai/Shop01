import React from 'react';
import IconButton from '../../common/IconButton';
import { VscEdit } from 'react-icons/vsc';

const EditCategoryButton = ({ onClick }) => {
  return (
    <IconButton type="button" onClick={onClick}>
      <VscEdit />
    </IconButton>
  );
};

export default EditCategoryButton;
