import { isEmpty } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import { SIZE_OPTIONS } from 'utils/variables/form-const';
import Button from './Button';

type GroupBtnProps = {
  active?: boolean;
  disabled: boolean;
};

const ButtonGroupWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  &.itemPerPageContainer {
    width: 30%;
    justify-content: end;
  }
`;

const GroupBtn = styled(Button)<GroupBtnProps>`
  background: ${({ theme, active }) => (active ? theme.green : theme.middleGray)};
  color: ${({ theme }) => theme.darkGrey};
  padding: 5px 15px;
  margin: 0;
  &:disabled {
    background: ${({ theme, active, disabled }) =>
      active && disabled ? theme.darkGrey : theme.middleGray};
    color: ${({ theme, active, disabled }) =>
      active && disabled ? theme.lightGray : theme.darkGrey};
  }
  &.itemPerPageItem {
    margin-left: 8px;
    background: ${({ theme, active }) => (active ? theme.green : 'white')};
    border-radius: 15px;
    padding: 5px 8px;
  }
`;

export type TProps<T> = {
  itemPerPage?: boolean;
  value: T;
  options: Array<T>;
  disabled: boolean;
  optionsHandler: (e: React.MouseEvent, value: T) => void;
};

const ButtonGroup: React.FunctionComponent<TProps<SIZE_OPTIONS | number>> = ({
  itemPerPage = false,
  value,
  options,
  disabled,
  optionsHandler
}) => (
  <ButtonGroupWrapper className={`${itemPerPage ? 'itemPerPageContainer' : ''}`}>
    {!isEmpty(options)
      ? options.map(
          (option): JSX.Element => (
            <GroupBtn
              className={`${itemPerPage ? 'itemPerPageItem' : ''}`}
              key={option}
              active={value === option}
              onClick={(e) => optionsHandler(e, option)}
              disabled={disabled}
            >
              {option}
            </GroupBtn>
          )
        )
      : null}
  </ButtonGroupWrapper>
);

export default ButtonGroup;
