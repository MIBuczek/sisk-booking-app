import Button from 'components/atoms/Button';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import MultipleRecords from 'components/atoms/MultipleRecords';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import TextInputField from 'components/atoms/TextInputField';
import { IClient, IReduxState } from 'models';
import { IClientForm } from 'models/forms/client-form-model';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addClient, deleteClient, updateClient } from 'store';
import styled from 'styled-components';
import { CLIENT_TYPE, generateSelectDefaultValue } from 'utils';
import { CLIENT_INITIAL_VALUE } from 'utils/variables/form-const';

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

const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
  button {
    margin: 0 0 0 0.8rem;
  }
`;

const ClientSelectWrapper = styled(SelectWrapper)`
  margin-top: 0;
`;

const ModalClient = (): JSX.Element => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItemId, setEditedItemId] = React.useState<string | undefined>(undefined);

  const dispatch = useDispatch();
  const { clients } = useSelector((state: IReduxState) => state.clientStore);

  const { handleSubmit, errors, control, reset, watch } = useForm<IClientForm>();

  const clientType = watch('type');

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
        <ClientSelectWrapper>
          <Label>Typ klienta</Label>
          <Controller
            name="type"
            defaultValue={CLIENT_TYPE[0]}
            control={control}
            rules={{ required: true }}
            render={({ onChange, onBlur, value }) => (
              <SelectInputField
                options={CLIENT_TYPE}
                styles={customStyles(!!errors.type)}
                placeholder="Wybierz"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                defaultValue={CLIENT_TYPE[0]}
              />
            )}
          />
          {errors.type && (
            <ErrorMsg>
              Pole nie moze byc puste <BsExclamationCircle />
            </ErrorMsg>
          )}
        </ClientSelectWrapper>
        <Label>{clientType?.value === 'company' ? 'Nazwa firmy' : 'Imie i nazwisko'}</Label>
        <Controller
          name="name"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <TextInputField
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.name}
              className="input"
              placeholder="Wpisz"
            />
          )}
        />
        {errors.name && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        {clientType?.value === 'company' && (
          <>
            <Label>NIP</Label>
            <Controller
              name="nip"
              defaultValue={''}
              control={control}
              rules={{ required: true }}
              render={({ onChange, onBlur, value }) => (
                <TextInputField
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  invalid={!!errors.nip}
                  className="input"
                  placeholder="Wpisz"
                />
              )}
            />
            {errors.nip && (
              <ErrorMsg>
                Pole nie moze byc puste <BsExclamationCircle />
              </ErrorMsg>
            )}
          </>
        )}
        <Label>Telefon</Label>
        <Controller
          name="phone"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <TextInputField
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.phone}
              className="input"
              placeholder="Wpisz"
            />
          )}
        />
        {errors.phone && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>E-mail</Label>
        <Controller
          name="email"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <TextInputField
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.email}
              className="input"
              placeholder="Wpisz"
            />
          )}
        />
        {errors.email && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
      </ClientInnerContent>
      <ClientInnerContent>
        {clientType?.value === 'company' && (
          <>
            <Label>Osoba kontaktowa</Label>
            <Controller
              name="contactPerson"
              defaultValue={''}
              control={control}
              rules={{ required: true }}
              render={({ onChange, onBlur, value }) => (
                <TextInputField
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  invalid={!!errors.contactPerson}
                  className="input"
                  placeholder="Wpisz"
                />
              )}
            />
            {errors.contactPerson && (
              <ErrorMsg>
                Pole nie moze byc puste <BsExclamationCircle />
              </ErrorMsg>
            )}
          </>
        )}
        <Label>Ulica</Label>
        <Controller
          name="street"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <TextInputField
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.street}
              className="input"
              placeholder="Wpisz"
            />
          )}
        />
        {errors.street && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>Miasto</Label>
        <Controller
          name="city"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <TextInputField
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.city}
              className="input"
              placeholder="Wpisz"
            />
          )}
        />
        {errors.city && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>Kod pocztowy</Label>
        <Controller
          name="zipCode"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <TextInputField
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.zipCode}
              className="input"
              placeholder="Wpisz"
            />
          )}
        />
        {errors.zipCode && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <ButtonPanel>
          <Button secondary onClick={createInitialState}>
            Anuluj
          </Button>
          <Button onClick={onSubmit}>{isEditing ? 'Zapisz' : 'Dodaj'}</Button>
        </ButtonPanel>
      </ClientInnerContent>
    </ClientWrapper>
  );
};

export default ModalClient;
