import * as React from 'react';
import styled from 'styled-components';
import {IBooking} from 'models';
import {formatDate} from 'utils';

const TimeStampsWrapper = styled.div`
   width: 100%;
   height: auto;
   display: flex;
   flex-direction: column;
   align-items: start;
   justify-content: space-between;
   padding: 10px 20px;
   font-size: 12px;
   background: whitesmoke;
`;

const SingleTimeStamp = styled.div`
   display: flex;
   justify-content: space-between;
   width: inherit;
`;

const TimeStampDetails = styled.span`
   width: 30%;
   &:first-of-type {
      width: 70%;
   }
`;

interface IProps {
   currentBooking: IBooking;
}

/**
 * Time stamp component.
 * Contains information about creation and modification booking info.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const TimeStamps = ({currentBooking}: IProps): JSX.Element => (
   <TimeStampsWrapper>
      <SingleTimeStamp>
         <TimeStampDetails>
            <strong>Utworzony przez : </strong>
            {currentBooking.createdBy}
         </TimeStampDetails>
         <TimeStampDetails>
            <strong>Utworzony dnia : </strong>
            {formatDate(currentBooking.createdAt)}
         </TimeStampDetails>
      </SingleTimeStamp>
      <SingleTimeStamp>
         <TimeStampDetails>
            <strong>Ostatnio modyfikowany przez : </strong>
            {currentBooking.modifiedBy}
         </TimeStampDetails>
         <TimeStampDetails>
            <strong>Ostatnia modyfikacja : </strong>
            {formatDate(currentBooking.modifiedAt)}
         </TimeStampDetails>
      </SingleTimeStamp>
   </TimeStampsWrapper>
);

export default TimeStamps;
