import { IBookedTime } from 'models';
import * as React from 'react';
import styled from 'styled-components';
import { displayTime, formatDate } from 'utils';
import Paragraph from './Paragraph';

const DetailsList = styled.ul`
  width: 100%;
  height: auto;
  list-style: none;
  padding: 0px 10px;
  margin: 5px;
  border: ${({ theme }) => `1px solid ${theme.green}`};
  background: ${({ theme }) => theme.lightGray};
`;

const DetailListItem = styled.li`
  border-top: ${({ theme }) => `1px solid ${theme.green}`};
  &:first-of-type {
    border: none;
  }
`;

const DetailsParagraph = styled(Paragraph)`
  font-size: 12px;
  padding-top: 5px;
  &.empty {
    text-align: center;
  }
`;

const DetailsSpan = styled.span`
  font-weight: 400;
  font-weight: 400;
  margin: 0 4rem 0 0.5rem;
`;

interface IProps {
  bookingCityDetails: IBookedTime[];
}

const SummaryDetailsItem: React.FunctionComponent<IProps> = ({ bookingCityDetails }) => (
  <DetailsList>
    {bookingCityDetails.map(({ day, startHour, endHour, size, building }) => (
      <DetailListItem key={startHour.getTime()}>
        <DetailsParagraph bold>
          Budynek : <DetailsSpan>{building}</DetailsSpan>
          Powierzchnia : <DetailsSpan>{size}</DetailsSpan>
        </DetailsParagraph>
        <DetailsParagraph bold>
          Dzień : <DetailsSpan>{formatDate(day)}</DetailsSpan>
          Godzina rozpoczęcia : <DetailsSpan>{displayTime(startHour)}</DetailsSpan>
          Godzina zakończenia : <DetailsSpan>{displayTime(endHour)}</DetailsSpan>
        </DetailsParagraph>
      </DetailListItem>
    ))}
  </DetailsList>
);

export default SummaryDetailsItem;
