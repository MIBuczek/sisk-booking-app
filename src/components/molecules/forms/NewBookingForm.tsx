/* eslint-disable import/no-duplicates */
import { IBooking, IMainState, IReduxState, TSelect } from 'models';
import { IBookingForm } from 'models/forms/booking-form-models';
import * as React from 'react';
import { registerLocale } from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking, closeModal, updateBooking } from 'store';
import styled from 'styled-components';
import {
  BOOKING_INITIAL_VALUE,
  BUILDINGS_OPTIONS,
  CITY_OPTIONS,
  CLIENT_TYPE,
  createSelectedOption,
  generateBookingDetails,
  generateBookingFormDetails,
  SIZE_FIELD_OPTIONS,
  SIZE_OPTIONS,
  SIZE_OPTIONS_BTN
} from 'utils';
import Header from 'components/atoms/Header';
import TextAreaField from 'components/atoms/TextAreaField';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import Label from 'components/atoms/Label';
import ErrorMsg from 'components/atoms/ErrorMsg';
import ButtonGroup from 'components/atoms/ButtonGroup';
import Checkbox from 'components/atoms/Checkbox';
import TextInputField from 'components/atoms/TextInputField';
import { DataPickerField } from 'components/atoms/DatapickerField';
import Anchor from 'components/atoms/Anchor';
import Button from 'components/atoms/Button';
import pl from 'date-fns/locale/pl';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import ConfirmAction from '../ConfirmAction';

registerLocale('pl', pl);

const BookingWrapper = styled.form`
  max-width: 670px;
  display: flex;
  flex-wrap: wrap;
  button {
    align-self: flex-end;
  }
`;

const BookingHeader = styled(Header)`
  width: 100%;
  margin: 20px 0 40px;
  padding: 0 20px;
  &:after {
    left: 20px;
  }
`;

const InputContainer = styled.div`
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RodoWrapper = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  margin: 10px 20px;
`;

const AcceptWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.green};
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const TextAreaLabel = styled(Label)`
  margin: 10px 20px;
`;

const MessageTextArea = styled(TextAreaField)`
  width: 100%;
  margin: 10px 20px;
`;

const ButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;

const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin: 3rem 20px;
  button {
    margin: 0 0 0 0.8rem;
  }
`;

interface NewBookingFormProps {
  mainState: IMainState;
  isAdmin: boolean;
  isEditing: boolean;
  editedItemIndex?: number;
  initialEditingState: () => void;
}

const NewBookingForm: React.FunctionComponent<NewBookingFormProps> = ({
  mainState,
  isAdmin,
  isEditing,
  editedItemIndex,
  initialEditingState
}) => {
  const [bookingData, setBookingData] = React.useState<IBooking | undefined>(undefined);
  const [bookingId, setBookingId] = React.useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = React.useState(SIZE_OPTIONS['1/1']);
  const [sizeOptions, setSizeOptions] = React.useState(SIZE_OPTIONS_BTN);
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
  const [police, setPolice] = React.useState<boolean>(false);

  const { city, building } = mainState;

  const dispatch = useDispatch();
  const {
    bookingStore: { bookings },
    clientStore: { clients }
  } = useSelector((state: IReduxState): IReduxState => state);

  const { handleSubmit, errors, control, watch, reset } = useForm<IBookingForm>({
    defaultValues: { ...BOOKING_INITIAL_VALUE, ...mainState }
  });

  const cityValue = watch('city');
  const buildingValue = watch('building');
  const regularValue = watch('regular');
  const selectedClientId = watch('clientId');

  const selectedSizeHandler = (e: Event, value: SIZE_OPTIONS): void => {
    e.preventDefault();
    setSelectedSize(value);
  };

  const selectBuildingOptions = (): TSelect[] => {
    if (!cityValue) return [building];
    return BUILDINGS_OPTIONS[cityValue.value];
  };

  const selectSizeFieldOptions = (): void => {
    if (buildingValue && cityValue)
      setSizeOptions(SIZE_FIELD_OPTIONS[cityValue.value][buildingValue.value]);
  };

  const selectClientOptions = (): TSelect[] => {
    if (!clients) return [];
    return clients.map((c) => ({ label: c.name, value: c.id || '' }));
  };

  const onSubmit = handleSubmit<IBookingForm>(async (cred) => {
    setBookingData(generateBookingDetails(cred, selectedSize, bookingId));
    setDisplayConfirmation(true);
  });

  const confirmSubmit = () => {
    if (!bookingData) return;

    if (bookingId) dispatch(updateBooking({ ...bookingData, id: bookingId }));
    else dispatch(addBooking(bookingData));

    createInitialState();
    dispatch(closeModal());
  };

  const editBookingHandler = (index: number) => {
    const currentBooking = bookings[index];
    const clientId = selectClientOptions().find((o) => o.value === currentBooking.clientId);
    reset(generateBookingFormDetails(currentBooking, clientId, city));
    setBookingId(currentBooking.id);
  };

  const createInitialState = () => {
    reset({ ...BOOKING_INITIAL_VALUE, ...mainState });
    setBookingId(undefined);
    initialEditingState();
    setDisplayConfirmation(false);
    setBookingData(undefined);
  };

  const cancelHandler = () => {
    createInitialState();
    dispatch(closeModal());
  };

  const fillUpFormWithClientData = (cID?: string): void => {
    const selectedClient = clients.find((c) => c.id === cID);
    if (!selectedClient) return;
    if (typeof editedItemIndex === 'number') {
      const currentBooking = bookings[editedItemIndex];
      const clientId = selectClientOptions().find((o) => o.value === currentBooking.clientId);
      reset({
        ...generateBookingFormDetails(currentBooking, clientId, city),
        person: selectedClient?.name,
        email: selectedClient?.email,
        phone: selectedClient?.phone
      });
    }
  };

  React.useEffect(() => {
    selectSizeFieldOptions();
  }, [cityValue, buildingValue]);

  React.useEffect(() => {
    if (isEditing && typeof editedItemIndex === 'number') {
      editBookingHandler(editedItemIndex);
    } else {
      createInitialState();
    }
  }, [isEditing]);

  return (
    <BookingWrapper onSubmit={onSubmit}>
      <BookingHeader>
        {isAdmin ? 'Dodaj nowa rezerwacje' : ' Wyślij prośbę o rezerwacje'}
      </BookingHeader>
      {isAdmin && (
        <AcceptWrapper>
          <SelectWrapper>
            <Label>Dodaj najemce</Label>
            <Controller
              name="clientId"
              control={control}
              render={({ onChange, onBlur, value }) => (
                <SelectInputField
                  options={selectClientOptions()}
                  placeholder="Wybierz"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  value={value}
                  isDisabled={displayConfirmation}
                />
              )}
            />
          </SelectWrapper>
          <SelectWrapper>
            <Label>Zakceptuj rezerwacje</Label>
            <Controller
              name="accepted"
              defaultValue={false}
              control={control}
              rules={{ required: true }}
              render={({ onChange, value }) => (
                <Checkbox
                  checked={value}
                  className="checkbox"
                  name="accepted"
                  changeHandler={onChange}
                  disabled={displayConfirmation}
                />
              )}
            />
            {errors.accepted && <ErrorMsg innerText="Pole nie moze byc nie zaznaczone" />}
          </SelectWrapper>
        </AcceptWrapper>
      )}
      <SelectWrapper>
        <Label>Miejscowość</Label>
        <Controller
          name="city"
          defaultValue={city}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <SelectInputField
              options={CITY_OPTIONS}
              styles={customStyles(!!errors.city)}
              placeholder="Wybierz"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              value={value}
              defaultValue={city}
              isDisabled={displayConfirmation}
            />
          )}
        />
        {errors.city && <ErrorMsg innerText="Pole nie moze byc puste" />}
      </SelectWrapper>
      <SelectWrapper>
        <Label>Obiekt</Label>
        <Controller
          name="building"
          defaultValue={building}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <SelectInputField
              options={selectBuildingOptions()}
              styles={customStyles(!!errors.building)}
              placeholder="Wybierz"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              value={value}
              isDisabled={!cityValue || displayConfirmation}
              defaultValue={building}
            />
          )}
        />
        {errors.building && <ErrorMsg innerText="Pole nie moze byc puste" />}
      </SelectWrapper>
      <ButtonWrapper>
        <ButtonGroup
          options={sizeOptions}
          value={selectedSize}
          optionsHandler={selectedSizeHandler}
          disabled={displayConfirmation}
        />
      </ButtonWrapper>
      <SelectWrapper>
        <RodoWrapper>
          <Label>Czy jest to rezerwacja cykliczna</Label>
          <Controller
            name="regular"
            defaultValue={false}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Checkbox
                checked={value}
                className="checkbox"
                name="regular"
                changeHandler={onChange}
                disabled={displayConfirmation}
              />
            )}
          />
        </RodoWrapper>
      </SelectWrapper>
      <InputContainer>
        <Label>Imie i nazwisko</Label>
        <Controller
          name="person"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <TextInputField
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.person}
              className="input"
              placeholder="Wpisz"
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.person && <ErrorMsg innerText="Pole nie moze byc puste" />}
        <Label>Adres e-mail</Label>
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
        <Label>Podaj numer telefonu</Label>
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
              placeholder="000-000-000"
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.phone && <ErrorMsg innerText="Pole nie moze byc puste" />}
      </InputContainer>
      <InputContainer>
        <Label>{`${regularValue ? 'Od kiedy' : 'Kiedy'} chciałby zarezerwować obiekt`}</Label>
        <Controller
          name="startDate"
          defaultValue={new Date()}
          control={control}
          rules={{ required: true }}
          render={({ value, onChange, onBlur }) => (
            <DataPickerField
              showTimeSelect={false}
              isClearable
              shouldCloseOnSelect
              placeholderText="Wybierz"
              locale="pl"
              minDate={new Date()}
              invalid={!!errors.startDate}
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.startDate && <ErrorMsg innerText="Pole nie moze byc puste" />}
        {regularValue && (
          <>
            <Label>Do kiedy chciałby zarezerwować obiekt</Label>
            <Controller
              name="endDate"
              defaultValue={new Date()}
              control={control}
              rules={{ required: true }}
              render={({ value, onChange, onBlur }) => (
                <DataPickerField
                  showTimeSelect={false}
                  isClearable
                  shouldCloseOnSelect
                  placeholderText="Wybierz"
                  locale="pl"
                  minDate={new Date()}
                  invalid={!!errors.endDate}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  disabled={displayConfirmation}
                />
              )}
            />
            {errors.endDate && <ErrorMsg innerText="Pole nie moze byc puste" />}
          </>
        )}
        <Label>Od której godziny</Label>
        <Controller
          name="startHour"
          defaultValue={null}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <DataPickerField
              placeholderText="Wybierz"
              showTimeSelect
              showTimeSelectOnly
              isClearable
              shouldCloseOnSelect
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 30), 22)}
              invalid={!!errors.startHour}
              timeIntervals={15}
              timeCaption="Godzina"
              dateFormat="h:mm aa"
              locale="pl"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.startHour && <ErrorMsg innerText="Pole nie moze byc puste" />}
        <Label>Do której godziny</Label>
        <Controller
          name="endHour"
          defaultValue={null}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <DataPickerField
              placeholderText="Wybierz"
              showTimeSelect
              showTimeSelectOnly
              isClearable
              shouldCloseOnSelect
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 30), 22)}
              invalid={!!errors.endHour}
              timeIntervals={15}
              timeCaption="Godzina"
              dateFormat="h:mm aa"
              locale="pl"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.endHour && <ErrorMsg innerText="Pole nie moze byc puste" />}
      </InputContainer>
      <TextAreaLabel>Chciałbyś przesłać dodatkowe informacje</TextAreaLabel>
      <Controller
        name="message"
        defaultValue={''}
        control={control}
        rules={{ required: false }}
        render={({ onChange, onBlur, value }) => (
          <MessageTextArea
            placeholder="Wiadomość"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={displayConfirmation}
          />
        )}
      />
      {!isAdmin && (
        <RodoWrapper>
          <Checkbox
            checked={police}
            className="checkbox"
            name="police"
            changeHandler={() => setPolice(displayConfirmation ? police : !police)}
            disabled={displayConfirmation}
          />
          <Anchor
            small
            href="http://www.sisk-siechnice.pl/wp-content/uploads/2019/09/Klauzula-informacyjna-do-formularza-kontaktowego-SISK.pdf"
            target="_blank"
          >
            Klauzula informacyjna do formularza kontaktowego o przetwarzaniu danych osobowych
          </Anchor>
        </RodoWrapper>
      )}
      {displayConfirmation ? (
        <ConfirmAction
          message={
            isEditing
              ? 'Czy napewno chcesz zaktualizowac rezerwacje'
              : 'Czy napewno chcesz wysłać prośbe o rezerwacje'
          }
          callback={confirmSubmit}
          cancelCallback={() => setDisplayConfirmation(false)}
        />
      ) : (
        <ButtonPanel>
          <Button role="button" secondary onClick={cancelHandler}>
            Anuluj
          </Button>
          <Button role="button" onClick={onSubmit} disabled={isAdmin ? false : !police}>
            {isAdmin ? `${isEditing ? 'Zapisz' : 'Dodaj'} rezerwacje` : 'Wyślij Rezerwacje'}
          </Button>
        </ButtonPanel>
      )}
    </BookingWrapper>
  );
};

export default NewBookingForm;
