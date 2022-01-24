import { IClient, IBooking } from 'models';
import * as React from 'react';
import { BsChevronDown, BsFillFileEarmarkTextFill, BsTrashFill } from 'react-icons/bs';
import { fadeIn, fadeInLeft } from 'style/animation';
import styled from 'styled-components';
import { modelDisplayValue } from 'utils';
import Collapse, { IRenderProps } from '../../providers/Collapse';
import Button from './Button';

const RecordTableData = styled.td`
  display: inline-block;
  padding: 0.5rem 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.darkGrey};
  animation: ${fadeInLeft} 0.5s linear;
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
    border-color: ${({ theme }) => theme.middleGray};
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
`;

const RecordDetailSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 10px 5px;
  min-width: 20%;
  width: auto;
`;

const ChevronIcon = styled(BsChevronDown)`
  transition: 0.4s;
  &.open {
    transform: rotate(180deg);
  }
`;

interface MultipleRecordItemProps {
  index: number;
  recordProperty: string[];
  recordPropertyDetails: string[];
  recordPropertyDisplayMap: { [x: string]: string };
  currentRecord: IClient | IBooking;
  editHandler: (index: number) => void;
  deleteHandler: (index: number) => void;
}

const MultipleRecordItem: React.FunctionComponent<MultipleRecordItemProps> = ({
  index,
  recordProperty,
  recordPropertyDetails,
  recordPropertyDisplayMap,
  currentRecord,
  editHandler,
  deleteHandler
}) => (
  <Collapse
    render={({ isCollapsed, toggle }: IRenderProps) => (
      <>
        <tr>
          <RecordTableData>{index}</RecordTableData>
          {recordProperty.map((property) => (
            <RecordTableData key={property}>
              {modelDisplayValue(currentRecord[property])}
            </RecordTableData>
          ))}
          <RecordTableData> Nie </RecordTableData>
          <RecordTableData>
            <ListItemBtn onClick={toggle}>
              <ChevronIcon className={isCollapsed ? 'open' : 'close'} />
            </ListItemBtn>
            <ListItemBtn onClick={() => editHandler(index)}>
              <BsFillFileEarmarkTextFill />
            </ListItemBtn>
            <ListItemBtn onClick={() => deleteHandler(index)}>
              <BsTrashFill />
            </ListItemBtn>
          </RecordTableData>
        </tr>
        {isCollapsed ? (
          <tr>
            <RecordDetail>
              {recordPropertyDetails.map((property) => (
                <RecordDetailSpan key={property}>
                  <strong>{recordPropertyDisplayMap[property]} : </strong>
                  {modelDisplayValue(currentRecord[property])}
                </RecordDetailSpan>
              ))}
            </RecordDetail>
          </tr>
        ) : null}
      </>
    )}
  />
);

export default MultipleRecordItem;
