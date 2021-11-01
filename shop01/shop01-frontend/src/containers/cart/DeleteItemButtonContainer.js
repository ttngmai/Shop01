import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../modules/cart';
import DeleteItemButton from '../../components/cart/DeleteItemButton';
import ModalPortal from '../../lib/ModalPortal';
import ConfirmDeleteItemModal from '../../components/cart/ConfirmDeleteItemModal';

const DeleteItemButtonContainer = ({ item }) => {
  const dispatch = useDispatch();

  const [confirmDeleteItemModal, setConfirmDeleteItemModal] = useState(false);

  const handleClick = useCallback(async (e) => {
    e.stopPropagation();
    setConfirmDeleteItemModal(true);
  }, []);

  const handleCancelDeleteButtonClick = useCallback(() => {
    setConfirmDeleteItemModal(false);
  }, []);

  const handleConfirmDeleteButtonClick = useCallback(() => {
    dispatch(deleteItem(item.id));
    setConfirmDeleteItemModal(false);
  }, [item.id, dispatch]);

  return (
    <>
      <DeleteItemButton onClick={handleClick} />
      <ModalPortal>
        <ConfirmDeleteItemModal
          visible={confirmDeleteItemModal}
          onCancel={handleCancelDeleteButtonClick}
          onConfirm={handleConfirmDeleteButtonClick}
          item={item}
        />
      </ModalPortal>
    </>
  );
};

export default DeleteItemButtonContainer;
