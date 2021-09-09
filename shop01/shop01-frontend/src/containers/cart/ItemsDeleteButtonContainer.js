import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemsDeleteButton from '../../components/cart/ItemsDeleteButton';
import { deleteItems } from '../../modules/cart';
import ModalPortal from '../../lib/ModalPortal';
import AskDeleteItemsModal from '../../components/cart/AskDeleteItemsModal';

const ItemsDeleteButtonContainer = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ cart }) => ({
    cart: cart.cart,
  }));

  const [askDeleteItemsModal, setAskDeleteItemsModal] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setAskDeleteItemsModal(true);
  };

  const handleCancelDeleteButtonClick = () => {
    setAskDeleteItemsModal(false);
  };

  const handleConfirmDeleteButtonClick = () => {
    const ids =
      cart &&
      cart
        .filter((item) => item.checked === true)
        .map((checkedItems) => checkedItems.id);

    dispatch(deleteItems(ids));
    setAskDeleteItemsModal(false);
  };

  return (
    <>
      <ItemsDeleteButton onClick={handleClick} />
      <ModalPortal>
        <AskDeleteItemsModal
          visible={askDeleteItemsModal}
          onCancel={handleCancelDeleteButtonClick}
          onConfirm={handleConfirmDeleteButtonClick}
        />
      </ModalPortal>
    </>
  );
};

export default ItemsDeleteButtonContainer;
