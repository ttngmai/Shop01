import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const FooterBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.gray[1]};
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 3rem;
`;

const Footer = () => {
  return <FooterBlock>Footer</FooterBlock>;
};

export default Footer;
