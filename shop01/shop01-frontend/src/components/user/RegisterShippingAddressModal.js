import React, { useEffect } from 'react';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';

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

const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;

  button:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

const RegisterShippingAddressModal = ({
  shippingAddress,
  onCancel,
  onSubmit,
}) => {
  const schema = Joi.object({
    postCode: Joi.string().max(5).required(),
    address1: Joi.string().max(100).required().messages({
      'string.max': '⚠ 주소는 최대 100글자 입니다.',
    }),
    address2: Joi.string().optional().allow('').max(100).messages({
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
      postCode: shippingAddress.post_code,
      address1: shippingAddress.address1,
      address2: '',
    },
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const handlePreventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <Background onClick={onCancel}>
      <ModalBlock onClick={handlePreventBubbling}>
        <Heading>배송지 등록</Heading>
        <ContentBox>
          <Description>나머지 주소를 입력해 주세요.</Description>
          <form
            id="register-shipping-address-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              autoComplete="off"
              label="우편 번호"
              control={control}
              {...register('postCode')}
              readOnly
            />
            <Input
              autoComplete="off"
              label="주소"
              control={control}
              {...register('address1')}
              readOnly
            />
            <Input
              autoComplete="off"
              label="상세 주소"
              control={control}
              {...register('address2')}
            />
          </form>
        </ContentBox>
        <ButtonsBox>
          <Button onClick={onCancel} fullWidth>
            취소
          </Button>
          <Button
            form="register-shipping-address-form"
            disabled={!isValid}
            fullWidth
          >
            등록
          </Button>
        </ButtonsBox>
      </ModalBlock>
    </Background>
  );
};

export default RegisterShippingAddressModal;
