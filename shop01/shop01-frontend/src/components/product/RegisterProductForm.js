import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const RegisterProductFormBlock = styled.div`
  form {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(3rem, auto);
    align-items: center;
    row-gap: 0.5rem;

    .select-category-box {
      grid-column: 1 / 6;
    }

    .upload-box {
      grid-column: 1 / 6;
    }

    .register-button {
      grid-column: 1 / 6;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  }
`;

const StyledInput = styled.input`
  grid-column: 2 / 6;
  width: 100%;
  max-width: 300px;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${palette.gray[5]};
  line-height: 1.2rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }

  & + & {
    margin-top: 1rem;
  }
`;

const RegisterProductForm = ({
  form,
  selectCategoryBox,
  error,
  onChange,
  onSubmit,
  uploadBox,
}) => {
  return (
    <RegisterProductFormBlock>
      <form onSubmit={onSubmit}>
        <div className="select-category-box">{selectCategoryBox}</div>
        <label>상품명</label>
        <StyledInput
          autoComplete="off"
          name="name"
          value={form.name}
          onChange={onChange}
        />
        <label>판매가</label>
        <StyledInput
          autoComplete="off"
          name="price"
          onChange={onChange}
          value={form.price}
        />
        <div className="upload-box">{uploadBox}</div>
        <Button type="submit" className="register-button">
          등록
        </Button>
      </form>
    </RegisterProductFormBlock>
  );
};

export default RegisterProductForm;
