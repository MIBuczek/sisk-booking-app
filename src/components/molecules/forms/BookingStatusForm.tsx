import Button from 'components/atoms/Button';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import SelectInputField, { customStyles } from 'components/atoms/SelectInputField';
import TextAreaField from 'components/atoms/TextAreaField';
import { IBooking, IBookingsPayload, IBookingStatusForm, IReduxState } from 'models';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, updateBooking } from 'store';
import styled from 'styled-components';
import {
  BOOKING_STATUS_OPTIONS,
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
  padding: 20px 0;
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
  editedItemIndex?: number;
}

const BookingStatusForm: React.FunctionComponent<BookingStatusFormProps> = ({
  editedItemIndex
}) => {
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
  const [bookingData, setBookingData] = React.useState<IBooking | undefined>(undefined);

  const dispatch = useDispatch();
  const { bookings } = useSelector((state: IReduxState): IBookingsPayload => state.bookingStore);

  const { handleSubmit, errors, control, reset } = useForm<IBookingStatusForm>();

  const onSubmit = handleSubmit<IBookingStatusForm>(async (cred) => {
    if (typeof editedItemIndex === 'undefined') return;
    const currentBooking = bookings[editedItemIndex];
    setBookingData(generateBookingStatusDate(cred, currentBooking));
    setDisplayConfirmation(true);
  });

  const confirmSubmit = () => {
    if (!bookingData) return;

    dispatch(updateBooking(bookingData));

    createInitialState();
    dispatch(closeModal());
  };

  const createInitialState = () => {
    reset({ ...INITIAL_BOOKING_STATUS_FORM });
    setDisplayConfirmation(false);
    setBookingData(undefined);
  };

  const cancelHandler = () => {
    createInitialState();
    dispatch(closeModal());
  };

  return (
    <BookingStatusWrapper>
      <BookingStatusHeader>Rozlicz Rezerwacje</BookingStatusHeader>
      <InnerContent>
        <Label>Status</Label>
        <Controller
          name="bookingStatus"
          defaultValue={BOOKING_STATUS_OPTIONS[0]}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <SelectInputField
              options={BOOKING_STATUS_OPTIONS}
              styles={customStyles(false)}
              placeholder="Wybierz"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              value={value}
              isDisabled={displayConfirmation}
            />
          )}
        />
        {errors.bookingStatus && <ErrorMsg innerText="Pole nie moze byc puste" />}
        <Label>Uwagi</Label>
        <Controller
          name="message"
          defaultValue={''}
          control={control}
          rules={{ required: false }}
          render={({ onChange, onBlur, value }) => (
            <TextAreaField
              placeholder="Wiadomość"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              disabled={displayConfirmation}
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
