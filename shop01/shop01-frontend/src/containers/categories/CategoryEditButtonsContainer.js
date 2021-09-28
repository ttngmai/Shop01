import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../../components/common/Button';
import CategoryEditButtons from '../../components/categories/CategoryEditButtons';
import { listCategories } from '../../modules/categories';
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../lib/api/categories';
import ModalPortal from '../../lib/ModalPortal';
import AskCreateModal from '../../components/categories/AskCreateModal';
import AskEditModal from '../../components/categories/AskEditModal';
import AskDeleteModal from '../../components/categories/AskDeleteModal';

const CreateButton = styled(Button)``;

const StyledInput = styled.input`
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${palette.gray[5]};
  background-color: transparent;
  line-height: 1.2rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
`;

export const CreateButtonContainer = () => {
  const dispatch = useDispatch();

  const [askCreateModal, setAskCreateModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCreateButtonClick = (e) => {
    e.stopPropagation();
    setAskCreateModal(true);
  };

  const handleCancelCreateButtonClick = () => {
    setAskCreateModal(false);
    setInputValue('');
  };

  const handleConfirmCreateButtonClick = async () => {
    try {
      await createCategory({ name: inputValue });
      dispatch(listCategories());
    } catch (err) {
      console.log(err);
    } finally {
      setAskCreateModal(false);
      setInputValue('');
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <>
      <CreateButton onClick={handleCreateButtonClick}>
        카테고리 추가
      </CreateButton>
      <ModalPortal>
        <AskCreateModal
          visible={askCreateModal}
          onCancel={handleCancelCreateButtonClick}
          onConfirm={handleConfirmCreateButtonClick}
        >
          <StyledInput
            autoComplete="off"
            name="name"
            onChange={handleChange}
            value={inputValue}
          />
        </AskCreateModal>
      </ModalPortal>
    </>
  );
};

const CategoryEditButtonsContainer = ({ category }) => {
  const dispatch = useDispatch();

  const [askCreateModal, setAskCreateModal] = useState(false);
  const [askEditModal, setAskEditModal] = useState(false);
  const [askDeleteModal, setAskDeleteModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCreateButtonClick = (e) => {
    e.stopPropagation();
    setAskCreateModal(true);
  };

  const handleCancelCreateButtonClick = () => {
    setInputValue('');
    setAskCreateModal(false);
  };

  const handleConfirmCreateButtonClick = async () => {
    try {
      await createCategory({ id: category.id, name: inputValue });
      dispatch(listCategories());
    } catch (err) {
      console.log(err);
    } finally {
      setAskCreateModal(false);
      setInputValue('');
    }
  };

  const handleEditButtonClick = (e) => {
    e.stopPropagation();
    setAskEditModal(true);
  };

  const handleCancelEditButtonClick = () => {
    setInputValue('');
    setAskEditModal(false);
  };

  const handleConfirmEditButtonClick = async () => {
    try {
      await updateCategory(category.id, inputValue);
      dispatch(listCategories());
    } catch (err) {
      console.log(err);
    } finally {
      setAskEditModal(false);
      setInputValue('');
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
    setAskDeleteModal(true);
  };

  const handleCancelDeleteButtonClick = () => {
    setAskDeleteModal(false);
  };

  const hadleConfirmDeleteButtonClick = async () => {
    try {
      await deleteCategory(category.id);
      dispatch(listCategories());
    } catch (err) {
      console.log(err);
    } finally {
      setAskDeleteModal(false);
    }
  };

  return (
    <>
      <CategoryEditButtons
        depth={category.depth}
        onCreateButtonClick={handleCreateButtonClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={handleDeleteButtonClick}
      />
      <ModalPortal>
        <AskCreateModal
          visible={askCreateModal}
          onCancel={handleCancelCreateButtonClick}
          onConfirm={handleConfirmCreateButtonClick}
        >
          <StyledInput
            autoComplete="off"
            name="name"
            onChange={handleChange}
            value={inputValue}
          />
        </AskCreateModal>
        <AskEditModal
          visible={askEditModal}
          onCancel={handleCancelEditButtonClick}
          onConfirm={handleConfirmEditButtonClick}
          category={category}
        >
          <StyledInput
            autoComplete="off"
            name="name"
            onChange={handleChange}
            value={inputValue}
          />
        </AskEditModal>
        <AskDeleteModal
          visible={askDeleteModal}
          onCancel={handleCancelDeleteButtonClick}
          onConfirm={hadleConfirmDeleteButtonClick}
          category={category}
        />
      </ModalPortal>
    </>
  );
};

export default CategoryEditButtonsContainer;
