import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const AuthFormBlock = styled.div`
  h1 {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.5rem;
  }
`;

const StyledInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  & + & {
    padding-top: 1.5rem;
  }

  input {
    z-index: 1;
    width: 100%;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${palette.gray[5]};
    background-color: transparent;
    line-height: 1.2rem;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-bottom: 1px solid ${palette.gray[7]};
    }

    &:focus + label {
      bottom: 1.95rem;
      font-size: 0.75rem;
      color: black;
    }

    ${(props) =>
      props.value &&
      css`
        & + label {
          bottom: 1.95rem;
          font-size: 0.75rem;
          color: black;
        }
      `};
  }

  label {
    position: absolute;
    bottom: 0.5rem;
    color: ${palette.gray[6]};
    transition: all 0.5s;
  }
`;

const StyledInput = ({
  type,
  autoComplete,
  name,
  value,
  labelText,
  onChange,
}) => {
  return (
    <StyledInputBlock value={value}>
      <input
        type={type}
        autoComplete={autoComplete}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label>{labelText}</label>
    </StyledInputBlock>
  );
};

const ButtonWithMarginTop = styled(Button)`
  margin-top: 2rem;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;

  a:hover {
    color: ${palette.indigo[7]};
  }
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({ type, form, error, onChange, onSubmit }) => {
  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h1>{text}</h1>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="email"
          name="email"
          value={form.email}
          labelText="이메일"
          onChange={onChange}
        />
        <StyledInput
          type="password"
          autoComplete="new-password"
          name="password"
          value={form.password}
          labelText="비밀번호"
          onChange={onChange}
        />
        {type === 'register' && (
          <>
            <StyledInput
              type="password"
              autoComplete="new-password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              labelText="비밀번호 확인"
              onChange={onChange}
            />
            <StyledInput
              autoComplete="off"
              name="nick"
              value={form.nick}
              labelText="닉네임"
              onChange={onChange}
            />
          </>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop fullWidth>{text}</ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/user/register">회원가입</Link>
        ) : (
          <Link to="/user/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
