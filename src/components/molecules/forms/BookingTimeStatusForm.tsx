import * as React from 'react';
import styled from 'styled-components';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { isNil } from 'lodash';
import Label from '../../atoms/Label';
import {
  BOOKING_STATUS_OPTIONS,
  generateBookingStatusDate,
  INITIAL_BOOKING_STATUS_FORM
} from '../../../utils';
import SelectInputField, { customStyles } from '../../atoms/SelectInputField';
import ErrorMsg from '../../atoms/ErrorMsg';
import TextAreaField from '../../atoms/TextAreaField';
import ConfirmAction from '../ConfirmAction';
import Button from '../../atoms/Button';
import { IBooking,IBookingStatusForm, ICredential } from '../../../models';
import { closeModal } from '../../../store';
import TextInputField from '../../atoms/TextInputField';

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
    border-left: ${({ theme }) => `1px solid ${theme.green}`};

    @media (max-width: 835px) {
      border: none;
      padding-left: 0;
    }
  }

  &.bookingStatus {
    width: 80%;
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
    formState: { errors },
    control,
    reset
  } = useForm<IBookingStatusForm>({
    defaultValues: {
      bookingStatus: BOOKING_STATUS_OPTIONS[0],
      bookingParticipants: '',
      bookingComments: ''
    }
  });

  /**
   * Function to update initial form state of already saved data.
   */
  const editBookingStatusHandler = () => {
    if (isNil(bookingTimeIndex)) {
      return;
    }
    const { status, participants, comments } = currentBooking.bookingTime[bookingTimeIndex];
    const bookingStatus =
      BOOKING_STATUS_OPTIONS.find((bso) => bso.value === status) || BOOKING_STATUS_OPTIONS[0];
    reset({ bookingStatus, bookingParticipants: participants, bookingComments: comments });
  };

  /**
   * Function to submit additional status form fields.
   * This is related to admin and employee. To change the status of selected reservation.
   * @param cred
   */
  const onSubmit: SubmitHandler<IBookingStatusForm> = (cred) => {
    if (isNil(bookingTimeIndex)) return;

    setBookingData(generateBookingStatusDate(cred, currentBooking, bookingTimeIndex));
    setDisplayConfirmation(true);
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
   * Function to confirm submission action and pass it to parent component.
   */
  const confirmSubmit = () => {
    if (!bookingData) return;

    submitHandler(bookingData);

    createInitialState();
    dispatch(closeModal());
  };

  /**
   * Function to restore initial status.
   */
  const createInitialState = () => {
    reset({ ...INITIAL_BOOKING_STATUS_FORM });
    setDisplayConfirmation(false);
    setBookingData(undefined);
  };

  /**
   * Function handle cancel action.
   */
  const cancelHandler = () => {
    createInitialState();
    dispatch(closeModal());
  };

  React.useEffect(() => {
    editBookingStatusHandler();

    return () => {
      cancelHandler();
    };
  }, []);

  return (
    <BookingTimeStatusWrapper className={confirmationClass}>
      <Label>Status</Label>
      <Controller
        name="bookingStatus"
        defaultValue={BOOKING_STATUS_OPTIONS[0]}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectInputField
            options={BOOKING_STATUS_OPTIONS}
            styles={customStyles(false)}
            placeholder="Wybierz"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
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
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
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
        rules={{ required: false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextAreaField
            placeholder="Wiadomość"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={!hasRights || !currentBooking.accepted || displayConfirmation}
            style={{ width: '100%' }}
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
              onClick={handleSubmit(onSubmit, onError)}
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
