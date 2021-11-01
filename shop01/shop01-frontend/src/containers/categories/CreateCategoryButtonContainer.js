import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../lib/api/categories';
import { listCategories } from '../../modules/categories';
import CreateCategoryButton from '../../components/categories/CreateCategoryButton';
import ModalPortal from '../../lib/ModalPortal';
import CreateCategoryModal from '../../components/categories/CreateCategoryModal';

const CreateCategoryButtonContainer = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setModal(true);
  }, []);

  const handleCancelCreateButtonClick = useCallback((e) => {
    e.stopPropagation();
    setModal(false);
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      const { name } = data;

      try {
        await createCategory({ name });
        dispatch(listCategories());
      } catch (err) {
        console.log(err);
      } finally {
        setModal(false);
      }
    },
    [dispatch],
  );

  return (
    <>
      <CreateCategoryButton onClick={handleClick} />
      <ModalPortal>
        <CreateCategoryModal
          visible={modal}
          onCancel={handleCancelCreateButtonClick}
          onSubmit={handleSubmit}
        />
      </ModalPortal>
    </>
  );
};

export default CreateCategoryButtonContainer;
