import * as React from 'react';
import styled from 'styled-components';
import { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import { Controller, useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { DataPickerField } from '../atoms/DatapickerField';
import Header from '../atoms/Header';
import TextInputField from '../atoms/TextInputField';
import SelectInputField, { customStyles, SelectWrapper } from '../atoms/SelectInputField';
import Checkbox from '../atoms/Checkbox';
import Anchor from '../atoms/Anchor';
import Button from '../atoms/Button';
import TextAreaField from '../atoms/TextAreaField';
import ErrorMsg from '../atoms/ErrorMsg';
import Label from '../atoms/Label';
import { TSelect } from '../../models/components/select-model';
import { closeModal } from '../../store/modal/modalAction';
import {
  BUILDINGS_OPTIONS,
  CITY_OPTIONS,
  SIZE_FIELD_OPTIONS
} from '../../utils/variables/options-const';
import { IBooking } from '../../models';
import { addBooking } from '../../store/bookings/bookingsAction';

registerLocale('pl', pl);

const ReservationWrapper = styled.form`
  padding: 20px;
  max-width: 670px;
  display: flex;
  flex-wrap: wrap;
  button {
    align-self: flex-end;
  }
`;

const ReservationHeader = styled(Header)`
  width: 100%;
  margin: 20px 0 40px;
`;

const InputContainer = styled.div`
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RodoWrapper = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  margin: 10px;
`;

const MessageTextArea = styled(TextAreaField)`
  width: 100%;
  margin: 10px;
`;

const ModalReservation = () => {
  const [police, setPolice] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const { handleSubmit, errors, control, watch } = useForm();

  const cityValue = watch('city');
  const buildingValue = watch('building');
  const regularValue = watch('regular');

  const selectBuilding = (): TSelect[] => {
    if (!cityValue) return [];
    return BUILDINGS_OPTIONS[cityValue.value];
  };

  const selectSizeField = (): TSelect[] => {
    if (!buildingValue || !cityValue) return [];
    return SIZE_FIELD_OPTIONS[cityValue.value][buildingValue.value];
  };

  const onSubmit = handleSubmit<IBooking>(async (cred) => {
    dispatch(
      addBooking({
        ...cred,
        accepted: false
      })
    );
    dispatch(closeModal());
  });

  return (
    <ReservationWrapper onSubmit={onSubmit}>
      <ReservationHeader>Wyślij prośbę o rezerwacje</ReservationHeader>
      <SelectWrapper>
        <Label>Miejscowość</Label>
        <Controller
          name="city"
          defaultValue={''}
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
            />
          )}
        />
        {errors.city && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
      </SelectWrapper>
      <SelectWrapper>
        <Label>Obiekt</Label>
        <Controller
          name="building"
          defaultValue={''}
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
            />
          )}
        />
        {errors.building && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
      </SelectWrapper>
      <SelectWrapper>
        <Label>Wynajmowana powierzchnia</Label>
        <Controller
          name="size"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <SelectInputField
              options={selectSizeField()}
              styles={customStyles(!!errors.size)}
              placeholder="Wybierz"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              isDisabled={!cityValue || !buildingValue}
            />
          )}
        />
        {errors.size && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
      </SelectWrapper>
      <SelectWrapper>
        <RodoWrapper>
          <Label>Czy jest to rezerwacja cykliczna</Label>
          <Controller
            name="regular"
            defaultValue={false}
            control={control}
            rules={{ required: true }}
            render={({ onChange, onBlur, value }) => (
              <Checkbox
                checked={value}
                className="checkbox"
                name="regular"
                changeHandler={onChange}
              />
            )}
          />
        </RodoWrapper>
      </SelectWrapper>
      <InputContainer>
        <Label>Imie i nazwisko</Label>
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
            />
          )}
        />
        {errors.person && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
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
            />
          )}
        />
        {errors.email && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
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
            />
          )}
        />
        {errors.phone && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
      </InputContainer>
      <InputContainer>
        <Label>{`${regularValue ? 'Od kiedy' : 'Kiedy'} chciałby zarezerwować obiekt`}</Label>
        <Controller
          name="when"
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
              invalid={!!errors.when}
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
            />
          )}
        />
        {errors.when && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        {regularValue && (
          <>
            <Label>Do kiedy chciałby zarezerwować obiekt</Label>
            <Controller
              name="whenEnd"
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
                  invalid={!!errors.whenEnd}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
            {errors.whenEnd && (
              <ErrorMsg>
                Pole nie moze byc puste <BsExclamationCircle />
              </ErrorMsg>
            )}
          </>
        )}
        <Label>Od której godziny</Label>
        <Controller
          name="start"
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
              invalid={!!errors.start}
              timeIntervals={15}
              timeCaption="Godzina"
              dateFormat="h:mm aa"
              locale="pl"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
            />
          )}
        />
        {errors.start && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>Do której godziny</Label>
        <Controller
          name="end"
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
              invalid={!!errors.end}
              timeIntervals={15}
              timeCaption="Godzina"
              dateFormat="h:mm aa"
              locale="pl"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
            />
          )}
        />
        {errors.end && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
      </InputContainer>
      <Label>Chciałbyś przesłać dodatkowe informacje </Label>
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
          />
        )}
      />
      <RodoWrapper>
        <Checkbox
          checked={police}
          className="checkbox"
          name="police"
          changeHandler={() => setPolice(!police)}
        />
        <Anchor
          small
          href="http://www.sisk-siechnice.pl/wp-content/uploads/2019/09/Klauzula-informacyjna-do-formularza-kontaktowego-SISK.pdf"
          target="_blank"
        >
          Klauzula informacyjna do formularza kontaktowego o przetwarzaniu danych osobowych
        </Anchor>
      </RodoWrapper>
      <Button role="button" onClick={onSubmit} disabled={!police}>
        Wyślij Rezerwacje
      </Button>
    </ReservationWrapper>
  );
};

export default ModalReservation;
