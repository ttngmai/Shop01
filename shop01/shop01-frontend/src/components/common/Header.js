import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { VscTriangleDown } from 'react-icons/vsc';
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
  height: 3.5rem;

  .logo-area {
    font-size: 1.125rem;
    font-weight: 700;
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
  height: 3.5rem;
`;

const UserMenuBlock = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 1rem;

  .sir {
    padding: 0 0.2rem;
  }
`;

const UserMenuHeading = styled.div`
  cursor: pointer;
`;
const UserMenuContent = styled.nav`
  position: absolute;
  top: 1.95rem;
  right: 0;
  width: 100px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid ${palette.gray[5]};

  &[aria-expanded='true'] {
    display: none;
  }

  li {
    padding: 0.25rem 0.5rem;

    a,
    span {
      cursor: pointer;
    }

    a:hover,
    span:hover {
      color: ${palette.indigo[7]};
    }
  }
`;

const UserMenu = ({ nick, onLogout }) => {
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(!isDropdownOpen);
      }
    };

    if (isDropdownOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isDropdownOpen]);

  return (
    <UserMenuBlock>
      <UserMenuHeading onClick={handleToggle}>
        {nick}
        <span className="sir">님</span>
        <VscTriangleDown />
      </UserMenuHeading>
      <UserMenuContent ref={dropdownRef} aria-expanded={!isDropdownOpen}>
        <ul>
          <li>
            <Link to="/user/mypage">마이페이지</Link>
          </li>
          <li>
            <Link to="/user/cart">장바구니</Link>
          </li>
          <li>
            <Link to="/user/order">주문 목록</Link>
          </li>
          <li>
            <Button onClick={onLogout} borderless>
              로그아웃
            </Button>
          </li>
        </ul>
      </UserMenuContent>
    </UserMenuBlock>
  );
};

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
              <UserMenu nick={user.nick} onLogout={onLogout} />
            </div>
          ) : (
            <div className="right">
              <Button to="/user/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
