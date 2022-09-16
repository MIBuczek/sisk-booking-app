import * as React from 'react';
import styled from 'styled-components';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
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
import { IBooking, IBookingStatusForm } from '../../../models';
import { closeModal } from '../../../store';

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

    @media (max-width: 800px) {
      border: none;
      padding-left: 0;
    }
  }

  &.bookingStatus {
    width: 80%;
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

  const { handleSubmit, errors, control, reset } = useForm<IBookingStatusForm>({
    defaultValues: { bookingStatus: BOOKING_STATUS_OPTIONS[0], bookingComments: '' }
  });

  /**
   * Function to update initial form state of already saved data.
   */
  const editBookingStatusHandler = () => {
    if (isNil(bookingTimeIndex)) {
      return;
    }
    const { status, comments } = currentBooking.bookingTime[bookingTimeIndex];
    const bookingStatus =
      BOOKING_STATUS_OPTIONS.find((bso) => bso.value === status) || BOOKING_STATUS_OPTIONS[0];
    reset({ bookingStatus, bookingComments: comments });
  };

  /**
   * Function to submit additional status form fields.
   * This is related to admin and employee. To change the status of selected reservation.
   * @param cred
   */
  const onSubmit = handleSubmit<IBookingStatusForm>(async (cred) => {
    if (isNil(bookingTimeIndex)) return;

    setBookingData(generateBookingStatusDate(cred, currentBooking, bookingTimeIndex));
    setDisplayConfirmation(true);
  });

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
        render={({ onChange, onBlur, value }: ControllerRenderProps) => (
          <SelectInputField
            options={BOOKING_STATUS_OPTIONS}
            styles={customStyles(false)}
            placeholder="Wybierz"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            value={value}
            isDisabled={!hasRights || displayConfirmation}
            blurInputOnSelect
            isSearchable={false}
          />
        )}
      />
      {errors.bookingStatus && <ErrorMsg innerText="Pole nie może być puste" />}
      <Label>Uwagi</Label>
      <Controller
        name="bookingComments"
        defaultValue={''}
        control={control}
        rules={{ required: false }}
        render={({ onChange, onBlur, value }: ControllerRenderProps) => (
          <TextAreaField
            placeholder="Wiadomość"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={!hasRights || displayConfirmation}
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
            <Button role="button" onClick={onSubmit}>
              Potwierdz
            </Button>
          )}
        </ButtonPanel>
      )}
    </BookingTimeStatusWrapper>
  );
};

export default BookingTimeStatusForm;
