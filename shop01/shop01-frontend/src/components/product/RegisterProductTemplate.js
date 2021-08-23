import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const RegisterProductTemplateBlock = styled.div`
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

const RegisterProductTemplate = ({ children }) => {
  return (
    <RegisterProductTemplateBlock>
      <WhiteBox>{children}</WhiteBox>
    </RegisterProductTemplateBlock>
  );
};

export default RegisterProductTemplate;
