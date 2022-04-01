/* eslint-disable import/no-duplicates */
import { IBooking, IMainState, IReduxState, ISelectedExtraOptions, TSelect } from 'models';
import { IBookingForm } from 'models/forms/booking-form-models';
import * as React from 'react';
import { registerLocale } from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking, closeModal, updateBooking } from 'store';
import styled from 'styled-components';
import {
  BOOKING_INITIAL_VALUE,
  checkConflicts,
  CITY_OPTIONS,
  generateBookingDetails,
  generateBookingFormDetails,
  generateBuildingOptions,
  selectClientOptions,
  selectedClientIdOption,
  selectSizeFieldOptions,
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
import addMonths from 'date-fns/addMonths';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import { cloneDeep, isEmpty } from 'lodash';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import Paragraph from 'components/atoms/Paragraph';
import ConfirmAction from '../ConfirmAction';
import BookingExtraOptions from '../BookingExtraOptions';

registerLocale('pl', pl);

const BookingWrapper = styled.form`
  max-width: 670px;
  display: flex;
  flex-wrap: wrap;
  button {
    align-self: flex-end;
  }
  @media (max-width: 890px) {
    align-items: center;
    justify-content: center;
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
  @media (max-width: 890px) {
    width: 100%;
  }
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
  flex-wrap: wrap;
  @media (max-width: 890px) {
    justify-content: center;
  }
`;

const AutoFillContent = styled(SelectWrapper)`
  border: 1px solid white;
  flex-direction: row;
  width: 100%;
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

const ConflictParagraph = styled(Paragraph)`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.error};
  margin: 10px 20px;
  svg {
    margin-right: 8px;
  }
`;

interface BookingFormProps {
  mainState: IMainState;
  isAdmin: boolean;
  isEditing: boolean;
  editedItemIndex?: number;
  initialEditingState: () => void;
}

const BookingForm: React.FunctionComponent<BookingFormProps> = ({
  mainState,
  isAdmin,
  isEditing,
  editedItemIndex,
  initialEditingState
}) => {
  const [bookingData, setBookingData] = React.useState<IBooking | undefined>(undefined);
  const [extraOptions, setExtraOptions] = React.useState<ISelectedExtraOptions[]>([]);
  const [bookingId, setBookingId] = React.useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = React.useState(SIZE_OPTIONS['1/1']);
  const [sizeOptions, setSizeOptions] = React.useState(SIZE_OPTIONS_BTN);
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
  const [police, setPolice] = React.useState<boolean>(false);
  const [conflict, setConflict] = React.useState<boolean>(false);

  const { city, building } = mainState;

  const maxRangDate = new Date(`${new Date().getFullYear()}-01-01T00:01:00.676Z`);

  const dispatch = useDispatch();

  const {
    bookingStore: { bookings },
    clientStore: { clients },
    buildingStore: { buildings }
  } = useSelector((state: IReduxState): IReduxState => state);

  const { handleSubmit, errors, control, watch, reset, getValues } = useForm<IBookingForm>({
    defaultValues: { ...cloneDeep(BOOKING_INITIAL_VALUE), ...mainState }
  });

  const {
    city: cityValue,
    building: buildingValue,
    regular: regularValue,
    clientId: selectedClientId
  } = watch();

  /**
   * Function to handle selected reservation size.
   * @param e
   * @param value
   */
  const selectedSizeHandler = (e: React.MouseEvent, value: SIZE_OPTIONS | number): void => {
    e.preventDefault();
    e.stopPropagation();
    if (value in SIZE_OPTIONS) setSelectedSize(value as SIZE_OPTIONS);
  };

  /**
   * Function to get building options into dropdown related to selected city.
   * @param cv
   * @param b
   */
  const selectBuildingOptions = (cv: string, b: TSelect): TSelect[] => {
    if (!cv) return [b];
    return generateBuildingOptions(buildings)[cv];
  };

  /**
   * Function to submit actual form values into form state.
   * It will be dispatched to database it user confirm action.
   * @param cred
   */
  const onSubmit = handleSubmit<IBookingForm>(async (cred) => {
    const bookingToApprove = cloneDeep(
      generateBookingDetails(cred, selectedSize, extraOptions, bookingId)
    );
    setBookingData(bookingToApprove);
    setDisplayConfirmation(true);
    if (isAdmin) {
      setConflict(checkConflicts(bookingToApprove, bookings));
    }
  });

  /**
   * Function to confirm dispatch action. If so then add or update firebase booking collection.
   */
  const confirmSubmit = () => {
    if (!bookingData) return;

    if (bookingId) dispatch(updateBooking({ ...bookingData, id: bookingId }));
    else dispatch(addBooking(bookingData));

    createInitialState();
    dispatch(closeModal());
  };

  /**
   * Function handle edit selected booking object. It set form fields with current booking data.
   * @param index
   */
  const editBookingHandler = (index: number) => {
    const currentBooking = cloneDeep(bookings[index]);
    const clientId = selectedClientIdOption(clients, currentBooking.clientId);
    reset(generateBookingFormDetails(currentBooking, clientId, city));
    setBookingId(currentBooking.id);
    setConflict(checkConflicts(currentBooking, bookings));
  };

  /**
   * Function to restore initial status.
   */
  const createInitialState = () => {
    reset({ ...cloneDeep(BOOKING_INITIAL_VALUE), ...mainState });
    setBookingId(undefined);
    initialEditingState();
    setDisplayConfirmation(false);
    setBookingData(undefined);
    setConflict(false);
  };

  /**
   * Function handle cancel action.
   */
  const cancelHandler = () => {
    createInitialState();
    dispatch(closeModal());
  };

  /**
   * Function to update the state if admin want to assign client to current booking data.
   * If yes then fill up form fields and add client id into booking object
   */
  const fillUpFormWithClientData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cID?: string
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    const selectedClient = clients.find((c) => c.id === cID);

    if (!selectedClient) return;

    const formClientData = {
      person: selectedClient?.name,
      email: selectedClient?.email,
      phone: selectedClient?.phone
    };

    if (typeof editedItemIndex === 'number') {
      const currentBooking = bookings[editedItemIndex];
      const clientId = selectedClientIdOption(clients, currentBooking.clientId);

      reset({
        ...generateBookingFormDetails(currentBooking, clientId, city),
        ...formClientData
      });
    } else {
      const currentFormValues = getValues();
      reset({
        ...cloneDeep({ ...currentFormValues, clientId: { label: '', value: '' } }),
        ...mainState,
        ...formClientData
      });
    }
  };

  React.useEffect(() => {
    setSizeOptions(selectSizeFieldOptions(cityValue.value, buildingValue.value));
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
        {isAdmin ? 'Dodaj nową rezerwację' : ' Wyślij prośbę o rezerwację'}
      </BookingHeader>
      {isAdmin && (
        <AcceptWrapper>
          <SelectWrapper>
            <Label>Dodaj najemcę</Label>
            <Controller
              name="clientId"
              control={control}
              defaultValue={{ label: '', value: '' }}
              render={({ onChange, onBlur, value }) => (
                <SelectInputField
                  options={selectClientOptions(clients)}
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
            <Label>Zakceptuj rezerwację</Label>
            <Controller
              name="accepted"
              defaultValue={false}
              control={control}
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
          </SelectWrapper>
          {!isEmpty(selectedClientId?.value) && (
            <AutoFillContent>
              <Label>Czy chcesz autouzupełnić dane klienta</Label>
              <Button
                role="button"
                secondary
                onClick={(e) => fillUpFormWithClientData(e, selectedClientId?.value)}
              >
                Tak
              </Button>
            </AutoFillContent>
          )}
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
        {errors.city && <ErrorMsg innerText="Pole nie może być puste" />}
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
              options={selectBuildingOptions(cityValue.value, building)}
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
        {errors.building && <ErrorMsg innerText="Pole nie może być puste" />}
      </SelectWrapper>
      <SelectWrapper>
        <Label>Rezerwowana powierzchnia</Label>
        <ButtonWrapper>
          <ButtonGroup
            options={sizeOptions}
            value={selectedSize}
            optionsHandler={selectedSizeHandler}
            disabled={displayConfirmation}
          />
        </ButtonWrapper>
      </SelectWrapper>
      <SelectWrapper>
        <RodoWrapper>
          <Label>Czy jest to rezerwacja cykliczna</Label>
          <Controller
            name="regular"
            defaultValue={false}
            control={control}
            render={({ onChange, value }) => (
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
        <Label>Imię i nazwisko</Label>
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
        {errors.person && <ErrorMsg innerText="Pole nie może być puste" />}
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
        {errors.email && <ErrorMsg innerText="Pole nie może być puste" />}
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
        {errors.phone && <ErrorMsg innerText="Pole nie może być puste" />}
      </InputContainer>
      <InputContainer>
        <Label>{`${regularValue ? 'Od kiedy' : 'Kiedy'} chciałbyś zarezerwować obiekt`}</Label>
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
              maxDate={addMonths(maxRangDate, 8)}
              selectsRange
              invalid={!!errors.startDate}
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.startDate && <ErrorMsg innerText="Pole nie może być puste" />}
        {regularValue && (
          <>
            <Label>Do kiedy chciałbyś zarezerwować obiekt</Label>
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
                  maxDate={addMonths(maxRangDate, 8)}
                  invalid={!!errors.endDate}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  disabled={displayConfirmation}
                />
              )}
            />
            {errors.endDate && <ErrorMsg innerText="Pole nie może być puste" />}
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
              dateFormat="HH:mm"
              locale="pl"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.startHour && <ErrorMsg innerText="Pole nie może być puste" />}
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
              dateFormat="HH:mm"
              locale="pl"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.endHour && <ErrorMsg innerText="Pole nie może być puste" />}
      </InputContainer>
      {buildingValue.value === 'boisko-sztuczna-nawierzchnia' && (
        <BookingExtraOptions extraOptions={extraOptions} setExtraOptions={setExtraOptions} />
      )}
      <TextAreaLabel>Dodatkowe informacje</TextAreaLabel>
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
      {conflict && (
        <ConflictParagraph small bold conflict={conflict}>
          <BsFillExclamationCircleFill />
          Ta rezerwacja ma konflikt z innymi rezerwacjami , czy napewno chcesz ją zatwierdzić
        </ConflictParagraph>
      )}
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
            Klauzula informacyjna do formularza kontaktowego o przetwarzaniu danych osobowych.
          </Anchor>
        </RodoWrapper>
      )}
      {displayConfirmation ? (
        <ConfirmAction
          message={
            isEditing
              ? 'Czy napewno chcesz zaktualizować rezerwację'
              : 'Czy napewno chcesz wysłać prośbę o rezerwację'
          }
          callback={confirmSubmit}
          cancelCallback={() => {
            setDisplayConfirmation(false);
            setConflict(false);
          }}
        />
      ) : (
        <ButtonPanel>
          <Button role="button" secondary onClick={cancelHandler}>
            Anuluj
          </Button>
          <Button role="button" onClick={onSubmit} disabled={isAdmin ? false : !police}>
            {isAdmin
              ? `${isEditing ? 'Zapisz' : 'Dodaj'} rezerwację`
              : 'Wyślij prośbę o rezerwację'}
          </Button>
        </ButtonPanel>
      )}
    </BookingWrapper>
  );
};

export default BookingForm;
