import Button from 'components/atoms/Button';
import Paragraph from 'components/atoms/Paragraph';
import * as React from 'react';
import {BsFillQuestionCircleFill} from 'react-icons/bs';
import {fadeIn} from 'style/animation';
import styled from 'styled-components';

const ConfirmationWrapper = styled.div`
   width: 100%;
   padding: 10px 20px;
   background-color: ${({theme}) => theme.green};
   display: flex;
   justify-content: center;
   animation: ${fadeIn} 0.5s linear;
   border-radius: 5px;

   &.modalResolveBooking {
      width: 200%;
      position: relative;
      bottom: -100px;
      left: -100%;

      @media (max-width: 850px) {
         left: 0;
      }

      @media (max-width: 800px) {
         width: 110%;
         left: -2%;

         p {
            text-align: left !important;
         }
      }
   }

   &.bookingStatus {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 20px;
   }
`;

const ConfirmationContent = styled.div`
   width: 85%;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const ConfirmationParagraph = styled(Paragraph)`
   padding-bottom: 1rem;
   color: ${({theme}) => theme.white};
   position: relative;
   font-size: 16px;

   &:after {
      position: absolute;
      bottom: -14px;
      left: 0;
      content: '';
      border-bottom: 5px solid white;
      width: 110px;
   }
`;

const QuestionIcon = styled(BsFillQuestionCircleFill)`
   color: ${({theme}) => theme.white};
   margin: 5px 0 0 5px;
`;

const ButtonWrapper = styled.div`
   display: flex;
   justify-content: flex-end;
   width: 100%;
`;

const ConfirmationBtn = styled(Button)`
   padding: 10px 20px;
   font-size: 16px;
`;

interface IProps {
   message: string;
   callback: () => void;
   cancelCallback: () => void;
   additionalClass?: string;
}

/**
 * Confirmation action component.
 * Dispatch action after user selection.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const ConfirmAction: React.FunctionComponent<IProps> = ({
   message,
   callback,
   cancelCallback,
   additionalClass = ''
}): JSX.Element => (
   <ConfirmationWrapper className={`${additionalClass}`}>
      <ConfirmationContent>
         <ConfirmationParagraph>
            {message}
            <QuestionIcon />
         </ConfirmationParagraph>
         <ButtonWrapper>
            <ConfirmationBtn role="button" secondary onClick={cancelCallback}>
               Nie
            </ConfirmationBtn>
            <ConfirmationBtn role="button" secondary onClick={callback}>
               Tak
            </ConfirmationBtn>
         </ButtonWrapper>
      </ConfirmationContent>
   </ConfirmationWrapper>
);

export default ConfirmAction;
