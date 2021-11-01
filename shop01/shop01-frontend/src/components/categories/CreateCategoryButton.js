import React from 'react';
import Button from '../common/Button';

const CreateCategoryButton = React.memo(({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      카테고리 생성
    </Button>
  );
});

export default CreateCategoryButton;
