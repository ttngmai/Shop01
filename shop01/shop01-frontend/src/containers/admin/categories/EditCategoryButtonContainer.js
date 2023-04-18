import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import EditCategoryButton from '../../../components/admin/categories/EditCategoryButton';
import { updateCategory } from '../../../lib/api/categories';
import { listCategories } from '../../../modules/categories';
import ModalPortal from '../../../lib/portal/ModalPortal';
import EditCategoryModal from '../../../components/admin/categories/EditCategoryModal';

const EditCategoryButtonContainer = ({ category }) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setModal(true);
  }, []);

  const handleCancel = useCallback((e) => {
    e.stopPropagation();
    setModal(false);
  }, []);

  const handleSubmit = useCallback(
    async (data, e) => {
      e.stopPropagation();
      const { name } = data;

      try {
        await updateCategory({ id: category.id, name });
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
      <EditCategoryButton onClick={handleClick} />
      <ModalPortal>
        {modal && (
          <EditCategoryModal
            category={category}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default EditCategoryButtonContainer;
