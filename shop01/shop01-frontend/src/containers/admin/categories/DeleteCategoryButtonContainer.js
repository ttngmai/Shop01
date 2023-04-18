import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmDeleteCategoryModal from '../../../components/admin/categories/ConfirmDeleteCategoryModal';
import DeleteCategoryButton from '../../../components/admin/categories/DeleteCategoryButton';
import { deleteCategory } from '../../../lib/api/categories';
import { listCategories } from '../../../modules/categories';
import ModalPortal from '../../../lib/portal/ModalPortal';

const DeleteCategoryButtonContainer = ({ category }) => {
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

  const handleConfirm = useCallback(
    async (e) => {
      e.stopPropagation();
      try {
        await deleteCategory(category.id);
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
      <DeleteCategoryButton onClick={handleClick} />
      <ModalPortal>
        {modal && (
          <ConfirmDeleteCategoryModal
            category={category}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default DeleteCategoryButtonContainer;
