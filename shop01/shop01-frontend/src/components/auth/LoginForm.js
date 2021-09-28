import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const LoginFormBlock = styled.div`
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
    padding-bottom: 0.25rem;
    border-bottom: 1px solid ${palette.gray[3]};
    background-color: transparent;
    line-height: 1.2rem;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-bottom: 1px solid ${palette.gray[5]};
    }

    &:focus + label {
      bottom: 1.7rem;
      font-size: 0.75rem;
      color: black;
    }

    ${(props) =>
      props.value &&
      css`
        & + label {
          bottom: 1.7rem;
          font-size: 0.75rem;
          color: black;
        }
      `};
  }

  label {
    position: absolute;
    bottom: 0.25rem;
    color: ${palette.gray[5]};
    transition: all 0.5s;
  }
`;

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

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
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

const LoginForm = ({ form, error, onChange, onSubmit }) => {
  return (
    <LoginFormBlock>
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop fullWidth>로그인</ButtonWithMarginTop>
      </form>
      <Footer>
        <Link to="/user/register">회원가입</Link>
      </Footer>
    </LoginFormBlock>
  );
};

export default LoginForm;
