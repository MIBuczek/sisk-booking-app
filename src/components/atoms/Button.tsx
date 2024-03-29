import styled from 'styled-components';

type ButtonProps = {
   large?: boolean;
   secondary?: boolean;
   tertiary?: boolean;
};

/**
 * Button HTML component.
 */
const Button = styled.button<ButtonProps>`
   color: ${({theme}) => theme.darkGrey};
   background: ${({theme, secondary, tertiary}) => {
      if (secondary) return theme.middleGray;
      if (tertiary) return 'transparent';
      return theme.green;
   }};
   font-size: ${({theme}) => theme.fontSize.ml};
   font-weight: ${({theme}) => theme.regular};
   border: ${({theme}) => `1px solid ${theme.green}`};
   font-family: inherit;
   margin: 1rem 0;
   cursor: pointer;
   padding: ${({large}) => (large ? '12px 20px' : '8px 14px')};
   border-radius: 3px;
   letter-spacing: -0.5px;
   transition: 0.4s;

   &:hover {
      box-shadow: 0 0 17px -7px rgba(66, 68, 90, 1);
      opacity: 0.8;
   }

   &:disabled {
      border-color: ${({theme}) => theme.middleGray};
      background: ${({theme}) => theme.middleGray};
      opacity: 1;
      box-shadow: none;
   }
`;

export default Button;
