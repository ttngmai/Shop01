import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import EditShippingAddressButtonContainer from '../../../containers/user/cart/EditShppingAddressButtonContainer';

const ButtonBox = styled.div``;

const ShippingAddressBoxBlock = styled.div`
  display: flex;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;

    ${ButtonBox} {
      align-self: flex-end;
    }
  }

  @media ${(props) => props.theme.onlyDesktop} {
    flex-direction: column;
  }
`;

const FlexBox = styled.div`
  flex-grow: 1;
  margin-right: 1rem;

  @media ${(props) => props.theme.mobile} {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  @media ${(props) => props.theme.onlyDesktop} {
    margin-right: 0;
    margin-bottom: 1rem;
  }
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

const ShippingAddressBox = React.memo(({ shippingAddress }) => {
  if (!shippingAddress) {
    return (
      <ShippingAddressBoxBlock>
        등록된 배송지가 없습니다.
      </ShippingAddressBoxBlock>
    );
  }

  const { address1, address2, is_default } = shippingAddress;

  return (
    <ShippingAddressBoxBlock>
      <FlexBox>
        {is_default && (
          <DefaultShippingAddressLabel>기본 배송지</DefaultShippingAddressLabel>
        )}
        <ShippingAddress>
          {address1} {address2}
        </ShippingAddress>
      </FlexBox>
      <ButtonBox>
        <EditShippingAddressButtonContainer />
      </ButtonBox>
    </ShippingAddressBoxBlock>
  );
});

export default ShippingAddressBox;
