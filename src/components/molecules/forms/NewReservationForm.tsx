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

registerLocale('pl', pl);

const ReservationWrapper = styled.form`
  padding: 20px;
  max-width: 670px;
  display: flex;
  flex-wrap: wrap;
  button {
    align-self: flex-end;
  }
`;

const ReservationHeader = styled(Header)`
  width: 100%;
  margin: 20px 0 40px;
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
  margin: 10px;
`;

const MessageTextArea = styled(TextAreaField)`
  width: 100%;
  margin: 10px;
`;

const ButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;

interface NewReservationFormProps {
  mainState: IMainState;
  isAdmin: boolean;
  isEditing: boolean;
  editedItemIndex?: number;
  initialEditingState: () => void;
}

const NewReservationForm: React.FunctionComponent<NewReservationFormProps> = ({
  mainState,
  isAdmin,
  isEditing,
  editedItemIndex,
  initialEditingState
}) => {
  const [bookingId, setBookingId] = React.useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = React.useState(SIZE_OPTIONS['1/1']);
  const [sizeOptions, setSizeOptions] = React.useState(SIZE_OPTIONS_BTN);
  const [police, setPolice] = React.useState<boolean>(false);
  const { city, building } = mainState;

  const dispatch = useDispatch();
  const { bookings } = useSelector((state: IReduxState) => state.bookingStore);
  const { handleSubmit, errors, control, watch, reset } = useForm<IBookingForm>({
    defaultValues: { ...BOOKING_INITIAL_VALUE, ...mainState }
  });

  const cityValue = watch('city');
  const buildingValue = watch('building');
  const regularValue = watch('regular');

  const selectedSizeHandler = (e: Event, value: SIZE_OPTIONS): void => {
    e.preventDefault();
    setSelectedSize(value);
  };

  const selectBuildingOptions = (): TSelect[] => {
    if (!cityValue) return [building];
    // reset({
    //   ...BOOKING_INITIAL_VALUE,
    //   building: BUILDINGS_OPTIONS[cityValue.value][0]
    // });
    return BUILDINGS_OPTIONS[cityValue.value];
  };

  const selectSizeFieldOptions = (): void => {
    if (buildingValue && cityValue)
      setSizeOptions(SIZE_FIELD_OPTIONS[cityValue.value][buildingValue.value]);
  };

  const onSubmit = handleSubmit<IBookingForm>(async (cred) => {
    const bookingData = {
      ...cred,
      city: cred.city.value,
      building: cred.building.value,
      type: CLIENT_TYPE.CLIENT,
      size: selectedSize,
      accepted: false,
      id: bookingId || bookings?.length.toString()
    } as IBooking;
    if (bookingId) dispatch(updateBooking(bookingData));
    else dispatch(addBooking(bookingData));
    dispatch(closeModal());
  });

  const editBookingHandler = (index: number) => {
    const currentBooking = bookings[index];
    reset({
      ...currentBooking,
      city: createSelectedOption(currentBooking.city, CITY_OPTIONS),
      building: createSelectedOption(currentBooking.building, BUILDINGS_OPTIONS[city.value])
    });
    setBookingId(currentBooking.id);
  };

  const createInitialState = () => {
    reset({ ...BOOKING_INITIAL_VALUE, ...mainState });
    setBookingId(undefined);
    initialEditingState();
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
    <ReservationWrapper onSubmit={onSubmit}>
      <ReservationHeader>
        {isAdmin ? 'Dodaj nowa rezerwacje' : ' Wyślij prośbę o rezerwacje'}
      </ReservationHeader>
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
              isDisabled={!cityValue}
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
            />
          )}
        />
        {errors.phone && <ErrorMsg innerText="Pole nie moze byc puste" />}
      </InputContainer>
      <InputContainer>
        <Label>{`${regularValue ? 'Od kiedy' : 'Kiedy'} chciałby zarezerwować obiekt`}</Label>
        <Controller
          name="when"
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
              invalid={!!errors.when}
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
            />
          )}
        />
        {errors.when && <ErrorMsg innerText="Pole nie moze byc puste" />}
        {regularValue && (
          <>
            <Label>Do kiedy chciałby zarezerwować obiekt</Label>
            <Controller
              name="whenEnd"
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
                  invalid={!!errors.whenEnd}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
            {errors.whenEnd && <ErrorMsg innerText="Pole nie moze byc puste" />}
          </>
        )}
        <Label>Od której godziny</Label>
        <Controller
          name="start"
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
              invalid={!!errors.start}
              timeIntervals={15}
              timeCaption="Godzina"
              dateFormat="h:mm aa"
              locale="pl"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
            />
          )}
        />
        {errors.start && <ErrorMsg innerText="Pole nie moze byc puste" />}
        <Label>Do której godziny</Label>
        <Controller
          name="end"
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
              invalid={!!errors.end}
              timeIntervals={15}
              timeCaption="Godzina"
              dateFormat="h:mm aa"
              locale="pl"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
            />
          )}
        />
        {errors.end && <ErrorMsg innerText="Pole nie moze byc puste" />}
      </InputContainer>
      <Label>Chciałbyś przesłać dodatkowe informacje </Label>
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
          />
        )}
      />
      {!isAdmin && (
        <RodoWrapper>
          <Checkbox
            checked={police}
            className="checkbox"
            name="police"
            changeHandler={() => setPolice(!police)}
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
      <Button
        role="button"
        onClick={onSubmit}
        disabled={isAdmin ? false : !police}
        style={{ marginLeft: 'auto' }}
      >
        {isAdmin ? `${isEditing ? 'Zapisz' : 'Dodaj'} rezerwacje` : 'Wyślij Rezerwacje'}
      </Button>
    </ReservationWrapper>
  );
};

export default NewReservationForm;
