import * as React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import styled from 'styled-components';

const ErrorTextContent = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.error};
  font-weight: 600;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
  position: relative;
  top: 3px;
  svg {
    height: 15px;
    width: 12px;
    margin-left: 3px;
  }
`;

interface IProps {
  innerText: string;
}

const ErrorMsg: React.FC<IProps> = ({ innerText }) => (
  <ErrorTextContent>
    {innerText} <BsExclamationCircle />
  </ErrorTextContent>
);

export default ErrorMsg;
