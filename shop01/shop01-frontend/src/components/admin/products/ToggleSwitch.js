import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';

const ToggleSwitchBlock = styled.div`
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  input:checked {
    & + label {
      background-color: ${palette.indigo[7]};

      &:after {
        left: calc(100% - 20px);
      }
    }
  }

  label {
    display: block;
    position: relative;
    width: 48px;
    height: 24px;
    border-radius: 24px;
    background-color: lightgray;
    transition: background-color 0.4s;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      left: 4px;
      top: 50%;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      background-color: white;
      transform: translateY(-50%);
      box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.1);
      transition: left 0.3s;
    }
  }
`;

const ToggleSwitch = ({ item, onClick }) => {
  return (
    <ToggleSwitchBlock>
      <input
        id={`toggle-display-switch-${item.id}`}
        type="checkbox"
        checked={item.display}
        onClick={onClick}
        readOnly={true}
      />
      <label htmlFor={`toggle-display-switch-${item.id}`} />
    </ToggleSwitchBlock>
  );
};

export default ToggleSwitch;
