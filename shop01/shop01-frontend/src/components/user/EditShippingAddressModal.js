import React, { useEffect } from 'react';
import Joi from 'joi';
import { useForm, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Input from '../common/Input';
import Button from '../common/Button';
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from 'react-icons/io5';

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

const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  height: 2rem;
  cursor: pointer;

  input {
    position: absolute;
    z-index: -1;
    left: 9.6px;
    opacity: 0;
  }
`;

const LabelInnerBox = styled.div`
  display: flex;
  align-items: center;

  svg {
    position: relative;
    margin-top: 1.5px;
    color: ${palette.gray[5]};

    &.checked {
      color: ${palette.indigo[7]};
    }
  }

  span {
    margin-left: 0.25rem;
  }
`;

const CheckBox = React.forwardRef(({ control, ...rest }, ref) => {
  const checked = useWatch({
    control,
    name: rest.name,
  });

  return (
    <CheckBoxLabel>
      {checked ? (
        <LabelInnerBox>
          <IoCheckmarkCircleSharp size="2rem" className="checked" />
          <span>기본 배송지로 저장</span>
        </LabelInnerBox>
      ) : (
        <LabelInnerBox>
          <IoCheckmarkCircleOutline size="2rem" />
          <span>기본 배송지로 저장</span>
        </LabelInnerBox>
      )}
      <input type="checkbox" ref={ref} {...rest} />
    </CheckBoxLabel>
  );
});

const EditShippingAddressModal = ({ shippingAddress, onCancel, onSubmit }) => {
  const schema = Joi.object({
    postCode: Joi.string().max(5).required(),
    address1: Joi.string().max(100).required(),
    address2: Joi.string().allow('').max(100).optional().messages({
      'string.max': '⚠ 상세 주소는 최대 100글자 입니다.',
    }),
    is_default: Joi.boolean().required(),
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
      address2: shippingAddress.address2,
      is_default: shippingAddress.is_default,
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
            </InputsBox>
            {!shippingAddress.is_default && (
              <CheckBox control={control} {...register('is_default')} />
            )}
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
