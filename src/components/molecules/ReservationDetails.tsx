import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  BUILDINGS_OPTIONS,
  createSelectedOption,
  firstLetterUpperCase,
  formatDate,
  displayTime
} from 'utils';
import Paragraph from '../atoms/Paragraph';
import Header from '../atoms/Header';
import Button from '../atoms/Button';
import { clearCurrentBooking } from '../../store/bookings/bookingsAction';
import { fadeIn } from '../../style/animation';
import { IBookingsPayload, IReduxState } from '../../models';

const ReservationDetailsWrapper = styled.article`
  width: 290px;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const DetailsHeader = styled(Header)`
  font-size: 18px;
  margin: 60px 0 20px;
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
  border-color: #afbf36;
  color: #454545;
  &:hover {
    background-color: #afbf36;
    border-color: #b9b8b8;
    box-shadow: none;
    opacity: 1;
  }
`;

const ReservationDetails = (): JSX.Element => {
  const dispatch = useDispatch();
  const { booking } = useSelector((state: IReduxState): IBookingsPayload => state.bookingStore);

  const clear = () => {
    dispatch(clearCurrentBooking());
  };

  return (
    <ReservationDetailsWrapper>
      <DetailsHeader>Szczegóły rezerwacji</DetailsHeader>
      {typeof booking !== 'undefined' ? (
        <>
          <DetailsParagraph bold>
            Dzień :<DetailsSpan>{formatDate(booking.when)}</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Miejscowość :<DetailsSpan>{firstLetterUpperCase(booking.city)}</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Obiekt :
            <DetailsSpan>
              {createSelectedOption(booking.building, BUILDINGS_OPTIONS[booking.city])?.label}
            </DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Zajmowana powierzchnia : <DetailsSpan>{booking.size}</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Od godziny : <DetailsSpan>{displayTime(booking.start)}</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Do godziny : <DetailsSpan>{displayTime(booking.end)}</DetailsSpan>
          </DetailsParagraph>
          <ClearButton onClick={clear}>Wyczyść</ClearButton>
        </>
      ) : (
        <>
          <DetailsParagraph bold>
            Aby zobaczyc szczegóły, kliknij na kalendarzu na wybrana rezerwacje.
          </DetailsParagraph>
        </>
      )}
    </ReservationDetailsWrapper>
  );
};

export default ReservationDetails;
