import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
  padding: 0.25rem 1rem;
  border: 1px solid ${palette.indigo[7]};
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  font-weight: bold;
  color: ${palette.indigo[7]};
  cursor: pointer;
  transition: all 0.3s;

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

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      padding: 0.75rem 0;
      font-size: 1.125rem;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default Button;
