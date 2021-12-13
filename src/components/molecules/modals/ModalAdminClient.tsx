import * as React from 'react';
import Header from 'components/atoms/Header';
import MultipleRecords from 'components/atoms/MultipleRecords';
import { IReduxState } from 'models';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient } from 'store';
import styled from 'styled-components';
import { RECORDS_CLIENTS_HEADERS, RECORDS_CLIENTS_ROW } from 'utils';
import NewClientForm from '../forms/NewClientForm';

const ClientWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 40px 80px;
  justify-content: space-between;
  max-width: 1320px;
`;

const ClientHeader = styled(Header)`
  width: 100%;
  margin: 20px 0 40px 20px;
`;

const ClientSubHeader = styled(Header)`
  font-size: ${({ theme }) => theme.fontSize.m};
  width: 100%;
  margin: 15px 0 25px;
`;

const ClientInnerContent = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0 40px 0 20px;
  &:first-of-type {
    border-right: ${({ theme }) => `1px solid ${theme.green}`};
  }
`;

const ModalClient = (): JSX.Element => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItemIndex, setEditedItemIndex] = React.useState<number | undefined>(undefined);

  const dispatch = useDispatch();
  const { clients } = useSelector((state: IReduxState) => state.clientStore);

  const editClientHandler = (index: number) => {
    setIsEditing(true);
    setEditedItemIndex(index);
  };

  const deleteClientHandler = (index: number) => {
    const currentClient = clients[index];
    if (currentClient.id) dispatch(deleteClient(currentClient.id));
    initialEditingState();
  };

  const initialEditingState = () => {
    setIsEditing(false);
    setEditedItemIndex(undefined);
  };

  return (
    <ClientWrapper>
      <ClientHeader>Klienci</ClientHeader>
      <ClientInnerContent>
        <ClientSubHeader>Lista klientow</ClientSubHeader>
        <MultipleRecords
          title="clients"
          headers={RECORDS_CLIENTS_HEADERS}
          dataProperty={RECORDS_CLIENTS_ROW}
          records={clients}
          editHandler={editClientHandler}
          deleteHandler={deleteClientHandler}
          emptyText="Nie został dodany żaden klient do bazy danych"
        />
      </ClientInnerContent>
      <NewClientForm
        isEditing={isEditing}
        editedItemIndex={editedItemIndex}
        initialEditingState={initialEditingState}
      />
    </ClientWrapper>
  );
};

export default ModalClient;
