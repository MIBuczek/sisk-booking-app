import * as React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  innerText: string;
  callBack: () => void;
  size: string;
  disabled: boolean;
}

const Btn = styled.button`
  width: 100px;
  height: 30px;
  color: ${({ theme }) => theme.darkColor};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  border: 1px solid ${({ theme }) => theme.darkColor};
  background: ${({ theme }) => theme.green};
  border-radius: 10px;
  font-family: inherit;
  margin: 1rem 0;
`;
const Button: React.SFC<ButtonProps> = ({ innerText, callBack, size, disabled }): JSX.Element => (
  <Btn disabled={disabled} onClick={callBack}>
    {innerText}
  </Btn>
);

export default Button;
