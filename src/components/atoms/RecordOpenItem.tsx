import * as React from 'react';
import { BsCalendarXFill, BsFillCheckSquareFill } from 'react-icons/bs';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { IBooking, IEditHandler, ISingleBookingDate } from '../../models';
import { checkSingleDayConflict, MODAL_TYPES, modelDisplayValue } from '../../utils';
import Button from './Button';
import { openModal, updateBookingConflicts } from '../../store';

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

  &.conflict {
    background: rosybrown;
  }
`;

const RecordDetailSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.m};
  padding: 10px 15px 10px 5px;
  width: auto;
`;

const ButtonWrapper = styled.div`
  width: fit-content;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

  &.conflict-modal {
    color: ${({ theme }) => theme.error};
  }

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

const CommentsSpan = styled(RecordDetailSpan)`
  width: 100% !important;
  border-bottom: ${({ theme }) => `1px dotted ${theme.middleGray}`};
  margin-bottom: 3px;

  &.lastRecord {
    border-bottom-color: transparent;
  }
`;

interface IProps {
  mainIndex: number;
  property: string;
  currentPage: number;
  postPerPage: number;
  singleBooking: ISingleBookingDate;
  singleBookingIndex: number;
  hasRight: boolean;
  currentRecord: IBooking;
  allRecords: IBooking[];
  lastRecord: boolean;
  editHandler: (editDetails: IEditHandler) => void;
}

const RecordOpenItem: React.FunctionComponent<IProps> = ({
  mainIndex,
  property,
  currentPage,
  postPerPage,
  singleBooking,
  singleBookingIndex,
  hasRight,
  currentRecord,
  allRecords,
  lastRecord,
  editHandler
}): JSX.Element => {
  const [conflictedItems, setConflictedItems] = React.useState<IBooking[]>([]);

  const dispatch = useDispatch();

  /* Method to check single reservation conflict and set component state */
  const checkSingleConflict = (
    sbd: ISingleBookingDate,
    sbId: string = '',
    sbMonth: number = -1
  ): void => {
    if (currentRecord.accepted) {
      setConflictedItems([]);
    } else {
      setConflictedItems(checkSingleDayConflict(sbd, sbId, sbMonth, allRecords));
    }
  };

  /* Method to open conflict modal and set conflicted reservation in general store */
  const openConflictModal = (): void => {
    dispatch(updateBookingConflicts(conflictedItems));
    dispatch(openModal(MODAL_TYPES.BOOKING_CONFLICTS));
  };

  React.useEffect(() => {
    checkSingleConflict(singleBooking, currentRecord.id as string, currentRecord.month as number);
  }, []);

  return (
    <SingleBookingTime className={`${conflictedItems.length ? 'conflict' : ''}`}>
      <RecordDetailSpan>
        <strong>Dzień: </strong>
        {modelDisplayValue(property, singleBooking.day)}
      </RecordDetailSpan>
      <RecordDetailSpan>
        <strong>Godzina rozpoczęcia: </strong>
        {modelDisplayValue(property, singleBooking.startHour, true)}
      </RecordDetailSpan>
      <RecordDetailSpan>
        <strong>Godzina zakończenia: </strong>
        {modelDisplayValue(property, singleBooking.endHour, true)}
      </RecordDetailSpan>
      <RecordDetailSpan>
        <strong>Status: </strong>
        {modelDisplayValue(property, singleBooking.status)}
      </RecordDetailSpan>
      {hasRight && (
        <ButtonWrapper>
          {conflictedItems.length ? (
            <ListItemBtn className="conflict-modal" type="button" onClick={openConflictModal}>
              <BsCalendarXFill />
            </ListItemBtn>
          ) : null}
          <ListItemBtn
            type="button"
            disabled={!currentRecord.accepted}
            onClick={() =>
              editHandler({
                itemIndex: mainIndex,
                isMainItem: false,
                subItemIndex: singleBookingIndex,
                currentPage,
                postPerPage
              })
            }>
            <BsFillCheckSquareFill />
          </ListItemBtn>
        </ButtonWrapper>
      )}
      <CommentsSpan className={`${lastRecord ? 'lastRecord' : ''}`}>
        <strong>Komentarz: </strong>
        {modelDisplayValue(property, singleBooking.comments)}
      </CommentsSpan>
    </SingleBookingTime>
  );
};

export default RecordOpenItem;
