import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from './Responsive';
import { useSpring, animated } from 'react-spring';
import Button from './Button';
import IconButton from './IconButton';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
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

  & > * + * {
    margin-left: 0.5rem;
  }
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

const StyledIconButton = styled(IconButton)`
  align-self: center;
`;

const SideMenuBlock = styled(animated.nav)`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  width: 300px;
  max-height: 100%;
  background-color: white;
  overflow-y: auto;
`;

const SideMenuContent = styled.div`
  li {
    a {
      display: block;
      padding: 1rem 2rem;
      font-size: 1.25rem;
      cursor: pointer;
    }

    a:hover {
      color: ${palette.indigo[7]};
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 3.5rem;
  padding: 1rem;
`;

const UserMenu = ({ nick, onLogout }) => {
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
        {nick}
        <span className="sir">님</span>
        <BiChevronDown />
      </UserMenuHeading>
      <UserMenuContent aria-expanded={!isDropdownOpen}>
        <ul>
          <li>
            <Link to="/user/mypage">마이페이지</Link>
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

const SideMenu = ({ visible, onClose }) => {
  const { left } = useSpring({
    from: { left: '-100%' },
    to: { left: visible ? '0' : '-100%' },
  });

  return (
    <SideMenuBlock style={{ left }}>
      <SideMenuContent>
        <ButtonBox>
          <StyledIconButton color="black" onClick={onClose}>
            <AiOutlineClose size="1.25rem" />
          </StyledIconButton>
        </ButtonBox>
        <ul>
          <li>
            <Link to="/admin">관리자 메인</Link>
          </li>
          <li>
            <Link to="/category/manage">카테고리 관리</Link>
          </li>
          <li>
            <Link to="/product-list/manage">상품 목록 관리</Link>
          </li>
          <li>
            <Link to="/product/register">상품 등록</Link>
          </li>
        </ul>
      </SideMenuContent>
    </SideMenuBlock>
  );
};

const AdminHeader = ({ user, onLogout }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleOpen = () => {
    setIsSideMenuOpen(true);
  };

  const handleClose = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <StyledIconButton color="black" onClick={handleOpen}>
            <AiOutlineMenu size="1.25rem" />
          </StyledIconButton>
          <Link to="/" className="logo-area">
            SHOP01
          </Link>
          <MenuItemsBox>
            {user ? (
              <UserMenu nick={user.nick} onLogout={onLogout} />
            ) : (
              <Link to="/user/login">로그인</Link>
            )}
          </MenuItemsBox>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
      <SideMenu visible={isSideMenuOpen} onClose={handleClose} />
    </>
  );
};

export default AdminHeader;
