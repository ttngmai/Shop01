import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
  }

  .logo-area img {
    width: 100%;
    max-width: 200px;
    height: auto;
  }

  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 4px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/"><img src="/images/logo.png" alt="logo" /></Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
