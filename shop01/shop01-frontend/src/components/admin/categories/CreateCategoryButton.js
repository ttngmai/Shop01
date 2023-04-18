import React from 'react';
import Button from '../../common/Button';
import IconButton from '../../common/IconButton';
import { VscAdd } from 'react-icons/vsc';

const CreateCategoryButton = React.memo(
  ({ type = 'button', depth = 0, onClick }) => {
    if (depth < 2) {
      if (type === 'button') {
        return (
          <Button type="button" onClick={onClick}>
            카테고리 생성
          </Button>
        );
      }

      return (
        <IconButton type="button" onClick={onClick}>
          <VscAdd />
        </IconButton>
      );
    }

    return null;
  },
);

export default CreateCategoryButton;
