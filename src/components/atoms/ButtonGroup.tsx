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
`;

const GroupBtn = styled(Button)<GroupBtnProps>`
  background: ${({ theme, active, disabled }) => (active ? theme.green : theme.middleGray)};
  color: ${({ theme }) => theme.darkGrey};
  padding: 5px 15px;
  margin: 0;
  &:disabled {
    background: ${({ theme, active, disabled }) =>
      active && disabled ? theme.darkGrey : theme.middleGray};
    color: ${({ theme, active, disabled }) =>
      active && disabled ? theme.lightGray : theme.darkGrey};
  }
`;

interface IProps {
  value: SIZE_OPTIONS;
  options: SIZE_OPTIONS[];
  disabled: boolean;
  optionsHandler: (e: Event, value: SIZE_OPTIONS) => void;
}

const ButtonGroup: React.FunctionComponent<IProps> = ({
  value,
  options,
  disabled,
  optionsHandler
}) => (
  <ButtonGroupWrapper>
    {!isEmpty(options)
      ? options.map(
          (option): JSX.Element => (
            <GroupBtn
              key={option}
              active={value === option}
              onClick={(e) => optionsHandler((e as unknown) as Event, option)}
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
