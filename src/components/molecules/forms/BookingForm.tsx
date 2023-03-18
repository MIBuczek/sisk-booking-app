/* eslint-disable import/no-duplicates */
import {
  IBooking,
  ICredential,
  IMainState,
  IReduxState,
  ISelectedExtraOptions,
  TSelect
} from 'models';
import { IBookingForm } from 'models/forms/booking-form-models';
import * as React from 'react';
import { registerLocale } from 'react-datepicker';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking, closeModal, updateBooking } from 'store';
import styled from 'styled-components';
import {
  BOOKING_INITIAL_VALUE,
  checkConflicts,
  CITY_OPTIONS,
  concatBookingTime,
  DISCOUNT_OPTIONS,
  generateBookingDetails,
  generateBookingFormDetails,
  generateBuildingOptions,
  PAYMENTS_OPTIONS,
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
import { cloneDeep } from 'lodash';
import { BsFillExclamationCircleFill, BsQuestionCircleFill } from 'react-icons/bs';
import Paragraph from 'components/atoms/Paragraph';
import ConfirmAction from '../ConfirmAction';
import BookingExtraOptions from '../BookingExtraOptions';
import Autocomplete from '../../atoms/Autocomplete';

registerLocale('pl', pl);

const BookingWrapper = styled.form`
  max-width: 670px;
  display: flex;
  flex-wrap: wrap;

  button {
    align-self: flex-end;
  }

  @media (max-width: 1400px) {
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 890px) {
    margin: 0 auto;
  }

  @media (max-width: 620px) {
    flex-direction: column;
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

  .react-datepicker__input-container {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 890px) {
    width: 50%;
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

const ArchiveWrapper = styled(SelectWrapper)`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px 20px;
  margin: 0;
  border-top: ${({ theme }) => `1px solid ${theme.green}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.green}`};
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

  @media (max-width: 620px) {
    width: 80%;
  }
`;

const ButtonWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;

  @media (max-width: 1400px) {
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 620px) {
    width: 100%;
  }
`;

const AutocompleteWrapper = styled(SelectWrapper)`
  ul.react-autocomplete-input {
    width: 190px;
    border: ${({ theme }) => `1px solid ${theme.green}`};
    border-radius: 10px;
    left: unset !important;

    li {
      margin: 8px 0;
    }

    li.active {
      background-color: ${({ theme }) => theme.green};
    }
  }
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

  @media (max-width: 620px) {
    width: 80%;
  }
`;

const ConflictParagraph = styled(Paragraph)`
  width: 100%;
  text-align: left;
  color: ${({ theme }) => theme.error};
  margin: 10px 20px;

  svg {
    margin-right: 8px;
  }
`;

const questionMarkIconStyle = {
  fontSize: '2rem',
  marginLeft: '1rem',
  color: 'AFBF36'
};

interface BookingFormProps {
  mainState: IMainState;
  bookingsList: IBooking[];
  isSISKEmployee: boolean;
  isAdmin: boolean;
  isEditing: boolean;
  editedItemIndex?: number;
  initialEditingState: () => void;
}

const BookingForm: React.FunctionComponent<BookingFormProps> = ({
  bookingsList,
  mainState,
  isSISKEmployee,
  isAdmin,
  isEditing,
  editedItemIndex,
  initialEditingState
}) => {
  const [bookingData, setBookingData] = React.useState<IBooking | undefined>(undefined);
  const [extraOptions, setExtraOptions] = React.useState<ISelectedExtraOptions[]>([]);
  const [bookingId, setBookingId] = React.useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = React.useState(SIZE_OPTIONS['1/1']);
  const [sizeOptions, setSizeOptions] = React.useState<SIZE_OPTIONS[]>(SIZE_OPTIONS_BTN);
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
  const [police, setPolice] = React.useState<boolean>(false);
  const [conflict, setConflict] = React.useState<boolean>(false);
  const [sendEmailNotification, setSendEmailNotification] = React.useState<boolean>(false);

  const { city, building } = mainState;

  const dispatch = useDispatch();

  const {
    clientStore: { clients },
    buildingStore: { buildings }
  } = useSelector((state: IReduxState): IReduxState => state);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue
  } = useForm<IBookingForm>({
    defaultValues: { ...cloneDeep(BOOKING_INITIAL_VALUE), ...mainState }
  });

  const {
    city: cityValue,
    building: buildingValue,
    startDate,
    regular: regularValue,
    clientId: selectedClientId,
    person: personName
  } = watch();

  /**
   * Function to generate max rang in data type input.
   * If we have august then extend it for next year.
   */
  const generateMaxRangDate = () => {
    let currentYear = new Date().getFullYear();
    if (new Date().getMonth() >= 7) {
      currentYear += 1;
    }
    return new Date(`${currentYear}-01-01T00:01:00.676Z`);
  };

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
   * @param city_value
   * @param building_options
   */
  const selectBuildingOptions = (city_value: string, building_options: TSelect): TSelect[] => {
    if (!city_value) return [building_options];
    return generateBuildingOptions(buildings)[city_value];
  };

  /**
   * Function to submit actual form values into form state.
   * It will be dispatched to database it user confirm action.
   * @param cred
   */
  const onSubmit: SubmitHandler<IBookingForm> = (cred) => {
    const bookingToApprove = cloneDeep(
      generateBookingDetails(cred, selectedSize, extraOptions, bookingId)
    );

    /* Case to update edited item times just if booking is not resolved */
    if (typeof editedItemIndex === 'number') {
      const previousBooking = cloneDeep(bookingsList[editedItemIndex]);
      bookingToApprove.bookingTime = concatBookingTime(
        previousBooking.bookingTime,
        bookingToApprove.bookingTime
      );
    }

    setBookingData(bookingToApprove);
    setDisplayConfirmation(true);

    if (isAdmin) {
      setConflict(checkConflicts(bookingToApprove, bookingsList));
    }
  };

  /**
   * Function to dispatch errors on action to log user into platform
   * @param err
   * @param e
   */
  const onError: SubmitErrorHandler<ICredential> = (err, e) => {
    console.log(err, e);
  };

  /**
   * Function to confirm dispatch action. If so then add or update firebase booking collection.
   */
  const confirmSubmit = () => {
    if (!bookingData) return;
    if (bookingId) {
      dispatch(updateBooking({ ...bookingData, id: bookingId }, isAdmin, sendEmailNotification));
    } else {
      const sendEmail = !isAdmin ? true : sendEmailNotification;
      dispatch(addBooking(bookingData, isAdmin, sendEmail));
    }

    createInitialState();
  };

  /**
   * Function handle edit selected booking object. It set form fields with current booking data.
   * @param index
   */
  const editBookingHandler = (index: number) => {
    const currentBooking = cloneDeep(bookingsList[index]);
    const clientId = selectedClientIdOption(clients, currentBooking.clientId);
    reset(generateBookingFormDetails(currentBooking, clientId, city));
    setBookingId(currentBooking.id);
    setSelectedSize(currentBooking.size);
    if (currentBooking.extraOptions) {
      setExtraOptions(currentBooking.selectedOptions);
    }
    if (isAdmin) {
      setConflict(checkConflicts(currentBooking, bookingsList));
    }
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
    setExtraOptions([]);
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
  const fillUpFormWithClientData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();
    const selectedClient = clients.find((c) => c.id === selectedClientId?.value);

    if (!selectedClient || !selectedClientId) return;

    const formClientData = {
      person: selectedClient?.name,
      email: selectedClient?.email,
      phone: selectedClient?.phone
    };

    const currentFormValues = getValues();

    if (typeof editedItemIndex === 'number') {
      reset({
        ...cloneDeep({ ...currentFormValues }),
        ...formClientData
      });
      // eslint-disable-next-line no-param-reassign
      bookingsList[editedItemIndex].clientId = selectedClientId.value;
    } else {
      reset({
        ...cloneDeep({ ...currentFormValues, clientId: selectedClientId }),
        ...mainState,
        ...formClientData
      });
    }
  };

  /**
   * Function to update field endDate in form if cyclic reservation is selected.
   */
  const updateEndDataInForm = (): void => {
    if (!regularValue || isEditing) {
      return;
    }
    const currentFormValues = getValues();
    reset({ ...currentFormValues, endDate: startDate });
  };

  /**
   * Function compare is booking client id with dropdown selected option
   */
  const compareClientIds = (): boolean => {
    if (!selectedClientId || !selectedClientId.label) return false;
    return selectedClientId?.label !== personName;
  };

  /**
   * Function to display right confirmation message according current state.
   */
  const confirmationMessage = (): string => {
    if (isEditing) return 'Czy napewno chcesz zaktualizować rezerwację';
    if (isAdmin) return 'Czy napewno chcesz dodać nową rezerwację';
    return 'Czy napewno chcesz wysłać prośbę o rezerwację';
  };

  React.useEffect(() => {
    const sub = watch((value, { name }) => {
      const currentCity = value.city?.value ?? '';
      const currentBuilding = value.building?.value ?? '';
      switch (name) {
        case 'city':
          const defaultBuilding = selectBuildingOptions(currentCity, building)[0];
          setValue('building', defaultBuilding);
          break;
        case 'building':
          setSizeOptions(selectSizeFieldOptions(currentCity, currentBuilding));
          break;
        default:
          break;
      }
    });
    return () => sub.unsubscribe();
  }, [watch]);

  React.useEffect(() => {
    if (isEditing && typeof editedItemIndex === 'number') {
      editBookingHandler(editedItemIndex);
    } else {
      createInitialState();
    }
  }, [isEditing]);

  React.useEffect(() => {
    setSizeOptions(selectSizeFieldOptions(city.value, building.value));
  }, []);

  React.useEffect(updateEndDataInForm, [startDate]);

  return (
    <BookingWrapper>
      <BookingHeader>{isAdmin ? 'Dodaj nową rezerwację' : ' Prośbę o rezerwację'}</BookingHeader>
      {isSISKEmployee && (
        <AcceptWrapper>
          <SelectWrapper>
            <Label>Dodaj najemcę</Label>
            <Controller
              name="clientId"
              control={control}
              defaultValue={{ label: '', value: '' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectInputField
                  options={selectClientOptions(clients)}
                  placeholder="Wybierz"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  value={value}
                  isDisabled={displayConfirmation}
                  blurInputOnSelect
                />
              )}
            />
          </SelectWrapper>
          {isAdmin && (
            <SelectWrapper>
              <Label>Zakceptuj rezerwację</Label>
              <Controller
                name="accepted"
                defaultValue={false}
                control={control}
                render={({ field: { onChange, value } }) => (
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
          )}
          {compareClientIds() && (
            <AutoFillContent>
              <Label>Czy chcesz autouzupełnić dane klienta</Label>
              <Button role="button" secondary onClick={(e) => fillUpFormWithClientData(e)}>
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
          render={({ field: { onChange, onBlur, value } }) => (
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
              blurInputOnSelect
              isSearchable={false}
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
          render={({ field: { onChange, onBlur, value } }) => (
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
              blurInputOnSelect
              isSearchable={false}
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
          <Label>Rezerwacja cykliczna</Label>
          <Controller
            name="regular"
            defaultValue={false}
            control={control}
            render={({ field: { onChange, value } }) => (
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
          render={({ field: { onChange, onBlur, value } }) => (
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
        <Label>E-mail</Label>
        <Controller
          name="email"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
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
        <Label>Telefonu</Label>
        <Controller
          name="phone"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
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
        <SelectWrapper>
          <Label>Płatność</Label>
          <Controller
            name="payment"
            defaultValue={PAYMENTS_OPTIONS[0]}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectInputField
                options={PAYMENTS_OPTIONS}
                styles={customStyles(!!errors.payment)}
                placeholder="Wybierz"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                value={value}
                defaultValue={PAYMENTS_OPTIONS[0]}
                isDisabled={displayConfirmation}
                blurInputOnSelect
                isSearchable={false}
              />
            )}
          />
          {errors.payment && <ErrorMsg innerText="Pole nie może być puste" />}
        </SelectWrapper>
      </InputContainer>
      <InputContainer>
        <Label>{regularValue ? 'Od kiedy' : 'Kiedy'}</Label>
        <Controller
          name="startDate"
          defaultValue={new Date()}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DataPickerField
              showTimeSelect={false}
              shouldCloseOnSelect
              placeholderText="Wybierz"
              locale="pl"
              minDate={!isAdmin ? new Date() : null}
              maxDate={addMonths(generateMaxRangDate(), 8)}
              dateFormat="dd-MM-yyyy"
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
            <Label>Do kiedy</Label>
            <Controller
              name="endDate"
              defaultValue={new Date()}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DataPickerField
                  showTimeSelect={false}
                  shouldCloseOnSelect
                  placeholderText="Wybierz"
                  locale="pl"
                  minDate={!isAdmin ? new Date() : null}
                  maxDate={addMonths(generateMaxRangDate(), 8)}
                  dateFormat="dd-MM-yyyy"
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
        <Label>Od godziny</Label>
        <Controller
          name="startHour"
          defaultValue={undefined}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DataPickerField
              placeholderText="Wybierz"
              showTimeSelect
              showTimeSelectOnly
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
        <Label>Do godziny</Label>
        <Controller
          name="endHour"
          defaultValue={undefined}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DataPickerField
              placeholderText="Wybierz"
              showTimeSelect
              showTimeSelectOnly
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
        <AutocompleteWrapper>
          <Label>Udzielony rabat</Label>
          <Controller
            name="discount"
            defaultValue={DISCOUNT_OPTIONS[0]}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                trigger=""
                Component="input"
                placeholder="0%"
                value={value}
                options={DISCOUNT_OPTIONS}
                onChange={onChange}
                onSelect={(val: string) => {
                  setValue('discount', val.split(' ')[0]);
                }}
                disabled={displayConfirmation}
              />
            )}
          />
          {errors.discount && <ErrorMsg innerText="Pole nie może być puste" />}
        </AutocompleteWrapper>
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
        render={({ field: { onChange, onBlur, value } }) => (
          <MessageTextArea
            placeholder="Wiadomość"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={displayConfirmation}
          />
        )}
      />
      {isEditing && (
        <ArchiveWrapper>
          <Label>Zarchiwizować rezerwacje</Label>
          <Controller
            name="archive"
            defaultValue={false}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                className="checkbox"
                name="archive"
                changeHandler={onChange}
                disabled={displayConfirmation}
              />
            )}
          />
        </ArchiveWrapper>
      )}
      {isAdmin && (
        <RodoWrapper>
          <Checkbox
            checked={sendEmailNotification}
            className="checkbox"
            name="sendEmail"
            changeHandler={() => setSendEmailNotification(!sendEmailNotification)}
            disabled={displayConfirmation}
          />
          <Paragraph small>
            Czy chcesz wysłać wiadomość e-mail do pracownika z informacją o rezerwacji
            <BsQuestionCircleFill style={questionMarkIconStyle} />
          </Paragraph>
        </RodoWrapper>
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
            href="https://www.sisk-siechnice.pl/wp-content/uploads/2019/09/Klauzula-informacyjna-do-formularza-kontaktowego-SISK.pdf"
            target="_blank"
          >
            Klauzula informacyjna do formularza kontaktowego o przetwarzaniu danych osobowych.
          </Anchor>
        </RodoWrapper>
      )}
      {conflict && (
        <ConflictParagraph small bold conflict={conflict}>
          <BsFillExclamationCircleFill />
          Ta rezerwacja ma konflikt z innymi rezerwacjami , czy napewno chcesz ją zatwierdzić
        </ConflictParagraph>
      )}
      {displayConfirmation ? (
        <ConfirmAction
          message={confirmationMessage()}
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
          <Button
            role="button"
            onClick={handleSubmit(onSubmit, onError)}
            disabled={isAdmin ? false : !police}
          >
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
