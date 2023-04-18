import React from 'react';
import IconButton from '../../common/IconButton';
import { VscSave } from 'react-icons/vsc';

const SaveItemQuantityButton = ({ onClick }) => {
  return (
    <IconButton type="button" color="black" onClick={onClick}>
      <VscSave />
    </IconButton>
  );
};

export default SaveItemQuantityButton;
