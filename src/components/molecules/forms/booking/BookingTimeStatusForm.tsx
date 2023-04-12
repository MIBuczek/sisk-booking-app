import * as React from 'react';
import styled from 'styled-components';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {isNil} from 'lodash';
import {
   BOOKING_STATUS_OPTIONS,
   BOOKING_TIME_STATUS_INITIAL_VALUE,
   generateBookingStatusDate
} from 'utils';
import {IBooking, IBookingStatusForm} from 'models';
import {closeModal} from 'store';
import Label from '../../../atoms/Label';
import SelectInputField, {customStyles} from '../../../atoms/SelectInputField';
import ErrorMsg from '../../../atoms/ErrorMsg';
import TextAreaField from '../../../atoms/TextAreaField';
import ConfirmAction from '../../ConfirmAction';
import Button from '../../../atoms/Button';
import TextInputField from '../../../atoms/TextInputField';

const BookingTimeStatusWrapper = styled.form`
   width: 290px;
   display: flex;
   flex-direction: column;
   justify-content: center;

   button {
      align-self: flex-end;
   }

   &.modalResolveBooking {
      width: 380px;
      margin-top: 10px;
      padding-left: 40px;
      border-left: ${({theme}) => `1px solid ${theme.green}`};

      @media (max-width: 835px) {
         border: none;
         padding-left: 0;
      }
   }

   &.bookingStatus {
      width: 100%;
      margin: 0 40px;
   }
`;

const ParticipantInput = styled(TextInputField)`
   width: 290px;
   text-align: left;

   &::placeholder {
      color: #b9b8b8;
      text-align: left;
   }
`;

const ButtonPanel = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   width: 100%;
   margin: 20px 0;

   button {
      margin: 0 0 0 0.8rem;
   }
`;

interface IProp {
   confirmationClass?: string;
   currentBooking: IBooking;
   bookingTimeIndex: number | null;
   hasRights: boolean;
   submitHandler: (updatedBooking: IBooking) => void;
}

const BookingTimeStatusForm: React.FunctionComponent<IProp> = ({
   confirmationClass = '',
   currentBooking,
   bookingTimeIndex,
   hasRights,
   submitHandler
}): JSX.Element => {
   const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
   const [bookingData, setBookingData] = React.useState<IBooking | undefined>(undefined);

   const dispatch = useDispatch();

   const {
      handleSubmit,
      formState: {errors},
      control,
      reset
   } = useForm<IBookingStatusForm>({
      defaultValues: {...BOOKING_TIME_STATUS_INITIAL_VALUE}
   });

   /**
    * Function to update initial form state of already saved data.
    */
   const editBookingStatusHandler = (): void => {
      if (isNil(bookingTimeIndex)) {
         return;
      }
      const {status, participants, comments} = currentBooking.bookingTime[bookingTimeIndex];
      const bookingStatus =
         BOOKING_STATUS_OPTIONS.find((bso) => bso.value === status) || BOOKING_STATUS_OPTIONS[0];
      reset({bookingStatus, bookingParticipants: participants, bookingComments: comments});
   };

   /**
    * Function to submit additional status form fields.
    * This is related to admin and employee. To change the status of selected reservation.
    *
    * @param cred
    */
   const onSubmit: SubmitHandler<IBookingStatusForm> = (cred): void => {
      if (isNil(bookingTimeIndex)) return;

      setBookingData(generateBookingStatusDate(cred, currentBooking, bookingTimeIndex));
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
      reset({...BOOKING_TIME_STATUS_INITIAL_VALUE});
      setDisplayConfirmation(false);
      setBookingData(undefined);
   };

   /**
    * Function handle cancel action.
    */
   const cancelHandler = (): void => {
      createInitialState();
      dispatch(closeModal());
   };

   React.useEffect(() => editBookingStatusHandler(), []);

   return (
      <BookingTimeStatusWrapper className={confirmationClass}>
         <Label>Status</Label>
         <Controller
            name="bookingStatus"
            defaultValue={BOOKING_STATUS_OPTIONS[0]}
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
               <SelectInputField
                  options={BOOKING_STATUS_OPTIONS}
                  styles={customStyles(false)}
                  placeholder="Wybierz"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  isDisabled={!hasRights || !currentBooking.accepted || displayConfirmation}
                  blurInputOnSelect
                  isSearchable={false}
               />
            )}
         />
         {errors.bookingStatus && <ErrorMsg innerText="Pole nie może być puste" />}
         <Label>Liczba uczestników</Label>
         <Controller
            name="bookingParticipants"
            defaultValue={''}
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
               <ParticipantInput
                  placeholder="Wpisz liczbe"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  disabled={!hasRights || !currentBooking.accepted || displayConfirmation}
               />
            )}
         />
         {errors.bookingParticipants && <ErrorMsg innerText="Pole nie może być puste" />}
         <Label>Uwagi</Label>
         <Controller
            name="bookingComments"
            defaultValue={''}
            control={control}
            rules={{required: false}}
            render={({field: {onChange, onBlur, value}}) => (
               <TextAreaField
                  placeholder="Wiadomość"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  disabled={!hasRights || !currentBooking.accepted || displayConfirmation}
                  style={{width: '100%'}}
               />
            )}
         />
         {displayConfirmation ? (
            <ConfirmAction
               message="Czy na pewno chcesz rozliczyć tą rezerwację"
               callback={confirmSubmit}
               cancelCallback={() => setDisplayConfirmation(false)}
               additionalClass={confirmationClass}
            />
         ) : (
            <ButtonPanel>
               <Button role="button" secondary onClick={cancelHandler}>
                  {hasRights ? 'Anuluj' : 'Zamknij'}
               </Button>
               {hasRights && (
                  <Button
                     role="button"
                     onClick={handleSubmit(onSubmit)}
                     disabled={!hasRights || !currentBooking.accepted}
                  >
                     Potwierdz
                  </Button>
               )}
            </ButtonPanel>
         )}
      </BookingTimeStatusWrapper>
   );
};

export default BookingTimeStatusForm;
