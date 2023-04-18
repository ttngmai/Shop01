import React from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../common/Input';

const Step1 = () => {
  const { register, setValue, trigger, control } = useFormContext();

  return (
    <>
      <Input
        autoComplete="email"
        label="이메일"
        control={control}
        {...register('email')}
      />
      <Input
        type="password"
        autoComplete="new-password"
        label="비밀번호"
        control={control}
        {...register('password', {
          onChange: (e) => {
            setValue('password', e.target.value);
            trigger('confirmPassword');
          },
        })}
      />
      <Input
        type="password"
        autoComplete="new-password"
        label="비밀번호 확인"
        control={control}
        {...register('confirmPassword')}
      />
      <Input
        autoComplete="off"
        label="닉네임"
        control={control}
        {...register('nick')}
      />
    </>
  );
};

export default Step1;
