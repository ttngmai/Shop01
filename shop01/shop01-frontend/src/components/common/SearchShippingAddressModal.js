import DaumPostcode from 'react-daum-postcode';
import { VscClose } from 'react-icons/vsc';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

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

const SearchShippingAddressModalBlock = styled(Responsive)`
  position: relative;
  padding: 0;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -2.25rem;
    right: 0;
    padding: 0.25rem;
    border-radius: 4px;
    background-color: white;
    font-size: 1rem;
    cursor: pointer;

    & > svg {
      margin-top: 2px;
    }

    &:hover {
      color: ${palette.indigo[7]};
    }
  }
`;

const SearchShippingAddressModal = ({ onCancel, onComplete }) => {
  return (
    <Background>
      <SearchShippingAddressModalBlock>
        <button type="button" onClick={onCancel}>
          <VscClose size="1.5rem" />
          닫기
        </button>
        <DaumPostcode onComplete={onComplete} />
      </SearchShippingAddressModalBlock>
    </Background>
  );
};

export default SearchShippingAddressModal;
