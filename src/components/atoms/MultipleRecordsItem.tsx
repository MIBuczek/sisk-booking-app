import { IClient, IBooking } from 'models';
import * as React from 'react';
import { BsChevronDown, BsFillFileEarmarkTextFill, BsTrashFill } from 'react-icons/bs';
import { fadeIn, fadeInLeft } from 'style/animation';
import styled from 'styled-components';
import Collapse, { IRenderProps } from '../../providers/Collapse';
import Button from './Button';

const RecordTableData = styled.td`
  display: inline-block;
  padding: 0.5rem 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.darkGrey};
  animation: ${fadeInLeft} 0.5s linear;
  &:nth-of-type(1) {
    width: 10%;
  }
  &:nth-of-type(2) {
    width: 35%;
  }
  &:nth-of-type(3) {
    width: 20%;
  }
  &:nth-of-type(4) {
    width: 20%;
  }
  &:nth-of-type(5) {
    width: 15%;
  }
  /* &.clients {
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
  } */
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
  currentRecord: IClient | IBooking;
  editHandler: (index: number) => void;
  deleteHandler: (index: number) => void;
}

const MultipleRecordItem: React.FunctionComponent<MultipleRecordItemProps> = ({
  index,
  recordProperty,
  recordPropertyDetails,
  currentRecord,
  editHandler,
  deleteHandler
}) => (
  <Collapse
    render={({ isCollapsed, toggle }: IRenderProps) => (
      <>
        <tr>
          <RecordTableData>{index}</RecordTableData>
          {recordProperty.map((property) => {
            if (!currentRecord[property]) return null;
            return <RecordTableData key={property}>{currentRecord[property]}</RecordTableData>;
          })}
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
              {recordPropertyDetails.map((property) => {
                if (!currentRecord[property]) return null;
                return (
                  <RecordDetailSpan key={JSON.stringify(currentRecord[property])}>
                    <strong>{property} : </strong>
                    {currentRecord[property]}
                  </RecordDetailSpan>
                );
              })}
            </RecordDetail>
          </tr>
        ) : null}
      </>
    )}
  />
);

export default MultipleRecordItem;
