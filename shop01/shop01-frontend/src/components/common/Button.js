import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${palette.indigo[7]};
  border-radius: 4px;
  background-color: white;
  color: ${palette.indigo[7]};
  cursor: pointer;
  transition: all 0.3s;

  svg {
    align-self: flex-end;
    margin-right: 0.5rem;
  }

  &:not(:disabled):hover {
    background-color: ${palette.indigo[7]};
    color: white;
    box-shadow: 0px 2px 8px #4c72ff;
  }

  &:disabled {
    border: none;
    background-color: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }

  ${(props) => props.$sizeStyle}

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const borderlessButtonStyle = css`
  background-color: white;
  font-size: 1rem;
  cursor: pointer;

  &:not(:disabled):hover {
    color: ${palette.indigo[7]};
  }

  &:disabled {
    background-color: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const StyledButton = styled.button`
  ${(props) => (props.borderless ? borderlessButtonStyle : buttonStyle)}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const sizeStyle = {
  small: css`
    padding: 0;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.25rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 0.5rem;
    font-size: 1.25rem;
  `,
};

const Button = ({ size = 'medium', ...rest }) => {
  return rest.to ? (
    <StyledLink $sizeStyle={sizeStyle[size]} {...rest} />
  ) : (
    <StyledButton $sizeStyle={sizeStyle[size]} {...rest} />
  );
};

export default Button;
