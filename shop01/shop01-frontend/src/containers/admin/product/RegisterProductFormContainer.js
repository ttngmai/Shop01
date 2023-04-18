import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { initializeProduct, registerProduct } from '../../../modules/product';
import RegisterProductForm from '../../../components/admin/product/RegisterProductForm';

const RegisterProductFormContainer = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(
    ({ product }) => ({
      error: product.error,
    }),
    shallowEqual,
  );

  const handleSubmit = (data) => {
    const { category, name, price, images } = data;
    const formData = new FormData();

    formData.append('category', category);
    formData.append('name', name);
    formData.append('price', price);

    for (let image of images) {
      if (image.image?.file) {
        formData.append('images', image.image.file);
      }
    }

    dispatch(registerProduct(formData));
  };

  useEffect(() => {
    dispatch(initializeProduct());
  }, [dispatch]);

  return <RegisterProductForm error={error} onSubmit={handleSubmit} />;
};

export default RegisterProductFormContainer;
