import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../../modules/cart';
import DeleteItemButton from '../../../components/user/cart/DeleteItemButton';
import ModalPortal from '../../../lib/portal/ModalPortal';
import ConfirmDeleteItemModal from '../../../components/user/cart/ConfirmDeleteItemModal';

const DeleteItemButtonContainer = ({ item }) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const handleClick = useCallback(async (e) => {
    e.stopPropagation();
    setModal(true);
  }, []);

  const handleCancelDeleteButtonClick = useCallback(() => {
    setModal(false);
  }, []);

  const handleConfirmDeleteButtonClick = useCallback(() => {
    dispatch(deleteItem(item.id));
    setModal(false);
  }, [item.id, dispatch]);

  return (
    <>
      <DeleteItemButton onClick={handleClick} />
      <ModalPortal>
        {modal && (
          <ConfirmDeleteItemModal
            onCancel={handleCancelDeleteButtonClick}
            onConfirm={handleConfirmDeleteButtonClick}
            item={item}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default DeleteItemButtonContainer;
