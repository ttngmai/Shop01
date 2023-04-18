import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../lib/api/categories';
import { listCategories } from '../../../modules/categories';
import CreateCategoryButton from '../../../components/admin/categories/CreateCategoryButton';
import ModalPortal from '../../../lib/portal/ModalPortal';
import CreateCategoryModal from '../../../components/admin/categories/CreateCategoryModal';

const CreateCategoryButtonContainer = ({ type, category }) => {
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
        if (category) {
          await createCategory({ id: category.id, name });
        } else {
          await createCategory({ name });
        }
        dispatch(listCategories());
      } catch (err) {
        console.log(err);
      } finally {
        setModal(false);
      }
    },
    [category, dispatch],
  );

  return (
    <>
      <CreateCategoryButton
        type={type}
        depth={category?.depth}
        onClick={handleClick}
      />
      <ModalPortal>
        {modal && (
          <CreateCategoryModal
            onCancel={handleCancelCreateButtonClick}
            onSubmit={handleSubmit}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default CreateCategoryButtonContainer;
