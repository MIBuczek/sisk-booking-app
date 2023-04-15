import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {cloneDeep} from 'lodash';
import styled from 'styled-components';
import addMonths from 'date-fns/addMonths';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import {DataPickerField} from 'components/atoms/DatapickerField';
import Label from 'components/atoms/Label';
import {closeModal} from 'store';
import {
   BOOKING_SINGLE_TIME_INITIAL_VALUE,
   BOOKING_STATUS,
   formatCalenderDate,
   generateMaxRangDate
} from 'utils';
import {IBooking, IBookingTimeForm} from 'models';
import ErrorMsg from 'components/atoms/ErrorMsg';
import ConfirmAction from 'components/molecules/ConfirmAction';
import Button from 'components/atoms/Button';
import WarningMsg from 'components/atoms/WarningMsg';

const SingleBookingTimeWrapper = styled.form`
   width: 100%;
   display: flex;
   justify-content: center;
   flex-wrap: wrap;

   button {
      align-self: flex-end;
   }
`;

const SingleOption = styled.div`
   width: 30%;
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 20px 8px 10px;
`;

const ButtonPanel = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   width: 100%;
   margin: 20px 40px;

   button {
      margin: 0 0 0 0.8rem;
   }
`;

interface IProp {
   currentBooking: IBooking;
   bookingTimeIndex: number;
   hasRights: boolean;
   submitHandler: (updatedBooking: IBooking) => void;
}
const BookingSingleTimeForm: React.FunctionComponent<IProp> = ({
   currentBooking,
   bookingTimeIndex,
   hasRights,
   submitHandler
}): JSX.Element => {
   const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
   const [bookingData, setBookingData] = React.useState<IBooking | undefined>(undefined);
   const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);
   const [blockEdition, setBlockEdition] = React.useState<boolean>(false);

   const dispatch = useDispatch();

   const {
      handleSubmit,
      formState: {errors},
      control,
      reset,
      watch
   } = useForm<IBookingTimeForm>({defaultValues: {...BOOKING_SINGLE_TIME_INITIAL_VALUE}});

   const {startHour: start, endHour: end} = watch();

   /**
    * Function to update initial form state of already saved data.
    */
   const editSingleBookingTimeHandler = (): void => {
      const {day, startHour, endHour, status} = currentBooking.bookingTime[bookingTimeIndex];
      if (status !== BOOKING_STATUS.INITIAL) setBlockEdition(true);
      reset({day, startHour, endHour});
   };

   /**
    * Function to submit additional status form fields.
    * This is related to admin and employee. To change the status of selected reservation.
    *
    * @param cred
    */
   const onSubmit: SubmitHandler<IBookingTimeForm> = (cred): void => {
      const clonedBooking = cloneDeep(currentBooking);
      const editedBookingTime = clonedBooking.bookingTime[bookingTimeIndex];
      clonedBooking.bookingTime[bookingTimeIndex] = {
         ...editedBookingTime,
         ...cred,
         day: new Date(`${formatCalenderDate(cred.day)}T00:01:00.000Z`)
      };
      setBookingData(clonedBooking);
      setDisplayConfirmation(true);
   };

   /**
    * Function to confirm submission action and pass it to parent component.
    */
   const confirmSubmit = (): void => {
      if (!bookingData) return;

      submitHandler(bookingData);

      createInitialState();
      dispatch(closeModal());
   };

   /**
    * Function to restore initial status.
    */
   const createInitialState = (): void => {
      reset({...BOOKING_SINGLE_TIME_INITIAL_VALUE});
      setDisplayConfirmation(false);
      setBookingData(undefined);
      setBlockEdition(false);
   };

   /**
    * Function handle cancel action.
    */
   const cancelHandler = (): void => {
      createInitialState();
      dispatch(closeModal());
   };

   /**
    * Function to handle disabled state of action buttons.
    */
   const handlerDisabled = (): boolean => blockEdition || !hasRights || displayConfirmation;

   /**
    * Function to handle time errors in booking time form.
    */
   const handlerTimeError = (): void => {
      if (!start || !end) return;
      if (start.getTime() - end.getTime() > 50) {
         setErrorMsg('Godzina zakończenia nie może być niższa badz równa godziny rozpoczęcia');
         return;
      }
      setErrorMsg(undefined);
   };

   /**
    * Set edited booking time form component state.
    */
   React.useEffect(() => editSingleBookingTimeHandler(), []);

   /**
    * Refresh view after any changes on start end time selection.
    */
   React.useEffect(() => handlerTimeError(), [start, end]);

   return (
      <>
         {blockEdition && (
            <WarningMsg
               innerText="Brak ma możliwości edycji rozliczonych rezerwacji"
               className="full"
            />
         )}
         <SingleBookingTimeWrapper>
            <SingleOption>
               <Label>Kiedy</Label>
               <Controller
                  name="day"
                  defaultValue={new Date()}
                  control={control}
                  rules={{required: true}}
                  render={({field: {onChange, onBlur, value}}) => (
                     <DataPickerField
                        showTimeSelect={false}
                        shouldCloseOnSelect
                        placeholderText="Wybierz"
                        locale="pl"
                        minDate={null}
                        maxDate={addMonths(generateMaxRangDate(), 8)}
                        dateFormat="dd-MM-yyyy"
                        invalid={!!errors.day}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        disabled={handlerDisabled()}
                     />
                  )}
               />
               {errors.day && <ErrorMsg innerText="Pole nie może być puste" />}
            </SingleOption>
            <SingleOption>
               <Label>Od godziny</Label>
               <Controller
                  name="startHour"
                  defaultValue={undefined}
                  control={control}
                  rules={{required: true}}
                  render={({field: {onChange, onBlur, value}}) => (
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
                        disabled={handlerDisabled()}
                     />
                  )}
               />
               {errors.startHour && <ErrorMsg innerText="Pole nie może być puste" />}
            </SingleOption>
            <SingleOption>
               <Label>Do godziny</Label>
               <Controller
                  name="endHour"
                  defaultValue={undefined}
                  control={control}
                  rules={{required: true}}
                  render={({field: {onChange, onBlur, value}}) => (
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
                        disabled={handlerDisabled()}
                     />
                  )}
               />
               {errors.endHour && <ErrorMsg innerText="Pole nie może być puste" />}
            </SingleOption>
            {displayConfirmation ? (
               <ConfirmAction
                  message="Czy na pewno chcesz rozliczyć tą rezerwację"
                  callback={confirmSubmit}
                  cancelCallback={() => setDisplayConfirmation(false)}
               />
            ) : (
               <>
                  {errorMsg && <ErrorMsg innerText={errorMsg} />}
                  <ButtonPanel>
                     <Button role="button" secondary onClick={cancelHandler}>
                        {hasRights ? 'Anuluj' : 'Zamknij'}
                     </Button>
                     {hasRights && (
                        <Button
                           role="button"
                           onClick={handleSubmit(onSubmit)}
                           disabled={handlerDisabled() || !!errorMsg}
                        >
                           Potwierdz
                        </Button>
                     )}
                  </ButtonPanel>
               </>
            )}
         </SingleBookingTimeWrapper>
      </>
   );
};

export default BookingSingleTimeForm;
