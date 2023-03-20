import * as React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import styled from 'styled-components';

const ErrorServerTextContent = styled.span`
   color: ${({ theme }) => theme.error};
   font-weight: 600;
   font-size: 14px;
   letter-spacing: -0.5px;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   padding: 10px 40px;
   svg {
      height: 20px;
      width: 15px;
      margin-left: 3px;
   }
`;

interface IProps {
   innerText: string;
}

const ErrorMsgServer: React.FC<IProps> = ({ innerText }) => (
   <ErrorServerTextContent>
      {innerText}
      <BsExclamationCircle />
   </ErrorServerTextContent>
);

export default ErrorMsgServer;
