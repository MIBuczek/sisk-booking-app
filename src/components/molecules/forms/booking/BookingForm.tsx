/* eslint-disable import/no-duplicates */
import {
   IBooking,
   IMainState,
   IReduxState,
   ISelectedExtraOptions,
   ISingleBookingDate,
   TSelect,
   isNumber
} from 'models';
import {IBookingForm} from 'models/forms/booking-form-models';
import * as React from 'react';
import {registerLocale} from 'react-datepicker';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {addBooking, closeModal, updateBooking} from 'store';
import styled from 'styled-components';
import {
   BOOKING_INITIAL_VALUE,
   checkConflicts,
   CITY_OPTIONS,
   createBookingTimeStamps,
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
import SelectInputField, {customStyles, SelectWrapper} from 'components/atoms/SelectInputField';
import Label from 'components/atoms/Label';
import ErrorMsg from 'components/atoms/ErrorMsg';
import ButtonGroup from 'components/atoms/ButtonGroup';
import Checkbox from 'components/atoms/Checkbox';
import TextInputField from 'components/atoms/TextInputField';
import Anchor from 'components/atoms/Anchor';
import Button from 'components/atoms/Button';
import pl from 'date-fns/locale/pl';
import {cloneDeep} from 'lodash';
import {BsFillExclamationCircleFill, BsQuestionCircleFill} from 'react-icons/bs';
import Paragraph from 'components/atoms/Paragraph';
import ConfirmAction from 'components/molecules/ConfirmAction';
import BookingExtraOptions from 'components/molecules/forms/booking/BookingExtraOptions';
import BookingTimeForm from 'components/molecules/forms/booking/BookingTimeForm';
import WarningMsg from 'components/atoms/WarningMsg';
import TimeStamps from 'components/molecules/TimeStamp';
import AutocompleteTextInput from 'components/atoms/AutocompleteTextInput';

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
   width: 100%;
   padding: 10px;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;

   .react-datepicker__input-container {
      display: flex;
      justify-content: center;
   }

   &.info {
      border-top: ${({theme}) => `2px solid ${theme.green}`};
      border-bottom: ${({theme}) => `2px solid ${theme.green}`};
      background: whitesmoke;
      margin: 0.75rem 0;
   }
`;

const InputWrapper = styled.div`
   width: 50%;
   min-width: 290px;
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 0 0.425rem;
`;

const RodoWrapper = styled.div`
   height: auto;
   display: flex;
   align-items: center;
   margin: 10px 20px;
`;

const AcceptWrapper = styled.div`
   width: 100%;
   background: ${({theme}) => theme.green};
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
   border-top: ${({theme}) => `1px solid ${theme.green}`};
   border-bottom: ${({theme}) => `1px solid ${theme.green}`};
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
      border: ${({theme}) => `1px solid ${theme.green}`};
      border-radius: 10px;
      left: unset !important;

      li {
         margin: 8px 0;
      }

      li.active {
         background-color: ${({theme}) => theme.green};
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
   color: ${({theme}) => theme.error};
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

interface IProps {
   mainState: IMainState;
   bookingsList: IBooking[];
   isSISKEmployee: boolean;
   isAdmin: boolean;
   isOffice: boolean;
   isEditing: boolean;
   editedItemIndex?: number;
   initialEditingState: () => void;
}

/**
 * Booking form component.
 * It's handle general booking information with booking time list.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const BookingForm: React.FunctionComponent<IProps> = ({
   bookingsList,
   mainState,
   isSISKEmployee,
   isAdmin,
   isOffice,
   isEditing,
   editedItemIndex,
   initialEditingState
}): JSX.Element => {
   const [bookingData, setBookingData] = React.useState<IBooking | undefined>(undefined);
   const [extraOptions, setExtraOptions] = React.useState<ISelectedExtraOptions[]>([]);
   const [bookingTime, setBookingTime] = React.useState<ISingleBookingDate[]>([]);
   const [bookingId, setBookingId] = React.useState<string | undefined>(undefined);
   const [selectedSize, setSelectedSize] = React.useState(SIZE_OPTIONS['1/1']);
   const [sizeOptions, setSizeOptions] = React.useState<SIZE_OPTIONS[]>(SIZE_OPTIONS_BTN);
   const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
   const [police, setPolice] = React.useState<boolean>(false);
   const [conflict, setConflict] = React.useState<boolean>(false);
   const [sendEmailNotification, setSendEmailNotification] = React.useState<boolean>(false);

   const {city, building} = mainState;

   const dispatch = useDispatch();

   const {
      currentUserStore: {user},
      clientStore: {clients},
      buildingStore: {buildings}
   } = useSelector((state: IReduxState): IReduxState => state);

   const {
      handleSubmit,
      formState: {errors},
      control,
      watch,
      reset,
      getValues,
      setValue
   } = useForm<IBookingForm>({
      defaultValues: {...cloneDeep(BOOKING_INITIAL_VALUE), ...mainState}
   });

   const {
      city: cityValue,
      building: buildingValue,
      clientId: selectedClientId,
      person: personName
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
   const onSubmit: SubmitHandler<IBookingForm> = (cred): void => {
      if (!bookingTime.length) {
         return;
      }

      let bookingToApprove;

      bookingToApprove = cloneDeep(
         generateBookingDetails(cred, selectedSize, bookingTime, extraOptions, bookingId)
      );

      let originBooking: IBooking | undefined;

      if (isNumber(editedItemIndex)) {
         originBooking = cloneDeep(bookingsList[editedItemIndex]);
      }

      bookingToApprove = cloneDeep(
         createBookingTimeStamps(isEditing, bookingToApprove, originBooking, user)
      );

      setBookingData(bookingToApprove);
      setDisplayConfirmation(true);

      if (isAdmin) {
         setConflict(checkConflicts(bookingToApprove, bookingsList));
      }
   };

   /**
    * Function to confirm dispatch action. If so then add or update firebase booking collection.
    */
   const confirmSubmit = (): void => {
      if (!bookingData) return;
      if (bookingId) {
         dispatch(updateBooking({...bookingData, id: bookingId}, isAdmin, sendEmailNotification));
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
   const editBookingHandler = (index: number): void => {
      const currentBooking = cloneDeep(bookingsList[index]);
      const clientId = selectedClientIdOption(clients, currentBooking.clientId);
      reset(generateBookingFormDetails(currentBooking, clientId, city));
      setBookingId(currentBooking.id);
      setSelectedSize(currentBooking.size);
      setBookingTime(currentBooking.bookingTime);
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
   const createInitialState = (): void => {
      reset({...cloneDeep(BOOKING_INITIAL_VALUE), ...mainState});
      setBookingId(undefined);
      initialEditingState();
      setDisplayConfirmation(false);
      setBookingData(undefined);
      setExtraOptions([]);
      setBookingTime([]);
      setConflict(false);
   };

   /**
    * Function handle cancel action.
    */
   const cancelHandler = (): void => {
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
         nick: selectedClient.nick || 'Rezerwacja',
         person: selectedClient.name,
         email: selectedClient.email,
         phone: selectedClient.phone
      };

      const currentFormValues = getValues();

      if (typeof editedItemIndex === 'number') {
         reset({...cloneDeep({...currentFormValues}), ...formClientData});
         // eslint-disable-next-line no-param-reassign
         bookingsList[editedItemIndex].clientId = selectedClientId.value;
      } else {
         reset({
            ...cloneDeep({...currentFormValues, clientId: selectedClientId}),
            ...mainState,
            ...formClientData
         });
      }
   };

   /**
    * Function compare is booking client id with dropdown selected option
    */
   const compareClientIds = (): boolean => {
      if (!selectedClientId || !selectedClientId.label) return false;
      return selectedClientId?.label !== personName;
   };

   /**
    * Method to display appropriate form title.
    * @returns {String}
    */
   const bookingFormTitle = (): string => {
      if (isAdmin && isEditing) return 'Edytuj rezerwację';
      if (isAdmin) return 'Dodaj nową rezerwację';
      if ((user?.isOffice || user?.isEmployee) && isEditing) return 'Edytuj prośbę o rezerwację';
      return 'Prośbę o rezerwację';
   };

   /**
    * Method to display appropriate accept button text.
    * @returns {String}
    */
   const bookingFormButtonText = (): string => {
      if (isAdmin && isEditing) return 'Zaktualizuj rezerwację';
      if (isAdmin) return 'Dodaj rezerwację';
      if ((user?.isOffice || user?.isEmployee) && isEditing) {
         return 'Zaktualizuj prośbę o rezerwację';
      }
      return 'Wyślij prośbę o rezerwację';
   };

   /**
    * Method to handle disabled accept button state.
    * @returns {Boolean}
    */
   const handlerDisableApproveBtn = (): boolean => {
      if (isAdmin || user?.isOffice || user?.isEmployee) return false;
      return !police;
   };

   /**
    * Function to display right confirmation message according current state.
    */
   const confirmationMessage = (): string => {
      if (isEditing) return 'Czy napewno chcesz zaktualizować rezerwację';
      if (isAdmin) return 'Czy napewno chcesz dodać nową rezerwację';
      return 'Czy napewno chcesz wysłać prośbę o rezerwację';
   };

   /**
    * Effect to refresh the view after watched form value change
    */
   React.useEffect(() => {
      const sub = watch((value, {name}) => {
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

   /**
    * Effect to set component state if user edit some booking item.
    */
   React.useEffect(() => {
      if (isEditing && typeof editedItemIndex === 'number') editBookingHandler(editedItemIndex);
      else createInitialState();
   }, [isEditing]);

   /**
    * Effect to set available size option for selected building / place
    */
   React.useEffect(() => setSizeOptions(selectSizeFieldOptions(city.value, building.value)), []);

   return (
      <BookingWrapper>
         <BookingHeader>{bookingFormTitle()}</BookingHeader>
         {isSISKEmployee && (
            <AcceptWrapper>
               <SelectWrapper>
                  <Label>Dodaj najemcę</Label>
                  <Controller
                     name="clientId"
                     control={control}
                     defaultValue={{label: '', value: ''}}
                     render={({field: {onChange, onBlur, value}}) => (
                        <SelectInputField
                           options={selectClientOptions(clients)}
                           placeholder="Wybierz"
                           onChange={onChange}
                           onBlur={onBlur}
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
                        render={({field: {onChange, value}}) => (
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
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <SelectInputField
                     options={CITY_OPTIONS}
                     styles={customStyles(!!errors.city)}
                     placeholder="Wybierz"
                     onChange={onChange}
                     onBlur={onBlur}
                     value={value}
                     defaultValue={city}
                     isDisabled={displayConfirmation}
                     blurInputOnSelect
                     isSearchable={false}
                  />
               )}
            />
            {errors.city && <ErrorMsg innerText={errors.city.message} />}
         </SelectWrapper>
         <SelectWrapper>
            <Label>Obiekt</Label>
            <Controller
               name="building"
               defaultValue={building}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <SelectInputField
                     options={selectBuildingOptions(cityValue.value, building)}
                     styles={customStyles(!!errors.building)}
                     placeholder="Wybierz"
                     onChange={onChange}
                     onBlur={onBlur}
                     value={value}
                     isDisabled={!cityValue || displayConfirmation}
                     defaultValue={building}
                     blurInputOnSelect
                     isSearchable={false}
                  />
               )}
            />
            {errors.building && <ErrorMsg innerText={errors.building.message} />}
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
            <Label>Płatność</Label>
            <Controller
               name="payment"
               defaultValue={PAYMENTS_OPTIONS[0]}
               control={control}
               rules={{
                  required: {
                     value: true,
                     message: 'Pole nie może być puste'
                  }
               }}
               render={({field: {onChange, onBlur, value}}) => (
                  <SelectInputField
                     options={PAYMENTS_OPTIONS}
                     styles={customStyles(!!errors.payment)}
                     placeholder="Wybierz"
                     onChange={onChange}
                     onBlur={onBlur}
                     value={value}
                     defaultValue={PAYMENTS_OPTIONS[0]}
                     isDisabled={displayConfirmation}
                     blurInputOnSelect
                     isSearchable={false}
                  />
               )}
            />
            {errors.payment && <ErrorMsg innerText={errors.payment.message} />}
         </SelectWrapper>
         <InputContainer className="info">
            <InputWrapper>
               <Label>Nick</Label>
               <Controller
                  name="nick"
                  defaultValue={'Rezerwacja'}
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: 'Pole nie może być puste'
                     },
                     minLength: {
                        value: 3,
                        message: 'Minimalna ilość znaków to 3'
                     },
                     maxLength: {
                        value: 100,
                        message: 'Maksymalna ilość znaków to 100'
                     }
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                     <TextInputField
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        invalid={!!errors.nick}
                        className="input"
                        placeholder="Wpisz"
                        disabled={displayConfirmation}
                     />
                  )}
               />
               {errors.nick && <ErrorMsg innerText={errors.nick.message} />}
            </InputWrapper>
            <InputWrapper>
               <WarningMsg
                  innerText="Pole [Nick] bedzie wyświetlane w głównym kalendarzu przy rezerwacji."
                  className="bookingForm"
               />
            </InputWrapper>
         </InputContainer>
         <InputContainer>
            <InputWrapper>
               <Label>Imię i nazwisko</Label>
               <Controller
                  name="person"
                  defaultValue={''}
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: 'Pole nie może być puste'
                     },
                     minLength: {
                        value: 3,
                        message: 'Minimalna ilość znaków to 3'
                     },
                     maxLength: {
                        value: 100,
                        message: 'Maksymalna ilość znaków to 100'
                     }
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
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
               {errors.person && <ErrorMsg innerText={errors.person.message} />}
            </InputWrapper>
            <InputWrapper>
               <Label>E-mail</Label>
               <Controller
                  name="email"
                  defaultValue={''}
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: 'Pole nie może być puste'
                     },
                     minLength: {
                        value: 8,
                        message: 'Minimalna ilość znaków to 8'
                     },
                     maxLength: {
                        value: 100,
                        message: 'Maksymalna ilość znaków to 100'
                     },
                     validate: () =>
                        getValues('email').includes('@') || 'Adres email musi zawierać @'
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
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
               {errors.email && <ErrorMsg innerText={errors.email.message} />}
            </InputWrapper>
            <InputWrapper>
               <Label>Telefon</Label>
               <Controller
                  name="phone"
                  defaultValue={''}
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: 'Pole nie może być puste'
                     },
                     minLength: {
                        value: 9,
                        message: 'Minimalna ilość znaków to 9'
                     },
                     maxLength: {
                        value: 15,
                        message: 'Maksymalna ilość znaków to 15'
                     },
                     pattern: {
                        value: /^[0-9\s-]+$/,
                        message: 'Pole może zawierać tylko liczby,myślnik lub spacje'
                     }
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
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
               {errors.phone && <ErrorMsg innerText={errors.phone.message} />}
            </InputWrapper>
            <AutocompleteWrapper>
               <Label>Udzielony rabat</Label>
               <Controller
                  name="discount"
                  defaultValue={DISCOUNT_OPTIONS[0]}
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: 'Pole nie może być puste'
                     },
                     pattern: {
                        value: /^[0-9/%]+$/,
                        message: 'Pole może zawierać tylko liczby i znak procent'
                     },
                     minLength: {
                        value: 2,
                        message: 'Minimalna ilość znaków to 2'
                     },
                     maxLength: {
                        value: 4,
                        message: 'Maksymalna ilość znaków to 4'
                     },
                     validate: () => {
                        if (!getValues('discount').includes('%')) {
                           return ' Pole musi zawierać znak %';
                        }
                        const numVal = Number(getValues('discount').replace('%', ''));
                        if (numVal < 0 || numVal > 100) {
                           return 'Pole musi zawierać wartość od 0 do 100%';
                        }
                        return true;
                     }
                  }}
                  render={({field: {onChange, value}}) => (
                     <AutocompleteTextInput
                        placeholder="0%"
                        value={value}
                        options={DISCOUNT_OPTIONS}
                        onChange={onChange}
                        onSelect={(val: string) => {
                           setValue('discount', val);
                        }}
                        invalid={!!errors.discount}
                        disabled={!(isAdmin || isOffice) || displayConfirmation}
                     />
                  )}
               />
               {errors.discount && <ErrorMsg innerText={errors.discount.message} />}
            </AutocompleteWrapper>
         </InputContainer>
         <BookingTimeForm
            isAdmin={isAdmin}
            disabled={displayConfirmation}
            bookingTime={bookingTime}
            setBookingTime={setBookingTime}
         />
         {buildingValue.value === 'boisko-sztuczna-nawierzchnia' && (
            <BookingExtraOptions
               disabled={displayConfirmation}
               extraOptions={extraOptions}
               setExtraOptions={setExtraOptions}
            />
         )}
         <TextAreaLabel>Dodatkowe informacje</TextAreaLabel>
         <Controller
            name="message"
            defaultValue={''}
            control={control}
            rules={{required: false}}
            render={({field: {onChange, onBlur, value}}) => (
               <MessageTextArea
                  placeholder="Wiadomość"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  disabled={displayConfirmation}
               />
            )}
         />
         {isAdmin && isEditing && (
            <ArchiveWrapper>
               <Label>Zarchiwizować rezerwacje</Label>
               <Controller
                  name="archive"
                  defaultValue={false}
                  control={control}
                  render={({field: {onChange, value}}) => (
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
         {!(isAdmin || user?.isOffice || user?.isEmployee) && (
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
                  onClick={handleSubmit(onSubmit)}
                  disabled={handlerDisableApproveBtn()}
               >
                  {bookingFormButtonText()}
               </Button>
            </ButtonPanel>
         )}
         {isEditing && isNumber(editedItemIndex) && (
            <TimeStamps currentBooking={bookingsList[editedItemIndex]} />
         )}
      </BookingWrapper>
   );
};

export default BookingForm;
