import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { IBookingsPayload, IReduxState } from '../../models/store/store-models';
import Paragraph from '../atoms/Paragraph';
import Header from '../atoms/Header';
import Button from '../atoms/Button';
import { clearCurrentBooking } from '../../store/bookings/bookingsAction';
import { fadeIn } from '../../style/animation';

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

const ReservationDetails = (): JSX.Element => {
  const dispatch = useDispatch();
  const { booking } = useSelector((state: IReduxState): IBookingsPayload => state.bookingState);

  const clear = () => {
    dispatch(clearCurrentBooking());
  };

  return (
    <ReservationDetailsWrapper>
      <DetailsHeader>Szczegóły rezerwacji</DetailsHeader>
      {!isEmpty(booking) ? (
        <>
          <DetailsParagraph bold>
            Dzień : <DetailsSpan>10.05.2020</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Miejscowość : <DetailsSpan>Radwanice</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Obiekt : <DetailsSpan>Obiekt 1</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Zajmowana powierzchnia : <DetailsSpan>1/2</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Od godziny : <DetailsSpan>12:00</DetailsSpan>
          </DetailsParagraph>
          <DetailsParagraph bold>
            Do godziny : <DetailsSpan>14:00</DetailsSpan>
          </DetailsParagraph>
          <Button onClick={clear}>Wyczyść</Button>
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
