import React, { useEffect } from 'react';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`;

const CreateCategoryModalBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  border-radius: 4px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const Heading = styled.h2`
  margin-top: 0;
  margin-bottom: 2rem;
`;

const ContentBox = styled.div`
  margin-bottom: 2rem;
`;

const Description = styled.p`
  margin-bottom: 2rem;
`;

const StyledInput = styled(Input)`
  max-width: 300px;
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: 1rem;
  }
`;

const CreateCategoryModal = ({ visible, onCancel, onSubmit }) => {
  const schema = Joi.object({
    name: Joi.string().max(20).required().messages({
      'string.empty': '⚠ 카테고리명을 입력해 주세요.',
      'string.max': '⚠ 카테고리명은 최대 20글자 입니다.',
    }),
  });

  const {
    formState: { isValid },
    register,
    control,
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (!visible) {
      reset();
    }
  }, [visible, reset]);

  if (!visible) return null;

  const handlePreventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <Background onClick={onCancel}>
      <CreateCategoryModalBlock onClick={handlePreventBubbling}>
        <Heading>카테고리 생성</Heading>
        <ContentBox>
          <form id="create-category-form" onSubmit={handleSubmit(onSubmit)}>
            <Description>생성할 카테고리명을 입력해 주세요.</Description>
            <StyledInput
              autoComplete="off"
              control={control}
              {...register('name')}
            />
          </form>
        </ContentBox>
        <ButtonsBox>
          <StyledButton onClick={onCancel} fullWidth>
            취소
          </StyledButton>
          <StyledButton
            form="create-category-form"
            disabled={!isValid}
            fullWidth
          >
            생성
          </StyledButton>
        </ButtonsBox>
      </CreateCategoryModalBlock>
    </Background>
  );
};

export default CreateCategoryModal;
