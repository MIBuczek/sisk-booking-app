import {isEmpty} from 'lodash';
import {IBooking, IClient, IDeleteHandler, IEditHandler, singleInstanceOfBookings} from 'models';
import * as React from 'react';
import {fadeInLeft} from 'style/animation';
import styled from 'styled-components';
import {pagination, SIZE_OPTIONS} from 'utils';
import ButtonGroup from 'components/atoms/ButtonGroup';
import MultipleRecordItem from 'components/atoms/MultipleRecordsItem';
import Pagination from 'components/atoms/Pagination';

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
            border-top: ${({theme}) => `1px solid ${theme.green}`};
            border-bottom: ${({theme}) => `1px solid ${theme.green}`};
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
         display: block;
      }
   }

   tfoot {
      width: 100%;
      display: flex;
      border-top: ${({theme}) => `1px solid ${theme.green}`};
      border-bottom: ${({theme}) => `1px solid ${theme.green}`};

      tr {
         width: 100%;

         td {
            width: 100%;
            display: flex;
         }
      }
   }
`;

const RecordTableHeader = styled.th`
   padding: 0.5rem 0.8rem;
   font-weight: 600;
   font-size: ${({theme}) => theme.fontSize.m};
   color: ${({theme}) => theme.darkGrey};
   text-align: start;
   width: 15%;

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
      font-size: ${({theme}) => theme.fontSize.s};
      padding: 0.2rem 0.8rem;
      word-break: break-all;
   }
`;

const RecordTableData = styled.td<RecordDataType>`
   display: inline-block;
   padding: 0.5rem 0.8rem;
   font-size: ${({theme}) => theme.fontSize.m};
   color: ${({theme}) => theme.darkGrey};
   text-align: ${({empty}) => (empty ? 'center' : 'start')};
   animation: ${fadeInLeft} 0.5s linear;
   word-break: break-word;
   @media (max-width: 890px) {
      font-size: ${({theme}) => theme.fontSize.s};
      word-break: break-all;
   }
`;

interface IProps {
   headers: string[];
   recordProperty: string[];
   recordPropertyDetails: string[];
   recordPropertyDisplayMap: {[x: string]: string};
   isAdmin: boolean;
   isEmployee: boolean;
   conflicts: string[];
   openRecords: boolean;
   records?: (IClient | IBooking)[];
   allRecords?: (IClient | IBooking)[];
   emptyText: string;
   editHandler: (editDetails: IEditHandler) => void;
   deleteHandler: (deleteDetails: IDeleteHandler) => void;
}

/**
 * Multiple Records Component
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const MultipleRecords: React.FunctionComponent<IProps> = ({
   headers,
   recordProperty,
   recordPropertyDetails,
   recordPropertyDisplayMap,
   isAdmin,
   isEmployee,
   conflicts = [],
   openRecords,
   records = [],
   allRecords = [],
   emptyText,
   editHandler,
   deleteHandler
}): JSX.Element => {
   const [currentPage, setCurrentPage] = React.useState<number>(1);
   const [postPerPage, setPostPerPage] = React.useState<number>(20);

   const nextPage = (num: number): void => setCurrentPage(num);

   const postPerPageHandler = (e: React.MouseEvent, value: SIZE_OPTIONS | number): void => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof value === 'number') setPostPerPage(value);
   };

   /* Method to check has single item has conflicts */
   const singleItemConflictHandler = (record: IBooking | IClient): boolean => {
      if (singleInstanceOfBookings(record)) {
         if (record.accepted) {
            return false;
         }
         return conflicts.includes(record.id || '');
      }
      return false;
   };

   /**
    * Effect to refresh view when records come
    */
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
                        currentPage={currentPage}
                        postPerPage={postPerPage}
                        recordProperty={recordProperty}
                        recordPropertyDetails={recordPropertyDetails}
                        recordPropertyDisplayMap={recordPropertyDisplayMap}
                        isAdmin={isAdmin}
                        isEmployee={isEmployee}
                        hasConflicts={singleItemConflictHandler(record)}
                        currentRecord={record}
                        records={records}
                        openRecords={openRecords}
                        allRecords={allRecords}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                     />
                  ))
               )}
            </tbody>
            <tfoot>
               <tr>
                  <td>
                     <Pagination
                        currentPage={currentPage}
                        nextPage={nextPage}
                        totalPost={records.length}
                        postPerPage={postPerPage}
                     />
                     <ButtonGroup
                        itemPerPage
                        options={[20, 50, 100]}
                        optionsHandler={postPerPageHandler}
                        value={postPerPage}
                        disabled={false}
                     />
                  </td>
               </tr>
            </tfoot>
         </RecordTable>
      </RecordWrapper>
   );
};

export default MultipleRecords;
