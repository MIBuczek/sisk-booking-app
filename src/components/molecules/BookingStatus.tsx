import * as React from 'react';
import Header from 'components/atoms/Header';
import {isNil} from 'lodash';
import {IBooking} from 'models';
import {useDispatch} from 'react-redux';
import {updateBooking} from 'store';
import styled from 'styled-components';
import {formatDate, formatTime} from 'utils';
import BookingTimeStatusForm from './forms/BookingTimeStatusForm';

const BookingStatusWrapper = styled.section`
   max-width: 670px;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;

   button {
      align-self: flex-end;
   }
`;

const BookingStatusHeader = styled(Header)`
   width: 100%;
   margin: 20px 0 40px;
   padding: 0 20px;

   &:after {
      left: 20px;
   }
`;

const ClientStatusDetails = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   width: 80%;
   border-top: ${({theme}) => `1px solid ${theme.green}`};
   border-bottom: ${({theme}) => `1px solid ${theme.green}`};
`;

const DetailsSpan = styled.span`
   font-weight: 400;
   margin: 8px 0;
   font-size: ${({theme}) => theme.fontSize.m};
   color: ${({theme}) => theme.darkGrey};
`;

interface BookingStatusFormProps {
   bookingsList: IBooking[];
   editedItemIndex?: number;
   editedSubItemIndex?: number;
}

const BookingStatus: React.FunctionComponent<BookingStatusFormProps> = ({
   bookingsList,
   editedItemIndex,
   editedSubItemIndex
}) => {
   const [currentBooking, setCurrentBooking] = React.useState<IBooking | undefined>(undefined);

   const dispatch = useDispatch();

   const editBookingStatusHandler = () => {
      if (isNil(editedItemIndex) || isNil(editedSubItemIndex)) return;
      setCurrentBooking(bookingsList[editedItemIndex]);
   };

   /**
    * Function to dispatch update booking action with additional new booking time status
    * @param updatedBooking
    */
   const submitHandler = (updatedBooking: IBooking): void => {
      dispatch(updateBooking(updatedBooking, true, false));
   };

   React.useEffect(() => {
      editBookingStatusHandler();
      return () => {
         setCurrentBooking(undefined);
      };
   }, []);

   return (
      <BookingStatusWrapper>
         <BookingStatusHeader>ROZLICZ REZERWACJĘ</BookingStatusHeader>
         {!isNil(currentBooking) && !isNil(editedSubItemIndex) ? (
            <>
               <ClientStatusDetails>
                  <DetailsSpan>
                     <strong>Klient: </strong>
                     {currentBooking.person}
                  </DetailsSpan>
                  <DetailsSpan>
                     <strong>Dzień: </strong>
                     {formatDate(currentBooking.bookingTime[editedSubItemIndex].day)}
                  </DetailsSpan>
                  <DetailsSpan>
                     <strong>Godzina rozpoczęcia: </strong>
                     {formatTime(currentBooking.bookingTime[editedSubItemIndex].startHour)}
                  </DetailsSpan>
                  <DetailsSpan>
                     <strong>Godzina zakończenia: </strong>
                     {formatTime(currentBooking.bookingTime[editedSubItemIndex].endHour)}
                  </DetailsSpan>
               </ClientStatusDetails>
               <BookingTimeStatusForm
                  confirmationClass="bookingStatus"
                  currentBooking={currentBooking}
                  bookingTimeIndex={editedSubItemIndex}
                  hasRights={true}
                  submitHandler={submitHandler}
               />
            </>
         ) : null}
      </BookingStatusWrapper>
   );
};

export default BookingStatus;
