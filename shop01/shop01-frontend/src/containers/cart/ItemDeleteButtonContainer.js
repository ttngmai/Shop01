import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ItemDeleteButton from '../../components/cart/ItemDeleteButton';
import { deleteItem } from '../../modules/cart';
import ModalPortal from '../../lib/ModalPortal';
import AskDeleteModal from '../../components/cart/AskDeleteModal';

const ItemDeleteButtonContainer = ({ item }) => {
  const dispatch = useDispatch();

  const [askDeleteModal, setAskDeleteModal] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation();
    setAskDeleteModal(true);
  };

  const handleCancelDeleteButtonClick = () => {
    setAskDeleteModal(false);
  };

  const handleConfirmDeleteButtonClick = async () => {
    try {
      dispatch(deleteItem(item.id));
    } catch (err) {
      console.log(err);
    } finally {
      setAskDeleteModal(false);
    }
  };

  return (
    <>
      <ItemDeleteButton onClick={handleClick} />
      <ModalPortal>
        <AskDeleteModal
          visible={askDeleteModal}
          onCancel={handleCancelDeleteButtonClick}
          onConfirm={handleConfirmDeleteButtonClick}
          item={item}
        />
      </ModalPortal>
    </>
  );
};

export default ItemDeleteButtonContainer;
