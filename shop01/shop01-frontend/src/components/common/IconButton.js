import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const iconButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;

  svg {
    color: ${(props) => props.color};
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.color};

    svg {
      color: white;
    }
  }

  &:disabled {
    background-color: ${palette.gray[3]};
    cursor: not-allowed;

    svg {
      color: ${palette.gray[5]};
    }
  }

  ${(props) => props.$sizeStyle}
`;

const StyledIconButton = styled.button`
  ${iconButtonStyle}
`;

const StyledLink = styled(Link)`
  ${iconButtonStyle}
`;

const sizeStyle = {
  small: css`
    width: 1.5rem;
    height: 1.5rem;

    svg {
      width: 1rem;
      height: 1rem;
    }
  `,
  medium: css`
    width: 1.75rem;
    height: 1.75rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  `,
  large: css`
    width: 2rem;
    height: 2rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  `,
};

const IconButton = ({
  size = 'medium',
  color = palette.indigo[7],
  ...rest
}) => {
  return rest.to ? (
    <StyledLink $sizeStyle={sizeStyle[size]} color={color} {...rest} />
  ) : (
    <StyledIconButton $sizeStyle={sizeStyle[size]} color={color} {...rest} />
  );
};

export default IconButton;
