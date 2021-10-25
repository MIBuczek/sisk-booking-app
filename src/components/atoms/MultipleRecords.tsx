import { isEmpty } from 'lodash';
import * as React from 'react';
import { BsFillFileEarmarkTextFill, BsTrashFill } from 'react-icons/bs';
import styled from 'styled-components';
import Button from './Button';

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
  tr {
    display: inherit;
    width: 100%;
    &:first-of-type {
      border-top: ${({ theme }) => `1px solid ${theme.green}`};
      border-bottom: ${({ theme }) => `1px solid ${theme.green}`};
      border-radius: 5px;
    }
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
  &:hover {
    box-shadow: none;
    border-color: ${({ theme }) => theme.middleGray};
  }
`;

interface IProps {
  records: string[];
  emptyText: string;
}

const MultipleRecords: React.FunctionComponent<IProps> = ({ records, emptyText }) => (
  <RecordWrapper>
    <RecordTable>
      <tr>
        <RecordTableHeader>Nazwa obiektu</RecordTableHeader>
        <RecordTableHeader>Edycja</RecordTableHeader>
      </tr>
      <tr>
        {isEmpty(records) ? (
          <RecordTableData empty>{emptyText}</RecordTableData>
        ) : (
          records.map((record) => (
            <tr key={record}>
              <RecordTableData>{record}</RecordTableData>
              <RecordTableData>
                <ListItemBtn>
                  <BsFillFileEarmarkTextFill />
                </ListItemBtn>
                <ListItemBtn>
                  <BsTrashFill />
                </ListItemBtn>
              </RecordTableData>
            </tr>
          ))
        )}
      </tr>
    </RecordTable>
  </RecordWrapper>
);

export default MultipleRecords;
