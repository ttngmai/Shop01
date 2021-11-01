import React from 'react';
import Joi from 'joi';
import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import WhiteBox from '../common/WhiteBox';
import Input from '../common/Input';
import Button from '../common/Button';
import SelectCategoryBoxContainer from '../../containers/product/SelectCategoryBoxContainer';
import UploadBox from './UploadBox';

const RegisterProductFormBlock = styled.div`
  form {
    align-items: center;
  }
`;

const ProductRegisterButton = styled(Button)`
  width: 30%;
  height: 3.5rem;
  margin-left: auto;
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

const StyledInput = styled(Input)`
  max-width: 300px;
`;

const ErrorMessage = styled.div`
  margin-top: 0.25rem;
  text-align: left;
  font-size: 0.75rem;
  color: ${palette.red[7]};
`;

const RegisterProductForm = ({ onSubmit }) => {
  const schema = Joi.object({
    category: Joi.number().required().messages({
      'number.base': '⚠ 카테고리를 선택해 주세요.',
    }),
    name: Joi.string().max(40).required().messages({
      'string.empty': '⚠ 상품명을 입력해 주세요.',
      'string.max': '⚠ 상품명은 최대 40글자 입니다.',
    }),
    price: Joi.string()
      .pattern(/^[1-9][0-9]*$/)
      .required()
      .messages({
        'string.empty': '⚠ 판매가를 입력해 주세요.',
        'string.pattern.base': '⚠ 올바른 형식의 판매가를 입력해 주세요.',
      }),
    images: Joi.array()
      .has(Joi.object({ image: Joi.object().required() }))
      .messages({
        'array.hasUnknown': '⚠ 상품 사진을 올려 주세요.',
      }),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      category: null,
      images: [
        { image: null },
        { image: null },
        { image: null },
        { image: null },
      ],
    },
  });

  const {
    formState: { errors, isValid },
    register,
    control,
    handleSubmit,
  } = methods;

  return (
    <RegisterProductFormBlock>
      <WhiteBox>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <GridBox>
              <label>카테고리</label>
              <SelectCategoryBoxContainer />
              <label htmlFor="name">상품명</label>
              <div>
                <StyledInput
                  autoComplete="off"
                  id="name"
                  control={control}
                  {...register('name')}
                />
              </div>
              <label htmlFor="price">판매가</label>
              <div>
                <StyledInput
                  autoComplete="off"
                  id="price"
                  control={control}
                  {...register('price')}
                />
              </div>
              <label>상품 이미지</label>
              <div>
                <UploadBox />
                {errors.images && (
                  <ErrorMessage>{errors.images.message}</ErrorMessage>
                )}
              </div>
            </GridBox>
            <ProductRegisterButton disabled={!isValid}>
              등록
            </ProductRegisterButton>
          </form>
        </FormProvider>
      </WhiteBox>
    </RegisterProductFormBlock>
  );
};

export default RegisterProductForm;
