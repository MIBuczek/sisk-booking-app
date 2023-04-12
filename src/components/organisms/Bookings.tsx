import * as React from 'react';
import Button from 'components/atoms/Button';
import Header from 'components/atoms/Header';
import SearchInputField from 'components/atoms/SearchInputField';
import {
   IAdminState,
   IBooking,
   IClient,
   IDeleteHandler,
   IEditHandler,
   instanceOfBookings,
   IReduxState
} from 'models';
import {useDispatch, useSelector} from 'react-redux';
import {closeModal, deleteBooking, openModal} from 'store';
import styled from 'styled-components';
import {
   adminCredentials,
   checkAllBookingsConflicts,
   filterBookingsPerPlace,
   findCurrentItemIndex,
   isNumber,
   MODAL_TYPES,
   RECORDS_BOOKING_DETAILS_PROPERTY_MAP,
   RECORDS_BOOKING_ROW_DETAILS,
   RECORDS_BOOKINGS_HEADERS,
   RECORDS_BOOKINGS_ROW,
   searchSelectedContent,
   siskEmployeeCredentials
} from 'utils';
import ModalDelete from 'components/molecules/modals/ModalDelete';
import BookingForm from 'components/molecules/forms/booking/BookingForm';
import MultipleRecords from 'components/atoms/MultipleRecords';
import ModalInfo from 'components/molecules/modals/ModalInfo';
import ModalBookingStatus from 'components/molecules/modals/ModalBookingStatus';
import {BsFillExclamationCircleFill} from 'react-icons/bs';
import Paragraph from 'components/atoms/Paragraph';
import {cloneDeep} from 'lodash';
import ErrorMsgServer from 'components/atoms/ErrorMsgServer';
import Modal from './Modal';
import ModalConflictDetails from '../molecules/modals/ModalConflictDetails';
import Checkbox from '../atoms/Checkbox';
import ModalSingleBookingTime from '../molecules/modals/ModalSingleBookingTime';

const BookingsWrapper = styled.section`
   width: 60%;
   min-height: 100%;
   height: auto;
   display: block;
   padding: 30px 0;
   z-index: 0;
   @media (max-width: 1400px) {
      width: 95%;
   }
`;

const BookingsHeader = styled(Header)`
   margin: 20px 0 40px 0;
   @media (max-width: 890px) {
      width: 80%;
   }
`;

const RecordsActionContent = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   flex-wrap: wrap;
`;

const OpenBookingsModalButton = styled(Button)`
   background-color: #eaeaea;
   border-color: ${({theme}) => theme.green};
   color: #454545;
   font-size: 16px;

   &:hover {
      background-color: ${({theme}) => theme.green};
      border-color: #b9b8b8;
      opacity: 1;
      box-shadow: 0 0 17px -7px rgba(66, 68, 90, 1);
   }
`;

const ConflictParagraph = styled(Paragraph)`
   color: ${({theme, conflict}) => (conflict ? theme.error : theme.darkGrey)};

   svg {
      color: ${({theme, conflict}) => (conflict ? theme.error : theme.green)};
      margin-right: 8px;
   }
`;

const AcceptedFilterWrapper = styled.div`
   height: auto;
   display: flex;
   align-items: center;
   padding: 6px 20px;
   border: ${({theme}) => `1px solid ${theme.green}`};
   border-radius: 5px;
`;

interface BookingsProps {
   mainState: IAdminState;
}

const Bookings: React.FunctionComponent<BookingsProps> = ({mainState}) => {
   const [allBookingsPerPlace, setAllBookingsPerPlace] = React.useState<IBooking[]>([]);
   const [bookingsList, setBookingsList] = React.useState<IBooking[]>([]);
   const [isEditing, setIsEditing] = React.useState(false);
   const [editedItemIndex, setEditedItemIndex] = React.useState<number | undefined>(undefined);
   const [editedSubItemIndex, setEditedSubItemIndex] = React.useState<number | undefined>(
      undefined
   );
   const [deleteItemIndex, setDeleteItemIndex] = React.useState<number | undefined>(undefined);
   const [conflicts, setConflicts] = React.useState<string[]>([]);
   const [searchPhase, setSearchPhase] = React.useState<string>('');
   const [filterAccepted, setFilterAccepted] = React.useState<boolean>(false);

   const dispatch = useDispatch();

   const {
      bookingStore: {bookings, errorMessage: errorBooking},
      currentUserStore: {user, errorMessage: errorUser},
      modal: {isOpen, type}
   } = useSelector((state: IReduxState) => state);

   /**
    * Function to handle the booking list. It is related to search input field.
    * @param searchResults
    * @param phase
    */
   const bookingListHandler = (searchResults: (IClient | IBooking)[], phase: string): void => {
      if (searchResults.length && instanceOfBookings(searchResults)) {
         let filteredResult = filterBookingsPerPlace(searchResults, mainState, user?.isAdmin);
         if (filterAccepted) {
            filteredResult = filteredResult.filter((r) => !r.accepted);
         }
         setBookingsList(filteredResult);
         setSearchPhase(phase);
      } else {
         setBookingsList([]);
         setSearchPhase(phase);
      }
   };

   /**
    * Function to handle edited item and set related property edit item and fill up booking form.
    *
    * @param itemIndex
    * @param isMainItem
    * @param subItemIndex
    * @param currentPage
    * @param postPerPage
    * @param modalType
    */
   const editBookingHandler = ({
      itemIndex,
      isMainItem,
      subItemIndex,
      currentPage,
      postPerPage,
      modalType
   }: IEditHandler) => {
      const currentIndex = findCurrentItemIndex(itemIndex, currentPage, postPerPage);
      setIsEditing(isMainItem);
      setEditedItemIndex(currentIndex);
      dispatch(openModal(modalType));
      if (isNumber(subItemIndex)) setEditedSubItemIndex(subItemIndex);
   };
   /**
    * Function to handle delete booking item and display related confirmation modal.
    * @param itemIndex
    * @param currentPage
    * @param postPerPage
    */
   const deleteBookingHandler = ({itemIndex, currentPage, postPerPage}: IDeleteHandler) => {
      const currentIndex = findCurrentItemIndex(itemIndex, currentPage, postPerPage);
      setDeleteItemIndex(currentIndex);
      dispatch(openModal(MODAL_TYPES.DELETE));
   };

   /**
    * Function to dispatch deleting action into firebase booking data collection.
    */
   const deleteBookingAction = () => {
      if (typeof deleteItemIndex === 'undefined') return;
      const currentBooking = cloneDeep(bookingsList[deleteItemIndex]);
      if (currentBooking.id) dispatch(deleteBooking(currentBooking.id));
      bookingListHandler(
         bookings.filter((b) => b.id !== currentBooking.id),
         searchPhase
      );
      initialBookingState();
      dispatch(closeModal());
   };

   /**
    * Function to cancel deleting action.
    */
   const cancelDeleteBookingAction = () => {
      initialBookingState();
      dispatch(closeModal());
   };

   /**
    * Function to restore initial status.
    */
   const initialBookingState = () => {
      setIsEditing(false);
      setEditedItemIndex(undefined);
      setDeleteItemIndex(undefined);
   };

   /**
    * Function for handle UseEffect call back.
    */
   const handlerEffectCallBack = () => {
      const bookingByPlace: IBooking[] = filterBookingsPerPlace(bookings, mainState, user?.isAdmin);
      setAllBookingsPerPlace(bookingByPlace);
      let searchedResults = searchSelectedContent(bookingByPlace, 'person', searchPhase);
      if (filterAccepted) {
         searchedResults = searchedResults.filter((r) => !r.accepted);
      }
      if (!searchedResults.length) setBookingsList([]);
      if (instanceOfBookings(searchedResults)) setBookingsList(searchedResults);
      if (user?.isAdmin) {
         const bookingWithConflicts = checkAllBookingsConflicts(bookingByPlace);
         setConflicts(bookingWithConflicts);
      }
   };

   React.useEffect(handlerEffectCallBack, [bookings, mainState, filterAccepted]);

   return (
      <BookingsWrapper>
         <BookingsHeader>Lista Rezerwacji</BookingsHeader>
         {(errorBooking || errorUser) && <ErrorMsgServer innerText={errorBooking || errorUser} />}
         <RecordsActionContent>
            <SearchInputField
               type="bookings"
               placeholder="Wyszukaj rezerwację"
               searchContent={bookings}
               searchProperty="person"
               searchContentHandler={bookingListHandler}
            />
            <AcceptedFilterWrapper>
               <Checkbox
                  checked={filterAccepted}
                  className="checkbox"
                  name="toAcceptReservation"
                  changeHandler={() => setFilterAccepted(!filterAccepted)}
                  disabled={false}
               />
               <Paragraph small>Pokaż rezerwcje do zakceptowania</Paragraph>
            </AcceptedFilterWrapper>
            <OpenBookingsModalButton onClick={() => dispatch(openModal(MODAL_TYPES.BOOKINGS))}>
               {adminCredentials(user) ? 'Dodaj nową rezerwację' : 'Wyślij prośbę o rezerwacje'}
            </OpenBookingsModalButton>
         </RecordsActionContent>
         <MultipleRecords
            headers={RECORDS_BOOKINGS_HEADERS}
            recordProperty={RECORDS_BOOKINGS_ROW}
            recordPropertyDetails={RECORDS_BOOKING_ROW_DETAILS}
            recordPropertyDisplayMap={RECORDS_BOOKING_DETAILS_PROPERTY_MAP}
            isAdmin={adminCredentials(user)}
            isEmployee={user?.isEmployee || false}
            conflicts={conflicts}
            records={bookingsList}
            allRecords={allBookingsPerPlace}
            editHandler={editBookingHandler}
            deleteHandler={deleteBookingHandler}
            emptyText="Nie ma żadnej dodanej rezerwacja do bazy danych."
         />
         {user?.isAdmin && (
            <ConflictParagraph small bold conflict={!!conflicts.length}>
               <BsFillExclamationCircleFill />
               {`Aktualna liczba konfliktów między rezerwacjami: ${conflicts.length}`}
            </ConflictParagraph>
         )}
         {isOpen && (
            <Modal className={type === MODAL_TYPES.BOOKINGS ? 'overflow' : undefined}>
               {type === MODAL_TYPES.BOOKINGS && (
                  <BookingForm
                     mainState={mainState}
                     bookingsList={bookingsList}
                     isEditing={isEditing}
                     editedItemIndex={editedItemIndex}
                     initialEditingState={initialBookingState}
                     isSISKEmployee={siskEmployeeCredentials(user)}
                     isAdmin={adminCredentials(user)}
                  />
               )}
               {type === MODAL_TYPES.BOOKINGS_STATUS && (
                  <ModalBookingStatus
                     bookingsList={bookingsList}
                     editedItemIndex={editedItemIndex}
                     editedSubItemIndex={editedSubItemIndex}
                  />
               )}
               {type === MODAL_TYPES.BOOKING_SINGLE_TIME && (
                  <ModalSingleBookingTime
                     bookingsList={bookingsList}
                     editedItemIndex={editedItemIndex}
                     editedSubItemIndex={editedSubItemIndex}
                  />
               )}
               {type === MODAL_TYPES.DELETE && (
                  <ModalDelete
                     message="Czy na pewno chcesz usunąć tą rezerwację"
                     callback={deleteBookingAction}
                     cancelCallback={cancelDeleteBookingAction}
                  />
               )}
               {type === MODAL_TYPES.BOOKING_CONFLICTS && <ModalConflictDetails />}
               {type === MODAL_TYPES.SUCCESS && <ModalInfo header="Rezerwacja" />}
               {type === MODAL_TYPES.ERROR && <ModalInfo header="Rezerwacja" />}
            </Modal>
         )}
      </BookingsWrapper>
   );
};

export default Bookings;
