import * as React from 'react';

import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import Header from '../../atoms/Header';
import Paragraph from '../../atoms/Paragraph';
import {closeModal, logOutUser} from '../../../store';
import Button from '../../atoms/Button';

const LogOutWrapper = styled.div`
   padding: 0 20px 20px;
   display: flex;
   flex-direction: column;
   button {
      align-self: flex-end;
   }
`;

const LogOutHeader = styled(Header)`
   width: 100%;
   margin: 20px 0 40px;
`;

const LogOutMessage = styled(Paragraph)`
   padding-bottom: 4rem;
`;

/**
 * Modal to display user information about auto logout if no action register.
 */
const ModalOutLogOut = () => {
   const [countDown, setCountDown] = React.useState(20);

   const dispatch = useDispatch();
   /**
    * Effect to count down - to give user option to not be auto logout.
    */
   React.useEffect(() => {
      const intervalId = setInterval(() => {
         setCountDown(countDown - 1);
         if (countDown <= 0) dispatch(logOutUser());
      }, 1000);
      return () => clearInterval(intervalId);
   }, [countDown]);

   return (
      <LogOutWrapper>
         <LogOutHeader>Auto wylogowanie</LogOutHeader>
         <LogOutMessage small>
            {`Za ${countDown} sekund nastąpi wylogowanie. Jeżeli chcesz zostać naciśnij przycisk`}
         </LogOutMessage>
         <Button role="button" onClick={() => dispatch(closeModal())}>
            Anuluj wylogowanie
         </Button>
      </LogOutWrapper>
   );
};

export default ModalOutLogOut;
