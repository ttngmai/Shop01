import React, { useEffect } from 'react';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import Input from '../../common/Input';
import Button from '../../common/Button';

const Background = styled.div`
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

const Heading = styled.h2`
  margin-top: 0;
  margin-bottom: 2rem;
`;

const ContentBox = styled.div`
  margin-bottom: 2rem;
`;

const Description = styled.p`
  margin-bottom: 2rem;
`;

const InputsBox = styled.div`
  margin-bottom: 1rem;
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

const ReadOnlyFieldBlock = styled.dl`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  dt {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }

  dd {
    padding-bottom: 0.25rem;
    border-bottom: 2px solid ${palette.gray[3]};
    line-height: 1.2rem;
  }
`;

const ReadOnlyField = ({ label, value }) => {
  return (
    <ReadOnlyFieldBlock>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </ReadOnlyFieldBlock>
  );
};

const EditShippingAddressModal = ({ shippingAddress, onCancel, onSubmit }) => {
  const schema = Joi.object({
    address2: Joi.string().allow('').max(100).optional().messages({
      'string.max': '⚠ 상세 주소는 최대 100글자 입니다.',
    }),
  });

  const {
    formState: { isValid },
    register,
    control,
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      address2: shippingAddress.address2,
    },
  });

  const handlePreventBubbling = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Background onClick={onCancel}>
      <ModalBlock onClick={handlePreventBubbling}>
        <Heading>배송지 등록</Heading>
        <ContentBox>
          <form
            id="edit-shipping-address-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Description>나머지 주소를 입력해 주세요.</Description>
            <InputsBox>
              <ReadOnlyField
                label="우편 번호"
                value={shippingAddress.postCode}
              />
              <ReadOnlyField label="주소" value={shippingAddress.address1} />
              <Input
                autoComplete="off"
                label="상세 주소"
                control={control}
                {...register('address2')}
              />
            </InputsBox>
          </form>
        </ContentBox>
        <ButtonsBox>
          <StyledButton onClick={onCancel} fullWidth>
            취소
          </StyledButton>
          <StyledButton
            form="edit-shipping-address-form"
            disabled={!isValid}
            fullWidth
          >
            저장
          </StyledButton>
        </ButtonsBox>
      </ModalBlock>
    </Background>
  );
};

export default EditShippingAddressModal;
