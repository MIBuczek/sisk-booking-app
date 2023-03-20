import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RedirectLink = styled(Link)`
   color: ${({ theme }) => theme.darkGrey};
   font-size: ${({ theme }) => theme.fontSize.m};
   font-weight: ${({ theme }) => theme.middle};
   border: 2px solid #afbf36;
   border-radius: 3px;
   font-family: inherit;
   width: 220px;
   margin: 1rem 0;
   cursor: pointer;
   padding: 10px;
   letter-spacing: -0.5px;
   transition: 0.3s;
   &:hover {
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 40%);
   }
`;

export default RedirectLink;
