import * as React from 'react';
import {BsExclamationTriangle} from 'react-icons/bs';
import styled from 'styled-components';

const WarningTextContent = styled.span`
   font-size: 12px;
   color: ${({theme}) => theme.darkGrey};
   font-weight: 400;
   display: flex;
   align-items: center;
   letter-spacing: -0.5px;
   position: relative;
   top: 3px;
   text-transform: none;
   text-decoration: ${({theme}) => `underline ${theme.warning}`};

   svg {
      height: 15px;
      width: 12px;
      margin-left: 3px;
      color: ${({theme}) => theme.warning};
   }
`;

interface IProps {
   innerText: string;
}

const WarningMsg: React.FC<IProps> = ({innerText}) => (
   <WarningTextContent>
      {innerText} <BsExclamationTriangle />
   </WarningTextContent>
);

export default WarningMsg;
