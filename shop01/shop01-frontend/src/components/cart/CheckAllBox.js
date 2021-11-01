import React from 'react';
import styled from 'styled-components';
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from 'react-icons/io5';
import palette from '../../lib/styles/palette';

const CheckAllBoxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  svg {
    margin-top: 1.5px;
    color: ${palette.gray[5]};

    &.checked {
      color: ${palette.indigo[7]};
    }
  }

  input {
    position: absolute;
    z-index: -1;
    left: 9.6px;
    opacity: 0;
  }

  span {
    padding-left: 0.5rem;
    line-height: 2rem;
  }
`;

const CheckAllBox = ({
  itemCount,
  checkedItemCount,
  isAllChecked,
  onClick,
}) => {
  return (
    <CheckAllBoxLabel>
      {isAllChecked ? (
        <IoCheckmarkCircleSharp className="checked" size="2rem" />
      ) : (
        <IoCheckmarkCircleOutline size="2rem" />
      )}
      <input
        type="checkbox"
        onClick={onClick}
        checked={isAllChecked}
        readOnly={true}
      />
      <span>
        전체 선택 ({checkedItemCount}/{itemCount})
      </span>
    </CheckAllBoxLabel>
  );
};

export default CheckAllBox;
