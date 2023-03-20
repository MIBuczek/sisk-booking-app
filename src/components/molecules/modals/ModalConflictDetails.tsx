/* eslint  react/no-array-index-key: 0 */
import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../atoms/Button';
import { clearBookingConflicts, closeModal } from 'store';
import { IReduxState } from 'models';
import { modelDisplayValue } from 'utils';
import Header from '../../atoms/Header';

const ModalConflictWrapper = styled.div`
   display: flex;
   flex-direction: column;
   padding: 0 20px 20px;
   min-height: 400px;

   button {
      align-self: flex-end;
      margin-top: auto;
      border: ${({ theme }) => `1px solid ${theme.green}`};
   }
`;

const ConflictHeader = styled(Header)`
   width: 100%;
   font-size: 18px;
   margin: 40px 0 20px;
   color: ${({ theme }) => `${theme.error}`};

   @media (max-width: 1400px) {
      margin: 20px 0;
   }
`;

const ClientStatusDetails = styled.div`
   display: block;
   width: 100%;
   border-top: ${({ theme }) => `1px solid ${theme.green}`};
   border-bottom: ${({ theme }) => `1px solid ${theme.green}`};
   margin-top: 20px;

   span {
      width: 100%;
      padding: 5px 0;
   }
`;

const ClientInfoSpan = styled.span`
   width: 100%;
   font-size: ${({ theme }) => theme.fontSize.m};
   color: ${({ theme }) => theme.darkGrey};

   strong {
      display: block;
      width: 100%;
   }
`;

const BookingTimeDetailWrapper = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   width: 100%;

   span {
      width: 100%;
      font-size: ${({ theme }) => theme.fontSize.m};

      strong {
         display: block;
         width: 100%;
         padding: 5px 0;
      }
   }

   @media (max-width: 550px) {
      grid-template-columns: 1fr;
   }
`;

const ModalConflictDetails = (): JSX.Element => {
   const dispatch = useDispatch();

   const { conflictedBookings } = useSelector((state: IReduxState) => state.bookingStore);
   const closeConflictModal = (): void => {
      dispatch(clearBookingConflicts());
      dispatch(closeModal());
   };

   return (
      <ModalConflictWrapper>
         <ConflictHeader>Lista konfliktów z bierzącą rezerwacja</ConflictHeader>
         {conflictedBookings.map(({ person, size, bookingTime }, mainIndex) => (
            <React.Fragment key={`${new Date().getTime() + mainIndex}`}>
               <ClientStatusDetails>
                  <ClientInfoSpan>
                     <strong>Klient: </strong>
                     {person}
                  </ClientInfoSpan>
               </ClientStatusDetails>
               {bookingTime.map((sbt, index) => (
                  <BookingTimeDetailWrapper key={new Date(sbt.startHour).getTime() + index}>
                     <span>
                        <strong>Dzień: </strong>
                        {modelDisplayValue('day', sbt.day)}
                     </span>
                     <span>
                        <strong>Godzina rozpoczęcia: </strong>
                        {modelDisplayValue('startHour', sbt.startHour, true)}
                     </span>
                     <span>
                        <strong>Godzina zakończenia: </strong>
                        {modelDisplayValue('endHour', sbt.endHour, true)}
                     </span>
                     <span>
                        <strong>Wynajmowana powierzchnia: </strong>
                        {size}
                     </span>
                  </BookingTimeDetailWrapper>
               ))}
            </React.Fragment>
         ))}
         <Button type="button" onClick={closeConflictModal} secondary>
            Zamknij
         </Button>
      </ModalConflictWrapper>
   );
};

export default ModalConflictDetails;
