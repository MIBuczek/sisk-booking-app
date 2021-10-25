import { isEmpty } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ButtonGroupWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const GroupBtn = styled(Button)`
  background: ${({ theme }) => theme.middleGray};
  color: ${({ theme }) => theme.darkGrey};
  padding: 5px 15px;
  margin: 0;
  &.active {
    background: ${({ theme }) => theme.green};
  }
`;

interface IProps {
  options: string[];
}

const ButtonGroup: React.FunctionComponent<IProps> = ({ options }) => (
  <ButtonGroupWrapper>
    {!isEmpty(options)
      ? options.map((btn): JSX.Element => <GroupBtn key={btn}>{btn}</GroupBtn>)
      : null}
  </ButtonGroupWrapper>
);

export default ButtonGroup;
