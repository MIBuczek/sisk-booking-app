import Button from 'components/atoms/Button';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import SelectInputField, { customStyles } from 'components/atoms/SelectInputField';
import TextAreaField from 'components/atoms/TextAreaField';
import { cloneDeep } from 'lodash';
import { bookingIndexTypeChecker, IBooking, IBookingStatusForm } from 'models';
import * as React from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeModal, updateBooking } from 'store';
import styled from 'styled-components';
import {
  BOOKING_STATUS_OPTIONS,
  formatDate,
  formatTime,
  generateBookingStatusDate,
  INITIAL_BOOKING_STATUS_FORM
} from 'utils';
import ConfirmAction from '../ConfirmAction';

const BookingStatusWrapper = styled.form`
  max-width: 670px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  button {
    align-self: flex-end;
  }
`;

const BookingStatusHeader = styled(Header)`
  width: 100%;
  margin: 20px 0 40px;
  padding: 0 20px;

  &:after {
    left: 20px;
  }
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 10px 0 20px;
`;

const ClientStatusDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  border-top: ${({ theme }) => `1px solid ${theme.green}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.green}`};
`;

const DetailsSpan = styled.span`
  font-weight: 400;
  margin: 8px 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.darkGrey};
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

interface BookingStatusFormProps {
  bookingsList: IBooking[];
  editedItemIndex?: number;
  editedSubItemIndex?: number;
}

const BookingStatusForm: React.FunctionComponent<BookingStatusFormProps> = ({
  bookingsList,
  editedItemIndex,
  editedSubItemIndex
}) => {
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
  const [bookingData, setBookingData] = React.useState<IBooking | undefined>(undefined);

  const dispatch = useDispatch();

  const { handleSubmit, errors, control, reset } = useForm<IBookingStatusForm>({
    defaultValues: { bookingStatus: BOOKING_STATUS_OPTIONS[0], bookingComments: '' }
  });

  const editBookingStatusHandler = () => {
    if (typeof editedItemIndex === 'undefined' || typeof editedSubItemIndex === 'undefined') return;
    const { status, comments } = bookingsList[editedItemIndex].bookingTime[editedSubItemIndex];
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
    if (typeof editedItemIndex === 'undefined' || typeof editedSubItemIndex === 'undefined') return;
    const currentBooking = cloneDeep(bookingsList[editedItemIndex]);
    setBookingData(generateBookingStatusDate(cred, currentBooking, editedSubItemIndex));
    setDisplayConfirmation(true);
  });

  /**
   * Function to confirm dispatch action.
   * If so then update firebase booking collection with new status.
   */
  const confirmSubmit = () => {
    if (!bookingData) return;

    dispatch(updateBooking(bookingData, true, false));

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
    <BookingStatusWrapper>
      <BookingStatusHeader>ROZLICZ REZERWACJĘ</BookingStatusHeader>
      {bookingIndexTypeChecker(editedItemIndex) && bookingIndexTypeChecker(editedSubItemIndex) ? (
        <ClientStatusDetails>
          <DetailsSpan>
            <strong>Klient: </strong>
            {bookingsList[editedItemIndex].person}
          </DetailsSpan>
          <DetailsSpan>
            <strong>Dzień: </strong>
            {formatDate(bookingsList[editedItemIndex].bookingTime[editedSubItemIndex].day)}
          </DetailsSpan>
          <DetailsSpan>
            <strong>Godzina rozpoczęcia: </strong>
            {formatTime(bookingsList[editedItemIndex].bookingTime[editedSubItemIndex].startHour)}
          </DetailsSpan>
          <DetailsSpan>
            <strong>Godzina zakońćzenia: </strong>
            {formatTime(bookingsList[editedItemIndex].bookingTime[editedSubItemIndex].endHour)}
          </DetailsSpan>
        </ClientStatusDetails>
      ) : null}
      <InnerContent>
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
              isDisabled={displayConfirmation}
              blurInputOnSelect
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
              disabled={displayConfirmation}
              style={{ width: '100%' }}
            />
          )}
        />
      </InnerContent>
      {displayConfirmation ? (
        <ConfirmAction
          message="Czy napewno chcesz rozliczyc tą rezerwacje"
          callback={confirmSubmit}
          cancelCallback={() => setDisplayConfirmation(false)}
        />
      ) : (
        <ButtonPanel>
          <Button role="button" secondary onClick={cancelHandler}>
            Anuluj
          </Button>
          <Button role="button" onClick={onSubmit}>
            Potwierdz
          </Button>
        </ButtonPanel>
      )}
    </BookingStatusWrapper>
  );
};

export default BookingStatusForm;
