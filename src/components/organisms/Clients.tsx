import Button from 'components/atoms/Button';
import Header from 'components/atoms/Header';
import MultipleRecords from 'components/atoms/MultipleRecords';
import NewClientForm from 'components/molecules/forms/NewClientForm';
import { IBooking, IClient, instanceOfClients, IReduxState } from 'models';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, deleteClient, openModal } from 'store';
import styled from 'styled-components';
import {
  adminCredentials,
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

const OpenClientModalButton = styled(Button)`
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

const Clients = () => {
  const [clientList, setClientList] = React.useState<IClient[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItemIndex, setEditedItemIndex] = React.useState<number | undefined>(undefined);
  const [deleteItemIndex, setDeleteItemIndex] = React.useState<number | undefined>(undefined);

  const dispatch = useDispatch();

  const {
    clientStore: { clients },
    currentUserStore: { user },
    modal: { isOpen, type }
  } = useSelector((state: IReduxState) => state);

  const editClientHandler = (index: number, editHandler: boolean) => {
    setIsEditing(true);
    setEditedItemIndex(index);
    dispatch(openModal(MODAL_TYPES.CLIENT));
  };

  const deleteClientHandler = (index: number) => {
    setDeleteItemIndex(index);
    dispatch(openModal(MODAL_TYPES.DELETE));
  };

  const deleteClientAction = () => {
    if (typeof deleteItemIndex === 'undefined') return;
    const currentClient = clients[deleteItemIndex];
    if (currentClient.id) dispatch(deleteClient(currentClient.id));
    clientListHandler(clients.filter((c) => c.id !== currentClient.id));
    initialClientState();
    dispatch(closeModal());
  };

  const cancelDeleteClientAction = () => {
    initialClientState();
    dispatch(closeModal());
  };

  const initialClientState = () => {
    setIsEditing(false);
    setEditedItemIndex(undefined);
    setDeleteItemIndex(undefined);
  };

  const clientListHandler = (searchResults: (IClient | IBooking)[]): void => {
    if (searchResults.length && instanceOfClients(searchResults)) {
      setClientList(searchResults);
    }
  };

  React.useEffect(() => setClientList(clients), [clients]);

  return (
    <CalenderWrapper>
      <ClientHeader>Lista Najemcy</ClientHeader>
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
            Dodaj nowego najemce
          </OpenClientModalButton>
        )}
      </RecordsActionContent>
      <MultipleRecords
        isAdmin={adminCredentials(user)}
        isEmployee={user?.isEmployee || false}
        headers={RECORDS_CLIENTS_HEADERS}
        dataProperty={RECORDS_CLIENTS_ROW}
        dataPropertyDetails={RECORDS_CLIENTS_ROW_DETAILS}
        dataPropertyDisplayMap={RECORDS_CLIENTS_DETAILS_PROPERTY_MAP}
        records={clientList}
        editHandler={editClientHandler}
        deleteHandler={deleteClientHandler}
        emptyText="Nie ma żadnego dodanego klient do bazy danych."
      />
      {isOpen && (
        <Modal>
          {type === MODAL_TYPES.CLIENT && (
            <NewClientForm
              isEditing={isEditing}
              editedItemIndex={editedItemIndex}
              initialEditingState={initialClientState}
            />
          )}
          {type === MODAL_TYPES.DELETE && (
            <ModalDelete
              message="Czy na pewno chcesz skazować tego klienta"
              callback={deleteClientAction}
              cancelCallback={cancelDeleteClientAction}
            />
          )}
          {type === MODAL_TYPES.SUCCESS && <ModalInfo header="Klienci" />}
        </Modal>
      )}
    </CalenderWrapper>
  );
};

export default Clients;
