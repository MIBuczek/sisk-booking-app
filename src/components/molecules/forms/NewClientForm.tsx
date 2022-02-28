import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import TextInputField from 'components/atoms/TextInputField';
import { CLIENT_INITIAL_VALUE, CLIENT_OPTIONS, CLIENT_TYPE, createSelectedOption } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { IClient, IReduxState } from 'models';
import { IClientForm } from 'models/forms/client-form-model';
import { addClient, closeModal, updateClient } from 'store';
import ConfirmAction from '../ConfirmAction';

const ClientWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
  max-width: 1200px;
`;

const ClientSubHeader = styled(Header)`
  font-size: ${({ theme }) => theme.fontSize.l};
  width: 85%;
  margin: 15px 0 25px;
`;

const ClientInnerContent = styled.article`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 40px 20px 20px;
  &:first-of-type {
    border-right: ${({ theme }) => `1px solid ${theme.green}`};
  }
`;

const ClientSelectWrapper = styled(SelectWrapper)`
  margin-top: 0;
`;

const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 85%;
  margin: 3rem 0;
  button {
    margin: 0 0 0 0.8rem;
  }
`;

interface NewClientFormProps {
  isEditing: boolean;
  editedItemIndex?: number;
  initialEditingState: () => void;
}

const NewClientForm: React.FunctionComponent<NewClientFormProps> = ({
  isEditing,
  editedItemIndex,
  initialEditingState
}) => {
  const [clientData, setClientData] = React.useState<IClient | undefined>(undefined);
  const [clientId, setClientId] = React.useState<string | undefined>(undefined);
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);

  const dispatch = useDispatch();
  const { clients } = useSelector((state: IReduxState) => state.clientStore);
  const { handleSubmit, errors, control, reset, watch } = useForm<IClientForm>();

  const clientType = watch('type');

  React.useEffect(() => {
    if (isEditing && typeof editedItemIndex === 'number') {
      editClientHandler(editedItemIndex);
    } else {
      createInitialState();
    }
  }, [isEditing]);

  const onSubmit = handleSubmit<IClientForm>(async (cred) => {
    setClientData({
      ...cred,
      type: cred.type.value
    } as IClient);
    setDisplayConfirmation(true);
  });

  const confirmSubmit = () => {
    if (!clientData) return;
    if (clientId) {
      dispatch(updateClient({ ...clientData, id: clientId }));
    } else dispatch(addClient(clientData));

    createInitialState();
    dispatch(closeModal());
  };

  const editClientHandler = (index: number) => {
    const currentClient = clients[index];
    reset({ ...currentClient, type: createSelectedOption(currentClient.type, CLIENT_OPTIONS) });
    setClientId(currentClient.id);
  };

  const createInitialState = () => {
    reset(CLIENT_INITIAL_VALUE);
    setClientId(undefined);
    setClientData(undefined);
    initialEditingState();
    setDisplayConfirmation(false);
  };

  const cancelHandler = () => {
    createInitialState();
    dispatch(closeModal());
  };

  return (
    <ClientWrapper>
      <ClientSubHeader>
        {isEditing ? 'Edytuj istniejeacego najemce' : 'Dodaj nowy najemce'}
      </ClientSubHeader>
      <ClientInnerContent>
        <ClientSelectWrapper>
          <Label>Typ klienta</Label>
          <Controller
            name="type"
            defaultValue={CLIENT_OPTIONS[0]}
            control={control}
            rules={{ required: true }}
            render={({ onChange, onBlur, value }) => (
              <SelectInputField
                options={CLIENT_OPTIONS}
                styles={customStyles(!!errors.type)}
                placeholder="Wybierz"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                value={value}
                defaultValue={CLIENT_OPTIONS[0]}
                isDisabled={displayConfirmation}
              />
            )}
          />
          {errors.type && <ErrorMsg innerText="Pole nie może byc puste" />}
        </ClientSelectWrapper>
        <Label>
          {clientType?.value === CLIENT_TYPE.COMPANY ? 'Nazwa firmy' : 'Imie i nazwisko'}
        </Label>
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.name && <ErrorMsg innerText="Pole nie moze byc puste" />}
        {clientType?.value === CLIENT_TYPE.COMPANY && (
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
                  disabled={displayConfirmation}
                />
              )}
            />
            {errors.nip && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.phone && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.email && <ErrorMsg innerText="Pole nie moze byc puste" />}
      </ClientInnerContent>
      <ClientInnerContent>
        {clientType?.value === CLIENT_TYPE.COMPANY && (
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
                  disabled={displayConfirmation}
                />
              )}
            />
            {errors.contactPerson && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.street && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.city && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.zipCode && <ErrorMsg innerText="Pole nie moze byc puste" />}
      </ClientInnerContent>
      {displayConfirmation ? (
        <ConfirmAction
          message="Czy napewno chcesz dodac nowego klienta do bazy"
          callback={confirmSubmit}
          cancelCallback={() => setDisplayConfirmation(false)}
        />
      ) : (
        <ButtonPanel>
          <Button secondary onClick={cancelHandler}>
            Anuluj
          </Button>
          <Button onClick={onSubmit}>{isEditing ? 'Zapisz' : 'Dodaj'}</Button>
        </ButtonPanel>
      )}
    </ClientWrapper>
  );
};

export default NewClientForm;
