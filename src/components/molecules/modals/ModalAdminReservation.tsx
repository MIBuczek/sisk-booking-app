import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import MultipleRecords from 'components/atoms/MultipleRecords';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import { IAdminState, IReduxState, TSelect } from 'models';
import { IBookingForm } from 'models/forms/booking-form-models';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBuilding } from 'store';
import styled from 'styled-components';
import {
  BUILDINGS_OPTIONS,
  CITY_OPTIONS,
  RECORDS_BOOKING_HEADERS,
  RECORDS_BOOKING_ROW
} from 'utils';
import { BOOKING_INITIAL_VALUE } from 'utils/variables/form-const';
import NewReservationForm from '../forms/NewReservationForm';

const ReservationWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 40px 80px;
  justify-content: space-between;
  max-width: 1820px;
`;

const ReservationHeader = styled(Header)`
  width: 100%;
  margin: 20px 0 40px 20px;
`;

const ReservationSubHeader = styled(Header)`
  font-size: ${({ theme }) => theme.fontSize.m};
  width: 100%;
  margin: 15px 0 25px;
`;

const ReservationInnerContent = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 40px 0 20px;
  &:first-of-type {
    flex-direction: row;
    flex-wrap: wrap;
    width: 900px;
    border-right: ${({ theme }) => `1px solid ${theme.green}`};
  }
`;

const ReservationSelectWrapper = styled(SelectWrapper)`
  margin-top: 0;
`;

interface IProps {
  adminState: IAdminState;
}

const ModalAdminReservation: React.FC<IProps> = ({ adminState }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItemIndex, setEditedItemIndex] = React.useState<number | undefined>(undefined);

  const dispatch = useDispatch();
  const { bookings } = useSelector((state: IReduxState) => state.bookingStore);

  const { errors, control, watch } = useForm<IBookingForm>({
    defaultValues: { ...BOOKING_INITIAL_VALUE, ...adminState }
  });

  const cityValue = watch('city');

  const selectBuilding = (): TSelect[] => {
    if (!cityValue) return [];
    return BUILDINGS_OPTIONS[cityValue.value];
  };

  const editReservationHandler = (index: number) => {
    setIsEditing(true);
    setEditedItemIndex(index);
  };

  const deleteReservationHandler = (index: number) => {
    const currentReservation = bookings[index];
    if (currentReservation.id) dispatch(deleteBuilding(currentReservation.id));
    initialEditingState();
  };

  const initialEditingState = () => {
    setIsEditing(false);
    setEditedItemIndex(undefined);
  };

  return (
    <ReservationWrapper>
      <ReservationHeader>Rezerwacje</ReservationHeader>
      <ReservationInnerContent>
        <ReservationSubHeader>Lista Rezerwacji</ReservationSubHeader>
        <ReservationSelectWrapper>
          <Label>Miejscowość</Label>
          <Controller
            name="city"
            defaultValue={adminState.city}
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
                defaultValue={adminState.city}
              />
            )}
          />
        </ReservationSelectWrapper>
        <ReservationSelectWrapper>
          <Label>Obiekt</Label>
          <Controller
            name="building"
            defaultValue={adminState.building}
            control={control}
            rules={{ required: true }}
            render={({ onChange, onBlur, value }) => (
              <SelectInputField
                options={selectBuilding()}
                styles={customStyles(!!errors.building)}
                placeholder="Wybierz"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                isDisabled={!cityValue}
                defaultValue={adminState.building}
              />
            )}
          />
        </ReservationSelectWrapper>
        <MultipleRecords
          title="bookings"
          headers={RECORDS_BOOKING_HEADERS}
          dataProperty={RECORDS_BOOKING_ROW}
          records={bookings}
          editHandler={editReservationHandler}
          deleteHandler={deleteReservationHandler}
          emptyText={`Nie został dodany żadny budynek w ${adminState.city?.label}`}
        />
      </ReservationInnerContent>
      <ReservationInnerContent>
        <NewReservationForm
          mainState={adminState}
          isAdmin={true}
          isEditing={isEditing}
          editedItemIndex={editedItemIndex}
          initialEditingState={initialEditingState}
        />
      </ReservationInnerContent>
    </ReservationWrapper>
  );
};

export default ModalAdminReservation;
