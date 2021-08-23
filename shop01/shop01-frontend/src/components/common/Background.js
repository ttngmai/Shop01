import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const BackgroundBlock = styled.div`
  min-height: 100vh;
  background-color: ${palette.indigo[0]};
`;

const Background = ({ children }) => {
  return <BackgroundBlock>{children}</BackgroundBlock>;
};

export default Background;
