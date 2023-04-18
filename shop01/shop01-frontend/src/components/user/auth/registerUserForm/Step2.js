import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import palette from '../../../../lib/styles/palette';
import Input from '../../../common/Input';
import SearchShippingAddressButtonContainer from '../../../../containers/user/auth/SearchShippingAddressButtonContainer';
import EditShippingAddressButton from '../EditShippingAddressButton';
import DeleteShippingAddressButton from '../DeleteShippingAddressButton';
import { IoAlertCircleSharp } from 'react-icons/io5';

const RegisterShippingAddressBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ShippingAddressBlock = styled.div`
  display: flex;
  padding: 1rem 0;
  border-top: 1px solid ${palette.gray[3]};
  border-bottom: 1px solid ${palette.gray[3]};
`;

const EmptyShippingAddress = styled.div`
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
  display: flex;
  align-items: center;
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

const Step2 = () => {
  const { register, control } = useFormContext();

  const postCode = useWatch({
    control,
    name: 'postCode',
  });
  const address1 = useWatch({
    control,
    name: 'address1',
  });
  const address2 = useWatch({
    control,
    name: 'address2',
  });

  return (
    <>
      <Input
        autoComplete="off"
        label="휴대폰"
        control={control}
        {...register('phone')}
      />
      <RegisterShippingAddressBox>
        <SearchShippingAddressButtonContainer />
      </RegisterShippingAddressBox>

      {!(postCode || address1) ? (
        <EmptyShippingAddress>
          <IoAlertCircleSharp size="3rem" />
          <p>배송지를 등록해 주세요.</p>
        </EmptyShippingAddress>
      ) : (
        <ShippingAddressBlock>
          <ShippingAddressBox>
            <ShippingAddress>
              {address1} {address2}
            </ShippingAddress>
          </ShippingAddressBox>
          <ButtonsBox>
            <EditShippingAddressButton />
            <DeleteShippingAddressButton />
          </ButtonsBox>
        </ShippingAddressBlock>
      )}
    </>
  );
};

export default Step2;
