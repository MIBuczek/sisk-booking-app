import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isNil} from 'lodash';
import styled from 'styled-components';
import {IBooking, IReduxState} from 'models';
import {updateBooking} from 'store';
import Header from 'components/atoms/Header';
import BookingSingleTimeForm from 'components/molecules/forms/booking/BookingSingleTimeForm';
import ClientDetails from 'components/molecules/ClientDetails';

const SingleBookingTimeWrapper = styled.div`
   max-width: 670px;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;

   button {
      align-self: flex-end;
   }
`;

const DetailsHeader = styled(Header)`
   width: 100%;
   margin: 20px 0 40px;
   padding: 0 20px;

   &:after {
      left: 20px;
   }
`;

interface BookingStatusFormProps {
   bookingsList: IBooking[];
   editedItemIndex?: number;
   editedSubItemIndex?: number;
}

const ModalSingleBookingTime: React.FunctionComponent<BookingStatusFormProps> = ({
   bookingsList,
   editedItemIndex,
   editedSubItemIndex
}): JSX.Element => {
   const [currentBooking, setCurrentBooking] = React.useState<IBooking | undefined>(undefined);

   const dispatch = useDispatch();

   const {
      currentUserStore: {user}
   } = useSelector((store: IReduxState) => store);

   /**
    * Function to update single booking time form state of already saved data.
    */
   const editBookingTimeHandler = (): void => {
      if (isNil(editedItemIndex) || isNil(editedSubItemIndex)) return;
      setCurrentBooking(bookingsList[editedItemIndex]);
   };

   /**
    * Function to dispatch update booking action with edited booking time value.
    *
    * @param updatedBooking
    */
   const submitHandler = (updatedBooking: IBooking): void => {
      dispatch(updateBooking(updatedBooking, true, false));
   };

   /**
    * Set edited booking state for component.
    */
   React.useEffect(() => {
      editBookingTimeHandler();
      return () => {
         setCurrentBooking(undefined);
      };
   }, []);

   return (
      <SingleBookingTimeWrapper>
         <DetailsHeader>Edycja godziny rezerwacji</DetailsHeader>
         {!isNil(currentBooking) && !isNil(editedSubItemIndex) ? (
            <>
               <ClientDetails
                  currentBooking={currentBooking}
                  editedSubItemIndex={editedSubItemIndex}
               />
               <BookingSingleTimeForm
                  currentBooking={currentBooking}
                  bookingTimeIndex={editedSubItemIndex}
                  hasRights={user?.isAdmin || user?.isEmployee || false}
                  submitHandler={submitHandler}
               />
            </>
         ) : null}
      </SingleBookingTimeWrapper>
   );
};

export default ModalSingleBookingTime;
