import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import DeleteItemsButton from '../../components/cart/DeleteItemsButton';
import ModalPortal from '../../lib/ModalPortal';
import ConfirmDeleteItemsModal from '../../components/cart/ConfirmDeleteItemsModal';
import { deleteItems } from '../../modules/cart';

const DeleteItemsButtonContainer = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(
    ({ cart }) => ({
      cart: cart.cart,
    }),
    shallowEqual,
  );

  const [confirmDeleteItemsModal, setConfirmDeleteItemsModal] = useState(false);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setConfirmDeleteItemsModal(true);
  }, []);

  const handleCancelDeleteButtonClick = useCallback(() => {
    setConfirmDeleteItemsModal(false);
  }, []);

  const handleConfirmDeleteButtonClick = useCallback(() => {
    const ids =
      cart &&
      cart
        .filter((item) => item.checked === true)
        .map((checkedItems) => checkedItems.id);

    dispatch(deleteItems(ids));
    setConfirmDeleteItemsModal(false);
  }, [cart, dispatch]);

  return (
    <>
      <DeleteItemsButton onClick={handleClick} />
      <ModalPortal>
        <ConfirmDeleteItemsModal
          visible={confirmDeleteItemsModal}
          onCancel={handleCancelDeleteButtonClick}
          onConfirm={handleConfirmDeleteButtonClick}
        />
      </ModalPortal>
    </>
  );
};

export default DeleteItemsButtonContainer;
