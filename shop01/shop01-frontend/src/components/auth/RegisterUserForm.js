import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Step1 from './RegisterUserForm/Step1';
import Step2 from './RegisterUserForm/Step2';
import Button from '../common/Button';

const RegisterUserFormBlock = styled.div``;

const RegisterUserErrorMessage = styled.div`
  margin-top: 1rem;
  margin-bottom: -1rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${palette.red[7]};
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  button:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;

  a:hover {
    color: ${palette.indigo[7]};
  }
`;

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    default:
      return 'Unknown step';
  }
};

const fields = [
  ['email', 'password', 'confirmPassword', 'nick'],
  ['phone', 'postCode', 'address1', 'address2'],
];

const RegisterUserForm = ({ error, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Step1', 'Step2'];

  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      )
      .messages({
        'string.empty': '⚠ 이메일을 입력해 주세요.',
        'any.required': '⚠ 이메일을 입력해 주세요.',
        'string.pattern.base': '⚠ 올바른 형식의 이메일을 입력해 주세요.',
      }),
    password: Joi.string().required().messages({
      'string.empty': '⚠ 비밀번호를 입력해 주세요.',
      'any.required': '⚠ 비밀번호를 입력해 주세요.',
    }),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        'string.empty': '⚠ 비밀번호를 한번 더 입력해 주세요.',
        'any.required': '⚠ 비밀번호를 한번 더 입력해 주세요.',
        'any.only': '⚠ 비밀번호와 일치하지 않습니다.',
      }),
    nick: Joi.string().max(15).required().messages({
      'string.empty': '⚠ 닉네임을 입력해 주세요.',
      'any.required': '⚠ 닉네임을 입력해 주세요.',
      'string.max': '⚠ 닉네임은 최대 15글자 입니다.',
    }),
    phone: Joi.string()
      .pattern(/^[0-9]*$/)
      .max(11)
      .required()
      .messages({
        'string.empty': '⚠ 휴대폰 번호를 입력해 주세요.',
        'any.required': '⚠ 휴대폰 번호를 입력해 주세요.',
        'string.pattern.base': '⚠ 숫자만 입력해 주세요.',
        'string.max': '⚠ 휴대폰 번호는 최대 11글자 입니다.',
      }),
    postCode: Joi.string().max(5).required(),
    address1: Joi.string().max(100).required().messages({
      'string.max': '⚠ 주소는 최대 100글자 입니다.',
    }),
    address2: Joi.string().optional().allow('').max(100).messages({
      'string.max': '⚠ 상세 주소는 최대 100글자 입니다.',
    }),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nick: '',
      phone: '',
      postCode: '',
      address1: '',
      address2: '',
    },
  });
  const {
    formState: { isValid },
    trigger,
    handleSubmit,
    watch,
  } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger(fields[activeStep]);

    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log(watch());
  
  return (
    <RegisterUserFormBlock>
      <FormProvider {...methods}>
        <form>
          {getStepContent(activeStep)}
          {error && (
            <RegisterUserErrorMessage>{error}</RegisterUserErrorMessage>
          )}
          <ButtonsBox>
            <Button
              type="button"
              size="large"
              disabled={activeStep === 0}
              onClick={handleBack}
              fullWidth
            >
              이전
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                type="button"
                size="large"
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
                fullWidth
              >
                회원가입
              </Button>
            ) : (
              <Button type="button" size="large" onClick={handleNext} fullWidth>
                다음
              </Button>
            )}
          </ButtonsBox>
        </form>
      </FormProvider>
      <Footer>
        <Link to="/user/login">로그인</Link>
      </Footer>
    </RegisterUserFormBlock>
  );
};

export default RegisterUserForm;
