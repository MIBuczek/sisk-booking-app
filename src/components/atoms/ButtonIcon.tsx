import styled from 'styled-components';

/**
 * Button with icon HTML Element
 */
const ButtonIcon = styled.button`
   color: ${({theme}) => theme.darkGrey};
   font-size: ${({theme}) => theme.fontSize.m};
   font-weight: ${({theme}) => theme.bold};
   background: transparent;
   font-family: inherit;
   padding: 8px 20px;
   margin: 1rem 0;
   display: flex;
   align-items: center;
   cursor: pointer;
   transition: 0.5s;
   border: ${({theme}) => `1px solid ${theme.green}`};
   width: 290px;
   border-radius: 5px;

   &.active {
      color: #fff;
      background: #afbf36;

      svg {
         color: #fff !important;
      }
   }

   &:hover {
      box-shadow: 0 0 17px -7px rgba(66, 68, 90, 1);
   }

   svg {
      color: inherit;
      width: 2rem;
      height: 2rem;
   }

   @media (max-width: 1400px) {
      margin: 10px 60px 10px 10px;
   }
`;

export const iconStyle = {
   fontSize: '2rem',
   marginRight: '1rem',
   color: 'AFBF36'
};

export default ButtonIcon;
