import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import WhiteBox from '../common/WhiteBox';

const UserProfileBlock = styled.div``;

const Heading = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const GridBox = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: flex-start;
  align-items: center;
  row-gap: 1rem;

  dt {
    align-self: stretch;
    display: flex;
    align-items: center;
    position: relative;
    max-width: 120px;
    padding-right: 1rem;
    margin-right: 1.35rem;

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      right: -0.35rem;
      width: 0.35rem;
      height: 100%;
      background-color: ${palette.gray[2]};
    }
  }

  dd {
    word-break: break-all;
  }
`;

const UserProfile = ({ user, error }) => {
  if (!user || error) {
    return null;
  }

  return (
    <UserProfileBlock>
      <Heading>회원 정보</Heading>
      <WhiteBox marginBottom="2rem">
        <GridBox>
          <dt>이메일</dt>
          <dd>{user.email}</dd>
          <dt>닉네임</dt>
          <dd>{user.nick}</dd>
        </GridBox>
      </WhiteBox>
    </UserProfileBlock>
  );
};

export default UserProfile;
