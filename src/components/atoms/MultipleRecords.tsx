import { isEmpty } from 'lodash';
import { IBooking, IBuilding, IClient } from 'models';
import * as React from 'react';
import { BsFillFileEarmarkTextFill, BsTrashFill } from 'react-icons/bs';
import { fadeInLeft } from 'style/animation';
import styled from 'styled-components';
import { pagination } from 'utils';
import Button from './Button';
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
  min-height: 230px;
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
    min-height: 205px;
  }
`;

const RecordTableHeader = styled.th`
  padding: 0.5rem 0.8rem;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.darkGrey};
  text-align: start;
  &.clients,
  &.buildings {
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
  padding: 0.5rem 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.darkGrey};
  text-align: ${({ empty }) => (empty ? 'center' : 'start')};
  animation: ${fadeInLeft} 0.5s linear;
  &.clients,
  &.buildings {
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

const ListItemBtn = styled(Button)`
  background: white;
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.m};
  border: none;
  border-bottom: 1px solid white;
  padding: 5px;
  margin: 0;
  &:hover {
    box-shadow: none;
    border-color: ${({ theme }) => theme.middleGray};
  }
`;

interface IProps {
  title: string;
  headers: string[];
  dataProperty: string[];
  records?: (IBuilding | IClient | IBooking)[];
  emptyText: string;
  editHandler: (index: number) => void;
  deleteHandler: (index: number) => void;
}

const MultipleRecords: React.FunctionComponent<IProps> = ({
  title,
  headers,
  dataProperty,
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
            <tr>
              <RecordTableData empty>{emptyText}</RecordTableData>
            </tr>
          ) : (
            pagination(records, currentPage, postPerPage).map((record, index) => (
              <tr key={`${record}`}>
                <RecordTableData className={`${title}`}>{index}</RecordTableData>
                {dataProperty.map((property) => {
                  if (!record[property]) return null;
                  return (
                    <RecordTableData key={property} className={`${title}`}>
                      {record[property]}
                    </RecordTableData>
                  );
                })}
                <RecordTableData className={`${title}`}>
                  <ListItemBtn onClick={() => editHandler(index)}>
                    <BsFillFileEarmarkTextFill />
                  </ListItemBtn>
                  <ListItemBtn onClick={() => deleteHandler(index)}>
                    <BsTrashFill />
                  </ListItemBtn>
                </RecordTableData>
              </tr>
            ))
          )}
        </tbody>
      </RecordTable>
      <Pagination nextPage={nextPage} totalPost={records.length} postPerPage={postPerPage} />
    </RecordWrapper>
  );
};

export default MultipleRecords;
