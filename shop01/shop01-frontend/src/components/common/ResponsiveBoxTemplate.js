import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';

const WhiteBoxTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResponsiveBox = styled(Responsive)`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const ResponsiveBoxTemplate = ({ heading, children }) => {
  return (
    <WhiteBoxTemplateBlock>
      <ResponsiveBox>
        <Heading>{heading}</Heading>
        {children}
      </ResponsiveBox>
    </WhiteBoxTemplateBlock>
  );
};

export default ResponsiveBoxTemplate;
