import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import palette from '../../lib/styles/palette';

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;

  .logo-area {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    transition: all 0.3s;
  }

  .logo-area:hover {
    color: ${palette.indigo[7]};
  }

  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo-area">
            SHOP01
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.nick}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
