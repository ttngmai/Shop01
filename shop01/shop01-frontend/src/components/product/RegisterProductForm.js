import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import SelectCategoryBoxContainer from '../../containers/product/SelectCategoryBoxContainer';
import UploadBoxContainer from '../../containers/product/UploadBoxContainer';

const RegisterProductFormBlock = styled.div`
  form {
    align-items: center;
  }
`;

const ProductRegisterButton = styled(Button)`
  float: right;
  width: 30%;
  height: 3.5rem;
`;

const GridBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1.5fr 8.5fr;
  row-gap: 1rem;
  padding-bottom: 1rem;

  & > label {
    align-self: stretch;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 1.35rem;

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      right: -0.35rem;
      width: 0.35rem;
      height: 100%;
      background-color: ${palette.gray[2]};
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding-bottom: 0.25rem;
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

const RegisterProductForm = ({ form, error, onChange, onSubmit }) => {
  if (error) {
    return null;
  }

  return (
    <RegisterProductFormBlock>
      <form onSubmit={onSubmit}>
        <GridBox>
          <label>카테고리</label>
          <SelectCategoryBoxContainer />
          <label htmlFor="name">상품명</label>
          <StyledInput
            autoComplete="off"
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
          />
          <label htmlFor="price">판매가</label>
          <StyledInput
            autoComplete="off"
            id="price"
            name="price"
            onChange={onChange}
            value={form.price}
          />
          <label>상품 이미지</label>
          <UploadBoxContainer />
        </GridBox>
        <ProductRegisterButton type="submit">등록</ProductRegisterButton>
      </form>
    </RegisterProductFormBlock>
  );
};

export default RegisterProductForm;
