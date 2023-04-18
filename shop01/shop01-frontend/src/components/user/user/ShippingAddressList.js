import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { IoAlertCircleSharp } from 'react-icons/io5';
import EditShippingAddressButtonContainer from '../../../containers/user/user/EditShippingAddressButtonContainer';
import DeleteShippingAddressButtonContainer from '../../../containers/user/user/DeleteShippingAddressButtonContainer';

const ShippingAddressListBlock = styled.ul``;

const ShippingAddressItemBlock = styled.li`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid ${palette.gray[3]};

  &:first-child {
    border-top: 1px solid ${palette.gray[3]};
  }
`;

const EmptyShippingAddressList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-top: 1px solid ${palette.gray[3]};
  border-bottom: 1px solid ${palette.gray[3]};

  svg {
    margin-bottom: 1rem;
  }
`;

const ShippingAddressBox = styled.div`
  flex-grow: 1;
`;

const DefaultShippingAddressLabel = styled.span`
  display: inline-block;
  padding: 0.1rem 0.25rem;
  margin-bottom: 0.5rem;
  border-radius: 9px;
  background-color: ${palette.gray[3]};
  font-size: 0.75rem;
`;

const ShippingAddress = styled.p``;

const ButtonsBox = styled.div`
  align-self: center;
  flex-shrink: 0;
  display: flex;
  margin-left: 0.5rem;

  button:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;

const ShippingAddressItem = React.memo(({ shippingAddress }) => {
  return (
    <ShippingAddressItemBlock>
      <ShippingAddressBox>
        {shippingAddress.is_default && (
          <DefaultShippingAddressLabel>기본 배송지</DefaultShippingAddressLabel>
        )}
        <ShippingAddress>
          {shippingAddress.address1} {shippingAddress.address2}
        </ShippingAddress>
      </ShippingAddressBox>
      <ButtonsBox>
        <EditShippingAddressButtonContainer shippingAddress={shippingAddress} />
        <DeleteShippingAddressButtonContainer id={shippingAddress.id} />
      </ButtonsBox>
    </ShippingAddressItemBlock>
  );
});

const ShippingAddressList = ({ shippingAddresses, error }) => {
  if (!shippingAddresses || error) {
    return null;
  }

  if (shippingAddresses.length === 0) {
    return (
      <ShippingAddressListBlock>
        <EmptyShippingAddressList>
          <IoAlertCircleSharp size="3rem" />
          <p>등록된 배송지가 없습니다.</p>
        </EmptyShippingAddressList>
      </ShippingAddressListBlock>
    );
  }

  return (
    <ShippingAddressListBlock>
      {shippingAddresses.map((shippingAddress) => (
        <ShippingAddressItem
          key={shippingAddress.id}
          shippingAddress={shippingAddress}
        />
      ))}
    </ShippingAddressListBlock>
  );
};

export default ShippingAddressList;
