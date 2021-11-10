import Header from 'components/atoms/Header';
import MultipleRecords from 'components/atoms/MultipleRecords';
import { IClient, IReduxState } from 'models';
import { IClientForm } from 'models/forms/client-form-model';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addClient, deleteClient, updateClient } from 'store';
import styled from 'styled-components';
import { generateSelectDefaultValue } from 'utils';
import { CLIENT_INITIAL_VALUE } from 'utils/variables/form-const';

const ClientWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 40px;
  justify-content: space-between;
  max-width: 920px;
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
  align-items: flex-start;
  padding: 0 40px 0 20px;
  &:first-of-type {
    border-right: ${({ theme }) => `1px solid ${theme.green}`};
  }
`;

const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
  button {
    margin-left: 0.8rem;
  }
`;

const ModalClient = (): JSX.Element => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItemId, setEditedItemId] = React.useState<string | undefined>(undefined);

  const dispatch = useDispatch();
  const { clients } = useSelector((state: IReduxState) => state.clientStore);

  const { handleSubmit, errors, control, reset } = useForm<IClientForm>();

  const onSubmit = handleSubmit<IClientForm>(async (cred) => {
    const clientData = {
      ...cred,
      type: cred.type.value,
      id: editedItemId || clients?.length.toString()
    } as IClient;

    if (isEditing && editedItemId) {
      dispatch(updateClient(clientData));
    } else dispatch(addClient(clientData));

    createInitialState();
  });

  const editClientHandler = (index: number) => {
    const currentClient = clients[index];
    reset({ ...currentClient, type: generateSelectDefaultValue(currentClient.type) });
    setIsEditing(true);
    setEditedItemId(currentClient.id);
  };

  const deleteClientHandler = (index: number) => {
    const currentClient = clients[index];
    if (currentClient.id) dispatch(deleteClient(currentClient.id));
    createInitialState();
  };

  const createInitialState = () => {
    reset(CLIENT_INITIAL_VALUE);
    setIsEditing(false);
    setEditedItemId(undefined);
  };

  return (
    <ClientWrapper>
      <ClientHeader>Klienci</ClientHeader>
      <ClientInnerContent>
        <ClientSubHeader>Lista klientow</ClientSubHeader>
        <MultipleRecords
          records={clients?.map((c) => c.name)}
          editHandler={editClientHandler}
          deleteHandler={deleteClientHandler}
          emptyText="Nie został dodany żaden klient do bazy danych"
        />
      </ClientInnerContent>
      <ClientInnerContent>
        <ClientSubHeader>Dodaj nowy klienta</ClientSubHeader>
      </ClientInnerContent>
    </ClientWrapper>
  );
};

export default ModalClient;
