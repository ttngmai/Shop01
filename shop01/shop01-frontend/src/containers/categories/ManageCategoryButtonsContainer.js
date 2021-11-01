import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ManageCategoryButtons from '../../components/categories/ManageCategoryButtons';
import { listCategories } from '../../modules/categories';
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../lib/api/categories';
import ModalPortal from '../../lib/ModalPortal';
import CreateCategoryModal from '../../components/categories/CreateCategoryModal';
import EditCategoryModal from '../../components/categories/EditCategoryModal';
import ConfirmDeleteCategoryModal from '../../components/categories/ConfirmDeleteCategoryModal';

const ManageCategoryButtonsContainer = ({ category }) => {
  const dispatch = useDispatch();

  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [confirmDeleteCategoryModal, setConfirmDeleteCategoryModal] =
    useState(false);

  const handleCreateCategoryButtonClick = useCallback((e) => {
    e.stopPropagation();
    setCreateCategoryModal(true);
  }, []);

  const handleCancelCreateButtonClick = useCallback((e) => {
    e.stopPropagation();
    setCreateCategoryModal(false);
  }, []);

  const handleConfirmCreateButtonClick = useCallback(
    async (data, e) => {
      e.stopPropagation();
      const { name } = data;

      try {
        await createCategory({ id: category.id, name });
        dispatch(listCategories());
      } catch (err) {
        console.log(err);
      } finally {
        setCreateCategoryModal(false);
      }
    },
    [category.id, dispatch],
  );

  const handleEditCategoryButtonClick = useCallback((e) => {
    e.stopPropagation();
    setEditCategoryModal(true);
  }, []);

  const handleCancelEditButtonClick = useCallback((e) => {
    e.stopPropagation();
    setEditCategoryModal(false);
  }, []);

  const handleConfirmEditButtonClick = useCallback(
    async (data, e) => {
      e.stopPropagation();
      const { name } = data;

      try {
        await updateCategory({ id: category.id, name });
        dispatch(listCategories());
      } catch (err) {
        console.log(err);
      } finally {
        setEditCategoryModal(false);
      }
    },
    [category.id, dispatch],
  );

  const handleDeleteCategoryButtonClick = useCallback((e) => {
    e.stopPropagation();
    setConfirmDeleteCategoryModal(true);
  }, []);

  const handleCancelDeleteButtonClick = useCallback((e) => {
    e.stopPropagation();
    setConfirmDeleteCategoryModal(false);
  }, []);

  const hadleConfirmDeleteButtonClick = useCallback(
    async (e) => {
      e.stopPropagation();
      try {
        await deleteCategory(category.id);
        dispatch(listCategories());
      } catch (err) {
        console.log(err);
      } finally {
        setConfirmDeleteCategoryModal(false);
      }
    },
    [category.id, dispatch],
  );

  return (
    <>
      <ManageCategoryButtons
        depth={category.depth}
        onCreateCategoryButtonClick={handleCreateCategoryButtonClick}
        onEditCategoryButtonClick={handleEditCategoryButtonClick}
        onDeleteCategoryButtonClick={handleDeleteCategoryButtonClick}
      />
      <ModalPortal>
        <CreateCategoryModal
          visible={createCategoryModal}
          onCancel={handleCancelCreateButtonClick}
          onSubmit={handleConfirmCreateButtonClick}
        />
        <EditCategoryModal
          visible={editCategoryModal}
          onCancel={handleCancelEditButtonClick}
          onSubmit={handleConfirmEditButtonClick}
          category={category}
        />
        <ConfirmDeleteCategoryModal
          visible={confirmDeleteCategoryModal}
          onCancel={handleCancelDeleteButtonClick}
          onConfirm={hadleConfirmDeleteButtonClick}
          category={category}
        />
      </ModalPortal>
    </>
  );
};

export default ManageCategoryButtonsContainer;
