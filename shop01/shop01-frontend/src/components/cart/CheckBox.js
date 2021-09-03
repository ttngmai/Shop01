import React from 'react';
import styled from 'styled-components';
import {
  IoIosCheckmarkCircleOutline,
  IoIosCheckmarkCircle,
} from 'react-icons/io';
import palette from '../../lib/styles/palette';

const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  width: 2rem;
  height: 2rem;

  & svg {
    position: relative;
    width: 2rem;
    height: 2rem;
    color: ${palette.gray[5]};
    cursor: pointer;

    &.checked {
      color: ${palette.indigo[7]};
    }
  }

  & input {
    position: absolute;
    z-index: -1;
    left: 9.6px;
    opacity: 0;
  }
`;

const CheckBox = ({ item, onClick }) => {
  return (
    <CheckBoxLabel htmlFor={item.id}>
      {item.checked ? (
        <IoIosCheckmarkCircle className="checked" />
      ) : (
        <IoIosCheckmarkCircleOutline />
      )}
      <input
        type="checkbox"
        id={item.id}
        onClick={onClick}
        checked={item.checked}
        readOnly={true}
      />
    </CheckBoxLabel>
  );
};

export default CheckBox;
