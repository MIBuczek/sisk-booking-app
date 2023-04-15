import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {isNil} from 'lodash';
import {clearCurrentBooking, closeModal} from 'store';
import {fadeIn} from 'style/animation';
import {IBookingsPayload, IReduxState} from 'models';
import Paragraph from 'components/atoms/Paragraph';
import Header from 'components/atoms/Header';
import Button from 'components/atoms/Button';
import BookingInfo from 'components/atoms/BookingInfo';

const BookingDetailsWrapper = styled.article`
   width: 290px;
   height: auto;
   display: flex;
   flex-direction: column;

   @media (max-width: 1400px) {
      width: 85%;
      padding: 30px 20px;
   }

   @media (max-width: 890px) {
      width: 75%;
   }
`;

const DetailsHeader = styled(Header)`
   font-size: 18px;
   margin: 60px 0 20px;

   @media (max-width: 1400px) {
      margin: 20px 0;
      width: 100%;
   }
`;

const DetailsParagraph = styled(Paragraph)`
   font-size: 14px;
   animation: ${fadeIn} 0.5s linear;

   &:first-of-type {
      padding-top: 30px;
   }
`;

const ClearButton = styled(Button)`
   background-color: #eaeaea;
   border-color: ${({theme}) => theme.green};
   color: ${({theme}) => theme.darkGrey};

   &:hover {
      background-color: ${({theme}) => theme.green};
      border-color: #b9b8b8;
      box-shadow: none;
      opacity: 1;
   }
`;

const BookingDetails = (): JSX.Element => {
   const dispatch = useDispatch();
   const {booking, bookingTimeIndex} = useSelector(
      (state: IReduxState): IBookingsPayload => state.bookingStore
   );

   /**
    * Function to clear selected booking
    */
   const clear = (): void => {
      dispatch(clearCurrentBooking());
      dispatch(closeModal());
   };

   return (
      <BookingDetailsWrapper>
         <DetailsHeader>Szczegóły rezerwacji</DetailsHeader>
         {!isNil(booking) ? (
            <>
               <BookingInfo
                  isAdmin={false}
                  currentBooking={booking}
                  bookingTimeIndex={bookingTimeIndex}
               />
               <ClearButton onClick={clear}>Wyczyść</ClearButton>
            </>
         ) : (
            <DetailsParagraph bold>
               Aby zobaczyć szczegóły, kliknij kalendarzu na wybraną rezerwację.
            </DetailsParagraph>
         )}
      </BookingDetailsWrapper>
   );
};

export default BookingDetails;
