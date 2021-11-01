import React from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  & + & {
    margin-top: 0.5rem;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  input {
    z-index: 1;
    width: 100%;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid ${palette.gray[3]};
    background-color: transparent;
    line-height: 1.2rem;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-bottom: 2px solid ${palette.gray[5]};

      & + label {
        bottom: 1.825rem;
        font-size: 0.75rem;
        color: black;
      }
    }

    ${(props) =>
      props.hasLabel &&
      css`
        padding-top: 1.3rem;
      `}

    ${(props) =>
      props.value &&
      css`
        & + label {
          bottom: 1.825rem;
          font-size: 0.75rem;
          color: black;
        }
      `};

    ${(props) =>
      props.error &&
      css`
        border-color: ${palette.red[7]};
      `};
  }

  label {
    position: absolute;
    bottom: 0.25rem;
    color: ${palette.gray[5]};
    transition: all 0.5s;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 0.25rem;
  text-align: left;
  font-size: 0.75rem;
  color: ${palette.red[7]};
`;

const Input = React.forwardRef(
  ({ type, autoComplete, name, label, control, ...rest }, ref) => {
    const { errors } = useFormState({ control });
    const value = useWatch({
      control,
      name,
    });
    const hasLabel = !!label;

    return (
      <InputBlock>
        <InputBox value={!!value} hasLabel={hasLabel} error={!!errors[name]}>
          <input
            ref={ref}
            type={type}
            autoComplete={autoComplete}
            name={name}
            {...rest}
          />
          {label && <label>{label}</label>}
        </InputBox>
        {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
      </InputBlock>
    );
  },
);

export default Input;
