import * as React from 'react';
import Header from 'components/atoms/Header';
import {isNil} from 'lodash';
import {IBooking} from 'models';
import {useDispatch} from 'react-redux';
import {updateBooking} from 'store';
import styled from 'styled-components';
import BookingTimeStatusForm from 'components/molecules/forms/booking/BookingTimeStatusForm';
import ClientDetails from 'components/molecules/ClientDetails';

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

interface IProps {
   bookingsList: IBooking[];
   editedItemIndex?: number;
   editedSubItemIndex?: number;
}

/**
 * Booking modal status for selected reservation.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const ModalBookingStatus: React.FunctionComponent<IProps> = ({
   bookingsList,
   editedItemIndex,
   editedSubItemIndex
}): JSX.Element => {
   const [currentBooking, setCurrentBooking] = React.useState<IBooking | undefined>(undefined);

   const dispatch = useDispatch();

   /**
    * Function to handle edition selected time into available booking list
    */
   const editBookingStatusHandler = (): void => {
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

   /**
    * Effect to refresh component state during component initialization
    */
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
               <ClientDetails
                  currentBooking={currentBooking}
                  editedSubItemIndex={editedSubItemIndex}
               />
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

export default ModalBookingStatus;
