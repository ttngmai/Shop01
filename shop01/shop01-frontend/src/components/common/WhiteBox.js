import React from 'react';
import styled, { css } from 'styled-components';

const WhiteBoxBlock = styled.div`
  padding: 2rem;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);

  ${(props) =>
    props.padding &&
    css`
      padding: ${props.padding};
    `}

  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom};
    `}

  @media ${(props) => props.theme.mobile} {
    padding: 1rem;
  }
`;

const WhiteBox = ({ padding, marginBottom, children }) => {
  return (
    <WhiteBoxBlock padding={padding} marginBottom={marginBottom}>
      {children}
    </WhiteBoxBlock>
  );
};

export default WhiteBox;
