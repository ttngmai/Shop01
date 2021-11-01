import React from 'react';
import styled from 'styled-components';
import WhiteBox from '../common/WhiteBox';
import SearchShippingAddressButtonContainer from '../../containers/user/SearchShippingAddressButtonContainer';
import ShippingAddressListContainer from '../../containers/user/ShippingAddressListContainer';

const UserShippingAddressesBlock = styled.div``;

const Heading = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const SearchShippingAddressButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const UserShippingAddresses = () => {
  return (
    <UserShippingAddressesBlock>
      <Heading>배송지 관리</Heading>
      <WhiteBox>
        <SearchShippingAddressButtonBox>
          <SearchShippingAddressButtonContainer />
        </SearchShippingAddressButtonBox>
        <ShippingAddressListContainer />
      </WhiteBox>
    </UserShippingAddressesBlock>
  );
};

export default UserShippingAddresses;
