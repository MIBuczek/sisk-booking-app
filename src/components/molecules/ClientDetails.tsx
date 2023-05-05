import * as React from 'react';
import styled from 'styled-components';
import {formatDate, formatTime} from 'utils';
import {IBooking} from 'models';

const ClientStatusDetails = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   width: 100%;
   border-top: ${({theme}) => `1px solid ${theme.green}`};
   border-bottom: ${({theme}) => `1px solid ${theme.green}`};
   margin: 0 40px;
`;

const DetailsSpan = styled.span`
   font-weight: 400;
   margin: 8px 0;
   font-size: ${({theme}) => theme.fontSize.m};
   color: ${({theme}) => theme.darkGrey};
`;

interface IProps {
   currentBooking: IBooking;
   editedSubItemIndex: number;
}

/**
 *Client details component.
 * Display assigned client information to selected booking.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const ClientDetails: React.FunctionComponent<IProps> = ({
   currentBooking,
   editedSubItemIndex
}): JSX.Element => (
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
);

export default ClientDetails;
