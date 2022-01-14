import { isEmpty } from 'lodash';
import { IBooking, IClient } from 'models';
import * as React from 'react';
import { fadeInLeft } from 'style/animation';
import styled from 'styled-components';
import { pagination } from 'utils';
import MultipleRecordItem from './MultipleRecordsItem';
import Pagination from './Pagination';

type RecordDataType = {
  empty?: boolean;
};

const RecordWrapper = styled.div`
  width: 100%;
  min-width: 400px;
  margin-top: 1.4rem;
`;

const RecordTable = styled.table`
  width: 100%;
  min-height: 430px;
  display: block;
  padding: 0;
  thead {
    display: inherit;
    width: 100%;
    tr {
      display: flex;
      width: 100%;
      &:first-of-type {
        border-top: ${({ theme }) => `1px solid ${theme.green}`};
        border-bottom: ${({ theme }) => `1px solid ${theme.green}`};
      }
    }
  }
  tbody {
    display: inherit;
    width: 100%;
    min-height: 430px;
    tr {
      display: block;
    }
    tr.empty {
      width: 100%;
      text-align: center;
      margin: auto;
    }
  }
`;

const RecordTableHeader = styled.th`
  padding: 0.5rem 0.8rem;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.darkGrey};
  text-align: start;
  &.clients {
    &:nth-of-type(1) {
      width: 10%;
    }
    &:nth-of-type(2) {
      width: 73%;
    }
    &:nth-of-type(3) {
      width: 17%;
    }
  }
  &.bookings {
    width: 10%;
    &:nth-of-type(1) {
      width: 8%;
    }
    &:nth-of-type(2) {
      width: 28%;
    }
    &:nth-of-type(3) {
      width: 11%;
    }
    &:nth-of-type(4) {
      width: 11%;
    }
  }
`;

const RecordTableData = styled.td<RecordDataType>`
  display: inline-block;
  padding: 0.5rem 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.darkGrey};
  text-align: ${({ empty }) => (empty ? 'center' : 'start')};
  animation: ${fadeInLeft} 0.5s linear;
  &.clients {
    &:nth-of-type(1) {
      width: 10%;
    }
    &:nth-of-type(2) {
      width: 73%;
    }
    &:nth-of-type(3) {
      width: 17%;
    }
  }
  &.bookings {
    width: 10%;
    &:nth-of-type(1) {
      width: 8%;
    }
    &:nth-of-type(2) {
      width: 28%;
    }
    &:nth-of-type(3) {
      width: 11%;
    }
    &:nth-of-type(4) {
      width: 11%;
    }
  }
`;

interface IProps {
  title: string;
  headers: string[];
  dataProperty: string[];
  dataPropertyDetails: string[];
  records?: (IClient | IBooking)[];
  emptyText: string;
  editHandler: (index: number) => void;
  deleteHandler: (index: number) => void;
}

const MultipleRecords: React.FunctionComponent<IProps> = ({
  title,
  headers,
  dataProperty,
  dataPropertyDetails,
  records = [],
  emptyText,
  editHandler,
  deleteHandler
}) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [postPerPage] = React.useState<number>(5);

  const nextPage = (num: number): void => setCurrentPage(num);

  return (
    <RecordWrapper>
      <RecordTable>
        <thead>
          <tr>
            {headers.map((h) => (
              <RecordTableHeader key={h} className={`${title}`}>
                {h}
              </RecordTableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {isEmpty(records) ? (
            <tr className="empty">
              <RecordTableData empty>{emptyText}</RecordTableData>
            </tr>
          ) : (
            pagination(records, currentPage, postPerPage).map((record, index) => (
              <MultipleRecordItem
                key={record.id}
                className={title}
                index={index}
                recordProperty={dataProperty}
                recordPropertyDetails={dataPropertyDetails}
                currentRecord={record}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
              />
            ))
          )}
        </tbody>
      </RecordTable>
      <Pagination nextPage={nextPage} totalPost={records.length} postPerPage={postPerPage} />
    </RecordWrapper>
  );
};

export default MultipleRecords;
