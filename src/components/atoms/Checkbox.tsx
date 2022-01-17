/* eslint-disable no-nested-ternary */
import * as React from 'react';
// import { css } from 'react-select/src/components/Control';
import styled, { css } from 'styled-components';

type CheckboxInput = {
  checked: boolean;
  disabled: boolean;
};

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const checkedStyles = css`
  width: 15px;
  height: 15px;
  background: #afbf36;
`;

const disabledStyles = css`
  width: 15px;
  height: 15px;
  background: #454545;
`;

const uncheckedStyles = css`
  width: 15px;
  height: 15px;
  border: 1px solid #afbf36;
  background: none;
`;

const StyledCheckbox = styled.div<CheckboxInput>`
  display: inline-block;
  margin-right: 5px;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  transition: all 150ms;
  cursor: pointer;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
  ${({ checked, disabled }) =>
    disabled ? disabledStyles : checked ? checkedStyles : uncheckedStyles};
`;

const CheckboxContainer = styled.div`
  display: flex;
`;

interface ICheckbox {
  className: string;
  checked: boolean;
  name: string;
  disabled: boolean;
  changeHandler: (value: string | boolean, name: string) => void;
}

const Checkbox: React.FC<ICheckbox> = ({ className, checked, name, disabled, changeHandler }) => (
  <CheckboxContainer
    className={className}
    onClick={() => changeHandler(disabled ? checked : !checked, name)}
  >
    <HiddenCheckbox checked={checked} disabled={disabled} name={name} type="checkbox" readOnly />
    <StyledCheckbox checked={checked} disabled={disabled}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
