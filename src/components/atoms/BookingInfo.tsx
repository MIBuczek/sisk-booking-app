import React from 'react';
import styled from 'styled-components';
import {
   BUILDINGS_OPTIONS,
   checkIndex,
   findSelectedOption,
   firstLetterUpperCase,
   formatDate,
   formatTime
} from 'utils';
import Paragraph from './Paragraph';
import { fadeIn } from 'style/animation';
import { IBooking } from 'models';

const DetailsParagraph = styled(Paragraph)`
   font-size: 14px;
   animation: ${fadeIn} 0.5s linear;
   word-break: break-word;
   max-width: 350px;

   &:first-of-type {
      padding-top: 30px;
   }
`;

const DetailsSpan = styled.span`
   font-weight: 400;
   margin-left: 0.5rem;
`;

interface IProps {
   isAdmin: boolean;
   currentBooking: IBooking;
   bookingTimeIndex: number | null;
}

const BookingInfo: React.FunctionComponent<IProps> = ({
   isAdmin,
   currentBooking,
   bookingTimeIndex
}): JSX.Element => {
   const { person, city, building, bookingTime, size, message } = currentBooking;
   return (
      <>
         <DetailsParagraph bold>
            Najemca :<DetailsSpan>{isAdmin ? person : 'Rezerwacja'}</DetailsSpan>
         </DetailsParagraph>
         <DetailsParagraph bold>
            Dzień :
            <DetailsSpan>{formatDate(bookingTime[checkIndex(bookingTimeIndex)].day)}</DetailsSpan>
         </DetailsParagraph>
         <DetailsParagraph bold>
            Miejscowość :<DetailsSpan>{firstLetterUpperCase(city)}</DetailsSpan>
         </DetailsParagraph>
         <DetailsParagraph bold>
            Obiekt :
            <DetailsSpan>
               {findSelectedOption(building, BUILDINGS_OPTIONS[city])?.label}
            </DetailsSpan>
         </DetailsParagraph>
         <DetailsParagraph bold>
            Wynajęta powierzchnia : <DetailsSpan>{size}</DetailsSpan>
         </DetailsParagraph>
         <DetailsParagraph bold>
            Od godziny :
            <DetailsSpan>
               {formatTime(bookingTime[checkIndex(bookingTimeIndex)].startHour)}
            </DetailsSpan>
         </DetailsParagraph>
         <DetailsParagraph bold>
            Do godziny :
            <DetailsSpan>
               {formatTime(bookingTime[checkIndex(bookingTimeIndex)].endHour)}
            </DetailsSpan>
         </DetailsParagraph>
         {isAdmin && (
            <DetailsParagraph bold>
               Komentarz :<DetailsSpan>{message || '[Brak]'}</DetailsSpan>
            </DetailsParagraph>
         )}
      </>
   );
};

export default BookingInfo;
