import * as React from 'react';
import Button from 'components/atoms/Button';
import Header from 'components/atoms/Header';
import SearchInputField from 'components/atoms/SearchInputField';
import { IAdminState, IBooking, IClient, instanceOfBookings, IReduxState } from 'models';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, deleteBooking, openModal } from 'store';
import styled from 'styled-components';
import {
  MODAL_TYPES,
  RECORDS_BOOKINGS_HEADERS,
  RECORDS_BOOKINGS_ROW,
  RECORDS_BOOKING_ROW_DETAILS,
  RECORDS_BOOKING_DETAILS_PROPERTY_MAP,
  adminCredentials
} from 'utils';
import ModalDelete from 'components/molecules/modals/ModalDelete';
import NewBookingForm from 'components/molecules/forms/NewBookingForm';
import MultipleRecords from 'components/atoms/MultipleRecords';
import ModalInfo from 'components/molecules/modals/ModalInfo';
import BookingStatusForm from 'components/molecules/forms/BookingStatusForm';
import Modal from './Modal';

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
  margin: 20px 0 40px 20px;
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
  border-color: ${({ theme }) => theme.green};
  color: #454545;
  &:hover {
    background-color: ${({ theme }) => theme.green};
    border-color: #b9b8b8;
    box-shadow: none;
    opacity: 1;
  }
`;

interface BookingsProps {
  mainState: IAdminState;
}

const Bookings: React.FunctionComponent<BookingsProps> = ({ mainState }) => {
  const [bookingsList, setBookingsList] = React.useState<IBooking[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItemIndex, setEditedItemIndex] = React.useState<number | undefined>(undefined);
  const [deleteItemIndex, setDeleteItemIndex] = React.useState<number | undefined>(undefined);

  const dispatch = useDispatch();

  const {
    bookingStore: { bookings },
    currentUserStore: { user },
    modal: { isOpen, type }
  } = useSelector((state: IReduxState) => state);

  const bookingListHandler = (searchResults: (IClient | IBooking)[]): void => {
    if (searchResults.length && instanceOfBookings(searchResults)) {
      setBookingsList(searchResults);
    } else {
      setBookingsList([]);
    }
  };

  const editBookingHandler = (index: number, isEditor: boolean) => {
    setIsEditing(isEditor);
    setEditedItemIndex(index);
    dispatch(openModal(isEditor ? MODAL_TYPES.BOOKINGS : MODAL_TYPES.BOOKINGS_STATUS));
  };

  const deleteBookingHandler = (index: number) => {
    setDeleteItemIndex(index);
    dispatch(openModal(MODAL_TYPES.DELETE));
  };

  const deleteBookingAction = () => {
    if (typeof deleteItemIndex === 'undefined') return;
    const currentBooking = bookings[deleteItemIndex];
    if (currentBooking.id) dispatch(deleteBooking(currentBooking.id));
    bookingListHandler(bookings.filter((b) => b.id !== currentBooking.id));
    initialBookingState();
    dispatch(closeModal());
  };

  const cancelDeleteBookingAction = () => {
    initialBookingState();
    dispatch(closeModal());
  };

  const initialBookingState = () => {
    setIsEditing(false);
    setEditedItemIndex(undefined);
    setDeleteItemIndex(undefined);
  };

  React.useEffect(() => setBookingsList(bookings), [bookings]);

  return (
    <BookingsWrapper>
      <BookingsHeader>Lista Rezerwacji</BookingsHeader>
      <RecordsActionContent>
        <SearchInputField
          type="bookings"
          placeholder="Wyszukaj rezerwację"
          searchContent={bookings}
          searchProperty="person"
          searchContentHandler={bookingListHandler}
        />
        {adminCredentials(user) && (
          <OpenBookingsModalButton onClick={() => dispatch(openModal(MODAL_TYPES.BOOKINGS))}>
            Dodaj nowa rezerwace
          </OpenBookingsModalButton>
        )}
      </RecordsActionContent>
      <MultipleRecords
        headers={RECORDS_BOOKINGS_HEADERS}
        dataProperty={RECORDS_BOOKINGS_ROW}
        dataPropertyDetails={RECORDS_BOOKING_ROW_DETAILS}
        dataPropertyDisplayMap={RECORDS_BOOKING_DETAILS_PROPERTY_MAP}
        isAdmin={adminCredentials(user)}
        isEmployee={user?.isEmployee || false}
        records={bookingsList}
        editHandler={editBookingHandler}
        deleteHandler={deleteBookingHandler}
        emptyText="Nie ma żadnej dodanej rezerwacja do bazy danych."
      />
      {isOpen && (
        <Modal>
          {type === MODAL_TYPES.BOOKINGS && (
            <NewBookingForm
              mainState={mainState}
              isEditing={isEditing}
              editedItemIndex={editedItemIndex}
              initialEditingState={initialBookingState}
              isAdmin
            />
          )}
          {type === MODAL_TYPES.BOOKINGS_STATUS && (
            <BookingStatusForm editedItemIndex={editedItemIndex} />
          )}
          {type === MODAL_TYPES.DELETE && (
            <ModalDelete
              message="Czy na pewno chcesz chcesz skazować tą rezerwacje"
              callback={deleteBookingAction}
              cancelCallback={cancelDeleteBookingAction}
            />
          )}
          {type === MODAL_TYPES.SUCCESS && <ModalInfo header="Rezerwacja" />}
        </Modal>
      )}
    </BookingsWrapper>
  );
};

export default Bookings;
