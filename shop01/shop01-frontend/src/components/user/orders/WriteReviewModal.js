import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import Button from '../../common/Button';
import StarRatingBoxContainer from '../../../containers/user/orders/StarRatingBoxContainer';
import EditorContainer from '../../../containers/common/EditorContainer';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`;

const ModalBlock = styled(Responsive)`
  padding: 1.5rem;
  border-radius: 4px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const Heading = styled.h2`
  margin-top: 0;
  margin-bottom: 2rem;
`;

const ContentBox = styled.div`
  margin-bottom: 2rem;
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  max-width: 25%;

  & + & {
    margin-left: 0.5rem;
  }

  @media ${(props) => props.theme.mobile} {
    max-width: 100%;
  }
`;

const WriteReviewModal = ({ onCancel, onConfirm }) => {
  return (
    <Background>
      <ModalBlock>
        <Heading>상품 리뷰 작성</Heading>
        <ContentBox>
          <StarRatingBoxContainer />
          <EditorContainer />
        </ContentBox>
        <ButtonsBox>
          <StyledButton onClick={onCancel} fullWidth>
            취소
          </StyledButton>
          <StyledButton onClick={onConfirm} fullWidth>
            작성
          </StyledButton>
        </ButtonsBox>
      </ModalBlock>
    </Background>
  );
};

export default WriteReviewModal;
