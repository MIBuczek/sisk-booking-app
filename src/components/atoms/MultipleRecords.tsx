import { isEmpty } from 'lodash';
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
      display: inherit;
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
  &:nth-child(odd) {
    width: 80%;
  }
  &:nth-child(even) {
    width: 150px;
  }
`;

const RecordTableData = styled.td<RecordDataType>`
  padding: 0.5rem 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.darkGrey};
  text-align: ${({ empty }) => (empty ? 'center' : 'start')};
  animation: ${fadeInLeft} 0.5s linear;
  &:nth-child(odd) {
    width: 80%;
  }
  &:nth-child(even) {
    width: 150px;
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
  records?: string[];
  emptyText: string;
  editHandler: (index: number) => void;
  deleteHandler: (index: number) => void;
}

const MultipleRecords: React.FunctionComponent<IProps> = ({
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
            <RecordTableHeader>Nazwa obiektu</RecordTableHeader>
            <RecordTableHeader>Edycja</RecordTableHeader>
          </tr>
        </thead>
        <tbody>
          {isEmpty(records) ? (
            <tr>
              <RecordTableData empty>{emptyText}</RecordTableData>
            </tr>
          ) : (
            pagination(records, currentPage, postPerPage).map((record, index) => (
              <tr key={record}>
                <RecordTableData>{record}</RecordTableData>
                <RecordTableData>
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
