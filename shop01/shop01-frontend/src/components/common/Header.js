import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from './Responsive';
import Button from './Button';
import ProductCategoryMenuContainer from '../../containers/common/ProductCategoryMenuContainer';
import { BiChevronDown } from 'react-icons/bi';

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 3.5rem;

  .logo-area {
    justify-self: center;
    align-self: center;
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: 2px;
    transition: all 0.3s;
  }

  .logo-area:hover {
    color: ${palette.indigo[7]};
  }
`;

const MenuItemsBox = styled.div`
  justify-self: flex-end;
  align-self: stretch;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Spacer = styled.div`
  height: 3.5rem;
`;

const UserMenuBlock = styled.div`
  align-self: stretch;
  display: flex;
  position: relative;

  .sir {
    padding: 0 0.2rem;
  }
`;

const UserMenuHeading = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & > svg {
    margin-top: 2px;
  }
`;

const UserMenuContent = styled.nav`
  position: absolute;
  top: 3.5rem;
  right: 0;
  width: 100px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);

  &[aria-expanded='true'] {
    display: none;
  }

  li {
    a {
      display: block;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
    }

    a:hover {
      color: ${palette.indigo[7]};
    }
  }
`;

const StyledButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: left;
`;

const UserMenu = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <UserMenuBlock
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <UserMenuHeading>
        {user.nick}
        <span className="sir">님</span>
        <BiChevronDown />
      </UserMenuHeading>
      <UserMenuContent aria-expanded={!isDropdownOpen}>
        <ul>
          {user.Role.name === 'ADMIN' && (
            <li>
              <Link to="/admin">관리자 메인</Link>
            </li>
          )}
          <li>
            <Link to="/user/mypage">마이 페이지</Link>
          </li>
          <li>
            <Link to="/user/cart">장바구니</Link>
          </li>
          <li>
            <Link to="/user/order-list">주문 목록</Link>
          </li>
          <li>
            <StyledButton onClick={onLogout} borderless fullWidth>
              로그아웃
            </StyledButton>
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
          <ProductCategoryMenuContainer />
          <Link to="/" className="logo-area">
            SHOP01
          </Link>
          <MenuItemsBox>
            {user ? (
              <UserMenu user={user} onLogout={onLogout} />
            ) : (
              <Link to="/user/login">로그인</Link>
            )}
          </MenuItemsBox>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
