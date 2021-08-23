import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeProduct,
  changeField,
  registerProduct,
} from '../../modules/product';
import RegisterProductForm from '../../components/product/RegisterProductForm';
import SelectCategoryBoxContainer from './SelectCategoryBoxContainer';
import UploadBoxContainer from './UploadBoxContainer';

const RegisterProductFormContainer = () => {
  const dispatch = useDispatch();
  const { form, error } = useSelector(({ product }) => ({
    form: product.register,
    error: product.error,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { category, name, price, images } = form;
    const formData = new FormData();

    formData.append('category', category);
    formData.append('name', name);
    formData.append('price', price);

    for (let image of images) {
      if (image.imageFile) {
        formData.append('images', image.imageFile);
      }
    }

    dispatch(registerProduct(formData));
  };

  useEffect(() => {
    dispatch(initializeProduct());
  }, [dispatch]);

  return (
    <RegisterProductForm
      form={form}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
      selectCategoryBox={<SelectCategoryBoxContainer />}
      uploadBox={<UploadBoxContainer />}
    />
  );
};

export default RegisterProductFormContainer;
