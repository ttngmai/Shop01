import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { IoAlertCircleSharp } from 'react-icons/io5';
import {
  useForm,
  FormProvider,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from 'react-icons/io5';

const Fullscreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`;

const ModalBlock = styled.div`
  width: 425px;
  padding: 1.5rem;
  border-radius: 4px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const ContentBox = styled.div`
  margin-bottom: 2rem;
`;

const Description = styled.p`
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  margin-top: 0;
  margin-bottom: 2rem;
`;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DefaultShippingAddressLabel = styled.span`
  align-self: flex-start;
  padding: 0.1rem 0.25rem;
  margin-bottom: 0.5rem;
  border-radius: 9px;
  background-color: ${palette.gray[3]};
  font-size: 0.75rem;
`;

const ShippingAddress = styled.p``;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  width: 2rem;
  height: 2rem;

  svg {
    position: relative;
    width: 2rem;
    height: 2rem;
    color: ${palette.gray[5]};
    cursor: pointer;

    &.checked {
      color: ${palette.indigo[7]};
    }
  }

  input {
    position: absolute;
    z-index: -1;
    left: 9.6px;
    opacity: 0;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: 1rem;
  }
`;

const RadioButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
`;

const RadioButton = ({ shippingAddress, name, control }) => {
  const { register } = useFormContext();
  const value = useWatch({
    control,
    name,
  });

  return (
    <RadioButtonLabel htmlFor={`select-address-button-${shippingAddress.id}`}>
      {value === `${shippingAddress.id}` ? (
        <IoCheckmarkCircleSharp className="checked" />
      ) : (
        <IoCheckmarkCircleOutline />
      )}
      <input
        type="radio"
        id={`select-address-button-${shippingAddress.id}`}
        value={shippingAddress.id}
        {...register(name)}
      />
    </RadioButtonLabel>
  );
};

const ShippingAddressItem = React.memo(({ shippingAddress }) => {
  return (
    <ShippingAddressItemBlock>
      <RadioButtonBox>
        <RadioButton shippingAddress={shippingAddress} name="shippingAddress" />
      </RadioButtonBox>
      <ShippingAddressBox>
        {shippingAddress.is_default && (
          <DefaultShippingAddressLabel>기본 배송지</DefaultShippingAddressLabel>
        )}
        <ShippingAddress>
          {shippingAddress.address1} {shippingAddress.address2}
        </ShippingAddress>
      </ShippingAddressBox>
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

const ShippingAddressListModal = ({
  selectedShippingAddress,
  shippingAddresses,
  error,
  onCancel,
  onSubmit,
}) => {
  const methods = useForm({
    defaultValues: {
      shippingAddress: `${selectedShippingAddress.id}`,
    },
  });
  const { handleSubmit } = methods;

  const handlePreventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <Fullscreen onClick={onCancel}>
      <ModalBlock onClick={handlePreventBubbling}>
        <Heading>배송지 목록</Heading>
        <ContentBox>
          <Description>배송지를 선택해 주세요.</Description>
          <FormProvider {...methods}>
            <form
              id="select-shipping-address-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ShippingAddressList
                shippingAddresses={shippingAddresses}
                error={error}
              />
            </form>
          </FormProvider>
        </ContentBox>
        <ButtonsBox>
          <StyledButton onClick={onCancel} fullWidth>
            취소
          </StyledButton>
          <StyledButton form="select-shipping-address-form" fullWidth>
            선택
          </StyledButton>
        </ButtonsBox>
      </ModalBlock>
    </Fullscreen>
  );
};

export default ShippingAddressListModal;
