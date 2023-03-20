import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { isNil } from 'lodash';
import { IBooking, IReduxState } from 'models';
import Header from '../../atoms/Header';
import BookingInfo from '../../atoms/BookingInfo';
import { updateBooking } from 'store';
import BookingTimeStatusForm from '../forms/BookingTimeStatusForm';

const ResolveBookingWrapper = styled.div`
   max-width: 870px;
   display: flex;
   justify-content: flex-start;
   align-items: flex-start;
   flex-wrap: wrap;
   padding: 20px 40px 100px 20px;

   @media (max-width: 800px) {
      min-width: 420px;
      width: 420px;
      justify-content: flex-start;
   }
`;

const DetailsHeader = styled(Header)`
   width: 100%;
   font-size: 18px;
   margin: 60px 0 20px;

   @media (max-width: 1400px) {
      margin: 20px 0;
   }
`;

const BookingDetailsWrapper = styled.article`
   min-width: 350px;
   height: auto;
   display: flex;
   flex-direction: column;
   padding: 0 40px 0 20px;

   @media (max-width: 800px) {
      width: 100%;
      margin-bottom: 1.5rem;
   }
`;

const ModalResolveBooking: React.FunctionComponent = (): JSX.Element => {
   const dispatch = useDispatch();

   const {
      currentUserStore: { user },
      bookingStore: { booking, bookingTimeIndex }
   } = useSelector((store: IReduxState) => store);

   /**
    * Function to dispatch update booking action with additional new booking time status
    * @param updatedBooking
    */
   const submitHandler = (updatedBooking: IBooking): void => {
      dispatch(updateBooking(updatedBooking, true, false));
   };

   return (
      <ResolveBookingWrapper>
         <DetailsHeader>Szczegóły rezerwacji</DetailsHeader>
         {!isNil(booking) ? (
            <>
               <BookingDetailsWrapper>
                  <BookingInfo
                     isAdmin
                     currentBooking={booking}
                     bookingTimeIndex={bookingTimeIndex}
                  />
               </BookingDetailsWrapper>
               <BookingTimeStatusForm
                  confirmationClass="modalResolveBooking"
                  currentBooking={booking}
                  hasRights={user?.isAdmin || user?.isEmployee || false}
                  bookingTimeIndex={bookingTimeIndex}
                  submitHandler={submitHandler}
               />
            </>
         ) : null}
      </ResolveBookingWrapper>
   );
};

export default ModalResolveBooking;
