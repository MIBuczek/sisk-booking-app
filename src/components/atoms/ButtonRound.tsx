import styled from 'styled-components';
import Button from 'components/atoms/Button';

/**
 * Rounded button HTML Element
 */
const RoundButton = styled(Button)`
   margin: 0;
   border-radius: 50%;
   width: 30px;
   height: 30px;
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;

   svg {
      transform: rotate(45deg);
      width: 14px;
      height: 14px;
      margin-top: 1px;
   }
`;

export default RoundButton;
