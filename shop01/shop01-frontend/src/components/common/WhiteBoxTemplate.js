import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';

const WhiteBoxTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled(Responsive)`
  padding: 2rem;
  border-radius: 4px;
  margin-top: 3rem;
  margin-bottom: 3rem;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const WhiteBoxTemplate = ({ heading, children }) => {
  return (
    <WhiteBoxTemplateBlock>
      <WhiteBox>
        <Heading>
          {heading}
        </Heading>
        {children}
      </WhiteBox>
    </WhiteBoxTemplateBlock>
  );
};

export default WhiteBoxTemplate;
