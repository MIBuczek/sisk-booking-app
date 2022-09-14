import Button from 'components/atoms/Button';
import Header from 'components/atoms/Header';
import MultipleRecords from 'components/atoms/MultipleRecords';
import ClientForm from 'components/molecules/forms/ClientForm';
import {
  IBooking,
  IClient,
  IDeleteHandler,
  IEditHandler,
  instanceOfClients,
  IReduxState
} from 'models';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, deleteClient, openModal } from 'store';
import styled from 'styled-components';
import {
  adminCredentials,
  findCurrentItemIndex,
  MODAL_TYPES,
  RECORDS_CLIENTS_DETAILS_PROPERTY_MAP,
  RECORDS_CLIENTS_HEADERS,
  RECORDS_CLIENTS_ROW,
  RECORDS_CLIENTS_ROW_DETAILS
} from 'utils';
import Modal from 'components/organisms/Modal';
import SearchInputField from 'components/atoms/SearchInputField';
import ModalDelete from 'components/molecules/modals/ModalDelete';
import ModalInfo from 'components/molecules/modals/ModalInfo';
import ErrorMsgServer from 'components/atoms/ErrorMsgServer';

const CalenderWrapper = styled.section`
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

const ClientHeader = styled(Header)`
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

const OpenClientModalButton = styled(Button)`
  background-color: #eaeaea;
  border-color: ${({ theme }) => theme.green};
  color: #454545;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.green};
    border-color: #b9b8b8;
    opacity: 1;
    box-shadow: 0 0 17px -7px rgba(66, 68, 90, 1);
  }
`;

const Clients = (): JSX.Element => {
  const [clientList, setClientList] = React.useState<IClient[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItemIndex, setEditedItemIndex] = React.useState<number | undefined>(undefined);
  const [deleteItemIndex, setDeleteItemIndex] = React.useState<number | undefined>(undefined);

  const dispatch = useDispatch();

  const {
    clientStore: { clients, errorMessage: errorClient },
    currentUserStore: { user, errorMessage: errorUser },
    modal: { isOpen, type }
  } = useSelector((state: IReduxState) => state);

  /**
   * Function to handle the client list. It is related to search input field.
   * @param searchResults
   */
  const clientListHandler = (searchResults: (IClient | IBooking)[]): void => {
    if (searchResults.length && instanceOfClients(searchResults)) {
      setClientList(searchResults);
    }
  };

  /**
   * Function to handle edited client data and set related data into client form.
   * @param itemIndex
   * @param currentPage
   * @param postPerPage
   */
  const editClientHandler = ({ itemIndex, currentPage, postPerPage }: IEditHandler) => {
    const currentIndex = findCurrentItemIndex(itemIndex, currentPage, postPerPage);
    setIsEditing(true);
    setEditedItemIndex(currentIndex);
    dispatch(openModal(MODAL_TYPES.CLIENT));
  };

  /**
   * Function to handle delete client item and display related confirmation modal.
   * @param index
   */
  const deleteClientHandler = ({ itemIndex, currentPage, postPerPage }: IDeleteHandler) => {
    const currentIndex = findCurrentItemIndex(itemIndex, currentPage, postPerPage);
    setDeleteItemIndex(currentIndex);
    dispatch(openModal(MODAL_TYPES.DELETE));
  };

  /**
   * Function to dispatch deleting action into firebase client data collection.
   */
  const deleteClientAction = () => {
    if (typeof deleteItemIndex === 'undefined') return;
    const currentClient = clientList[deleteItemIndex];
    if (currentClient.id) dispatch(deleteClient(currentClient.id));
    clientListHandler(clientList.filter((c) => c.id !== currentClient.id));
    initialClientState();
    dispatch(closeModal());
  };

  /**
   * Function to cancel deleting action.
   */
  const cancelDeleteClientAction = () => {
    initialClientState();
    dispatch(closeModal());
  };

  /**
   * Function to restore initial status.
   */
  const initialClientState = () => {
    setIsEditing(false);
    setEditedItemIndex(undefined);
    setDeleteItemIndex(undefined);
  };

  React.useEffect(() => setClientList(clients), [clients]);

  return (
    <CalenderWrapper>
      <ClientHeader>Najemcy</ClientHeader>
      {(errorClient || errorUser) && <ErrorMsgServer innerText={errorClient || errorUser} />}
      <RecordsActionContent>
        <SearchInputField
          type="clients"
          placeholder="Wyszukaj najemce"
          searchContent={clients}
          searchProperty="name"
          searchContentHandler={clientListHandler}
        />
        {adminCredentials(user) && (
          <OpenClientModalButton onClick={() => dispatch(openModal(MODAL_TYPES.CLIENT))}>
            Dodaj nowego najemcę
          </OpenClientModalButton>
        )}
      </RecordsActionContent>
      <MultipleRecords
        isAdmin={adminCredentials(user)}
        isEmployee={user?.isEmployee || false}
        headers={RECORDS_CLIENTS_HEADERS}
        recordProperty={RECORDS_CLIENTS_ROW}
        recordPropertyDetails={RECORDS_CLIENTS_ROW_DETAILS}
        recordPropertyDisplayMap={RECORDS_CLIENTS_DETAILS_PROPERTY_MAP}
        conflicts={[]}
        records={clientList}
        editHandler={editClientHandler}
        deleteHandler={deleteClientHandler}
        emptyText="Nie ma żadnego dodanego klient do bazy danych."
      />
      {isOpen && (
        <Modal>
          {type === MODAL_TYPES.CLIENT && (
            <ClientForm
              isEditing={isEditing}
              editedItemIndex={editedItemIndex}
              initialEditingState={initialClientState}
              clientList={clientList}
            />
          )}
          {type === MODAL_TYPES.DELETE && (
            <ModalDelete
              message="Czy na pewno chcesz skasować tego klienta"
              callback={deleteClientAction}
              cancelCallback={cancelDeleteClientAction}
            />
          )}
          {type === MODAL_TYPES.SUCCESS && <ModalInfo header="Klienci" />}
          {type === MODAL_TYPES.ERROR && <ModalInfo header="Klienci" />}
        </Modal>
      )}
    </CalenderWrapper>
  );
};

export default Clients;
