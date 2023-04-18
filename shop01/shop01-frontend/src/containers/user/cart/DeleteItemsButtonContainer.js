import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import DeleteItemsButton from '../../../components/user/cart/DeleteItemsButton';
import ModalPortal from '../../../lib/portal/ModalPortal';
import ConfirmDeleteItemsModal from '../../../components/user/cart/ConfirmDeleteItemsModal';
import { deleteItems } from '../../../modules/cart';

const DeleteItemsButtonContainer = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(
    ({ cart }) => ({
      cart: cart.cart,
    }),
    shallowEqual,
  );

  const [modal, setModal] = useState(false);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setModal(true);
  }, []);

  const handleCancelDeleteButtonClick = useCallback(() => {
    setModal(false);
  }, []);

  const handleConfirmDeleteButtonClick = useCallback(() => {
    const ids =
      cart &&
      cart
        .filter((item) => item.checked === true)
        .map((checkedItems) => checkedItems.id);

    dispatch(deleteItems(ids));
    setModal(false);
  }, [cart, dispatch]);

  return (
    <>
      <DeleteItemsButton onClick={handleClick} />
      <ModalPortal>
        {modal && (
          <ConfirmDeleteItemsModal
            onCancel={handleCancelDeleteButtonClick}
            onConfirm={handleConfirmDeleteButtonClick}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default DeleteItemsButtonContainer;
