import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  BUILDINGS_OPTIONS,
  findSelectedOption,
  firstLetterUpperCase,
  formatDate,
  formatTime
} from 'utils';
import Paragraph from '../atoms/Paragraph';
import Header from '../atoms/Header';
import Button from '../atoms/Button';
import { clearCurrentBooking } from '../../store/bookings/bookingsAction';
import { fadeIn } from '../../style/animation';
import { IBookingsPayload, IReduxState } from '../../models';

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
  font-size: 12px;
  animation: ${fadeIn} 0.5s linear;
  &:first-of-type {
    padding-top: 30px;
  }
`;

const DetailsSpan = styled.span`
  font-weight: 400;
  margin-left: 0.5rem;
`;

const ClearButton = styled(Button)`
  background-color: #eaeaea;
  border-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.darkGrey};
  &:hover {
    background-color: ${({ theme }) => theme.green};
    border-color: #b9b8b8;
    box-shadow: none;
    opacity: 1;
  }
`;

const BookingDetails = (): JSX.Element => {
  const dispatch = useDispatch();
  const { booking } = useSelector((state: IReduxState): IBookingsPayload => state.bookingStore);

  /**
   * Function to clear selected booking
   */
  const clear = () => {
    dispatch(clearCurrentBooking());
  };

  return (
    <BookingDetailsWrapper>
      <DetailsHeader>Szczegóły rezerwacji</DetailsHeader>
      {typeof booking !== 'undefined' ? (
        <>
          <DetailsParagraph bold>
            Dzień :<DetailsSpan>{formatDate(booking.bookingTime[0].day)}</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Miejscowość :<DetailsSpan>{firstLetterUpperCase(booking.city)}</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Obiekt :
            <DetailsSpan>
              {findSelectedOption(booking.building, BUILDINGS_OPTIONS[booking.city])?.label}
            </DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Wynajęta powierzchnia : <DetailsSpan>{booking.size}</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Od godziny : <DetailsSpan>{formatTime(booking.bookingTime[0].startHour)}</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Do godziny : <DetailsSpan>{formatTime(booking.bookingTime[0].endHour)}</DetailsSpan>
          </DetailsParagraph>
          <ClearButton onClick={clear}>Wyczyść</ClearButton>
        </>
      ) : (
        <>
          <DetailsParagraph bold>
            Aby zobaczyć szczegóły, kliknij kalendarzu na wybraną rezerwację.
          </DetailsParagraph>
        </>
      )}
    </BookingDetailsWrapper>
  );
};

export default BookingDetails;
