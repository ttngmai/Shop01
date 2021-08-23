import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadBox from '../../components/product/UploadBox';
import { changeField } from '../../modules/product';

const UploadBoxContainer = () => {
  const dispatch = useDispatch();
  const { images } = useSelector(({ product }) => ({
    images: product.register.images,
  }));

  const handleChange = (result) => {
    if (!result.destination) {
      return;
    }

    const items = [...images];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(
      changeField({
        form: 'register',
        key: 'images',
        value: items,
      }),
    );
  };

  const handleChangeFile = (e) => {
    const { name } = e.target;
    let reader = new FileReader();
    const tempImages = [...images];

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      tempImages.forEach((image, index) => {
        if (image.id === name) {
          const updatedImage = { ...image, imageFile: e.target.files[0] };

          tempImages.splice(index, 1, updatedImage);
        }
      });
    }

    reader.onloadend = () => {
      const base64 = reader.result;

      if (base64) {
        tempImages.forEach((image, index) => {
          if (image.id === name) {
            const updatedImage = { ...image, imageBase64: base64.toString() };
            tempImages.splice(index, 1, updatedImage);

            dispatch(
              changeField({
                form: 'register',
                key: 'images',
                value: tempImages,
              }),
            );
          }
        });
      }
    };
  };

  return (
    <UploadBox
      images={images}
      onChange={handleChange}
      onChangeFile={handleChangeFile}
    />
  );
};

export default UploadBoxContainer;
