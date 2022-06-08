import { isEmpty } from 'lodash';
import {
  IClient,
  IBooking,
  ISingleBookingDate,
  ISelectedExtraOptions,
  instanceOfBookings,
  singleInstanceOfBookings
} from 'models';
import * as React from 'react';
import {
  BsChevronDown,
  BsFillCheckCircleFill,
  BsFillCheckSquareFill,
  BsFillFileEarmarkTextFill,
  BsTrashFill,
  BsXCircleFill
} from 'react-icons/bs';
import { fadeIn, fadeInLeft } from 'style/animation';
import styled from 'styled-components';
import { checkConflicts, checkSelectedOption, modelDisplayValue } from 'utils';
import Collapse, { IRenderProps } from '../../providers/Collapse';
import Button from './Button';

const RecordTableData = styled.td`
  display: inline-block;
  padding: 0.5rem 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.darkGrey};
  animation: ${fadeInLeft} 0.5s linear;
  width: 15%;
  word-break: break-word;
  &:nth-of-type(1) {
    width: 5%;
  }
  &:nth-of-type(2) {
    width: 20%;
  }
  &:nth-of-type(4) {
    width: 18%;
  }
  &:last-of-type {
    width: 15%;
    margin-left: auto;
  }
  @media (max-width: 890px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const BookingDetailWrapper = styled.tr`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
`;

const ListItemBtn = styled(Button)`
  background: white;
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.m};
  border: none;
  border-bottom: 1px solid white;
  padding: 5px;
  margin: 0;
  width: 35px;
  &:hover {
    box-shadow: none;
    border-color: ${({ theme }) => theme.darkGrey};
    color: ${({ theme }) => theme.darkGrey};
  }
  &:disabled {
    background: transparent;
    color: ${({ theme }) => theme.darkGrey};
  }
`;

const RecordDetail = styled.td`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  height: auto;
  border: ${({ theme }) => `1px solid ${theme.green}`};
  background: ${({ theme }) => theme.lightGray};
  animation: ${fadeIn} 0.5s linear;
  word-break: break-word;
  width: 100%;
`;

const BookingTimeWrapper = styled.div`
  width: 100%;
  border-top: ${({ theme }) => `1px solid ${theme.middleGray}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.middleGray}`};
  padding: 3px 2px;
  margin-bottom: 10px;
  span {
    padding: 2px;
  }
`;

const SingleBookingTime = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  span {
    display: inline-block;
    padding: 5px 3px;
    width: 20%;
  }
  button {
    background: transparent;
    border-bottom: none;
  }
`;

const RecordDetailSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.m};
  padding: 10px 15px 10px 5px;
  width: auto;
`;

const CommentsSpan = styled(RecordDetailSpan)`
  width: 100% !important;
  border-bottom: ${({ theme }) => `1px dotted ${theme.middleGray}`};
  margin-bottom: 3px;
`;

const ChevronIcon = styled(BsChevronDown)`
  transition: 0.4s;
  &.open {
    transform: rotate(180deg);
  }
`;

interface MultipleRecordItemProps {
  index: number;
  currentPage: number;
  isAdmin: boolean;
  isEmployee: boolean;
  recordProperty: string[];
  recordPropertyDetails: string[];
  recordPropertyDisplayMap: { [x: string]: string };
  currentRecord: IClient | IBooking;
  allRecords: (IClient | IBooking)[];
  editHandler: (itemIndex: number, isMainItem: boolean, subItemIndex?: number) => void;
  deleteHandler: (index: number) => void;
}

const MultipleRecordItem: React.FunctionComponent<MultipleRecordItemProps> = ({
  index,
  currentPage,
  isAdmin,
  isEmployee,
  recordProperty,
  recordPropertyDetails,
  recordPropertyDisplayMap,
  currentRecord,
  allRecords,
  editHandler,
  deleteHandler
}) => (
  <Collapse
    render={({ isCollapsed, toggle }: IRenderProps) => (
      <>
        <tr>
          <RecordTableData>
            {currentPage > 1 ? (currentPage - 1) * 20 + index + 1 : index + 1}
          </RecordTableData>
          {recordProperty.map((property) => (
            <RecordTableData key={property}>
              {modelDisplayValue(property, currentRecord[property])}
            </RecordTableData>
          ))}
          {instanceOfBookings(allRecords) && singleInstanceOfBookings(currentRecord) && (
            <RecordTableData>
              {checkConflicts(currentRecord, allRecords) ? (
                <BsXCircleFill style={{ color: '#cc0000', marginLeft: '1rem' }} />
              ) : (
                <BsFillCheckCircleFill style={{ color: '#AFBF36', marginLeft: '1rem' }} />
              )}
            </RecordTableData>
          )}
          <RecordTableData>
            <ListItemBtn onClick={toggle}>
              <ChevronIcon className={isCollapsed ? 'open' : 'close'} />
            </ListItemBtn>
            {isAdmin && (
              <>
                <ListItemBtn onClick={() => editHandler(index, true)}>
                  <BsFillFileEarmarkTextFill />
                </ListItemBtn>
                <ListItemBtn onClick={() => deleteHandler(index)}>
                  <BsTrashFill />
                </ListItemBtn>
              </>
            )}
          </RecordTableData>
        </tr>
        {isCollapsed ? (
          <BookingDetailWrapper>
            <RecordDetail>
              {recordPropertyDetails.map((property) => {
                if (property === 'bookingTime') {
                  return (
                    <BookingTimeWrapper key={property}>
                      <RecordDetailSpan>
                        <strong>{recordPropertyDisplayMap[property]} : </strong>
                      </RecordDetailSpan>
                      {(currentRecord[property] as ISingleBookingDate[]).map((sb, sbi) => (
                        <SingleBookingTime key={`${sb.day.getMilliseconds() + sbi + index}`}>
                          <RecordDetailSpan>
                            <strong>Dzień: </strong>
                            {modelDisplayValue(property, sb.day)}
                          </RecordDetailSpan>
                          <RecordDetailSpan>
                            <strong>Godzina rozpoczęcia: </strong>
                            {modelDisplayValue(property, sb.startHour, true)}
                          </RecordDetailSpan>
                          <RecordDetailSpan>
                            <strong>Godzina zakończenia: </strong>
                            {modelDisplayValue(property, sb.endHour, true)}
                          </RecordDetailSpan>
                          <RecordDetailSpan>
                            <strong>Status: </strong>
                            {modelDisplayValue(property, sb.status)}
                          </RecordDetailSpan>
                          {(isAdmin || isEmployee) && (
                            <ListItemBtn
                              disabled={!currentRecord.accepted}
                              onClick={() => editHandler(index, false, sbi)}
                            >
                              <BsFillCheckSquareFill />
                            </ListItemBtn>
                          )}
                          <CommentsSpan>
                            <strong>Komentarz: </strong>
                            {modelDisplayValue(property, sb.comments)}
                          </CommentsSpan>
                        </SingleBookingTime>
                      ))}
                    </BookingTimeWrapper>
                  );
                }
                if (property === 'selectedOptions' && !isEmpty(currentRecord[property])) {
                  return (
                    <BookingTimeWrapper key={property}>
                      <RecordDetailSpan>
                        <strong>{recordPropertyDisplayMap[property]} : </strong>
                      </RecordDetailSpan>
                      {(currentRecord[property] as ISelectedExtraOptions[]).map(
                        ({ options, fromHour, toHour }) => (
                          <SingleBookingTime key={fromHour.getMilliseconds()}>
                            <RecordDetailSpan>
                              <strong>Opcje : </strong>
                              {checkSelectedOption(options)}
                            </RecordDetailSpan>
                            <RecordDetailSpan>
                              <strong>Od godziny : </strong>
                              {modelDisplayValue(property, fromHour, true)}
                            </RecordDetailSpan>
                            <RecordDetailSpan>
                              <strong>Do godziny: </strong>
                              {modelDisplayValue(property, toHour, true)}
                            </RecordDetailSpan>
                          </SingleBookingTime>
                        )
                      )}
                    </BookingTimeWrapper>
                  );
                }
                if (!isEmpty(currentRecord[property])) {
                  return (
                    <RecordDetailSpan key={property}>
                      <strong>{recordPropertyDisplayMap[property]} : </strong>
                      {modelDisplayValue(property, currentRecord[property])}
                    </RecordDetailSpan>
                  );
                }
                return null;
              })}
            </RecordDetail>
          </BookingDetailWrapper>
        ) : null}
      </>
    )}
  />
);
export default MultipleRecordItem;
