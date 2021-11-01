import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginFormBlock = styled.div``;

const LoginErrorMessage = styled.div`
  margin-top: 1rem;
  margin-bottom: -1rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${palette.red[7]};
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;

  a:hover {
    color: ${palette.indigo[7]};
  }
`;

const LoginForm = ({ error, onSubmit }) => {
  const schema = Joi.object({
    email: Joi.string().required().messages({
      'string.empty': '⚠ 이메일을 입력해 주세요.',
      'any.required': '⚠ 이메일을 입력해 주세요.',
    }),
    password: Joi.string().required().messages({
      'string.empty': '⚠ 비밀번호를 입력해 주세요.',
      'any.required': '⚠ 비밀번호를 입력해 주세요.',
    }),
  });

  const {
    formState: { errors, isValid },
    register,
    control,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });

  return (
    <LoginFormBlock>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          autoComplete="email"
          label="이메일"
          control={control}
          {...register('email')}
        />
        <Input
          type="password"
          autoComplete="new-password"
          label="비밀번호"
          control={control}
          {...register('password')}
        />
        {error && <LoginErrorMessage>{error}</LoginErrorMessage>}
        <ButtonBox>
          <Button size="large" disabled={!isValid} fullWidth>
            로그인
          </Button>
        </ButtonBox>
      </form>
      <Footer>
        <Link to="/user/register">회원가입</Link>
      </Footer>
    </LoginFormBlock>
  );
};

export default LoginForm;
