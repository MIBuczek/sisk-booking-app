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
  @media (max-width: 890px) {
    min-width: 350px;
  }
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
      display: flex;
      align-items: center;
      width: 100%;
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
  width: 15%;
  &:nth-of-type(1) {
    width: 5%;
  }
  &:nth-of-type(2) {
    width: 22%;
  }
  &:last-of-type {
    width: 15%;
    margin-left: auto;
  }
  @media (max-width: 890px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    padding: 0.2rem 0.8rem;
    word-break: break-all;
  }
`;

const RecordTableData = styled.td<RecordDataType>`
  display: inline-block;
  padding: 0.5rem 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.darkGrey};
  text-align: ${({ empty }) => (empty ? 'center' : 'start')};
  animation: ${fadeInLeft} 0.5s linear;
  @media (max-width: 890px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    word-break: break-all;
  }
`;

interface IProps {
  headers: string[];
  dataProperty: string[];
  dataPropertyDetails: string[];
  dataPropertyDisplayMap: { [x: string]: string };
  isAdmin: boolean;
  records?: (IClient | IBooking)[];
  emptyText: string;
  editHandler: (index: number, isEditor: boolean) => void;
  deleteHandler: (index: number) => void;
}

const MultipleRecords: React.FunctionComponent<IProps> = ({
  headers,
  dataProperty,
  dataPropertyDetails,
  dataPropertyDisplayMap,
  isAdmin,
  records = [],
  emptyText,
  editHandler,
  deleteHandler
}) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [postPerPage] = React.useState<number>(5);

  const nextPage = (num: number): void => setCurrentPage(num);

  React.useEffect(() => undefined, [records]);

  return (
    <RecordWrapper>
      <RecordTable>
        <thead>
          <tr>
            {headers.map((h) => (
              <RecordTableHeader key={h}>{h}</RecordTableHeader>
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
                index={index}
                recordProperty={dataProperty}
                recordPropertyDetails={dataPropertyDetails}
                recordPropertyDisplayMap={dataPropertyDisplayMap}
                isAdmin={isAdmin}
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
