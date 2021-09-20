import * as React from 'react';
import styled from 'styled-components';
import { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import { Controller, useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import {
  inntialReservation,
  IReservation,
  ReservationState,
} from '../../models/modals/reservation-models';
import { DataPickerField } from '../atoms/DatapickerField';
import Header from '../atoms/Header';
import TextInputField from '../atoms/TextInputField';
import SelectInputField, { customStyles, SelectWrapper } from '../atoms/SelectInputField';
import { options } from '../../utils/utils-data';
import Checkbox from '../atoms/Checkbox';
import Anhore from '../atoms/Anhore';
import Button from '../atoms/Button';
import TextAreaField from '../atoms/TextAreaField';
import ErrorMsg from '../atoms/ErrorMsg';
import Label from '../atoms/Label';
import { TSelect } from '../../models/components/select-model';

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
  width: 100%;
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
  const [reservation, setReservation] = React.useState<IReservation>({ ...inntialReservation });

  const { from, to, when, person, phone, email, bulding, city, police, message } = reservation;

  const { register, handleSubmit, setValue, errors, control } = useForm();

  const reservationHandler = (value: ReservationState, name: string): void => {
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = handleSubmit((cred) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(cred));
  });

  return (
    <ReservationWrapper onSubmit={onSubmit}>
      <ReservationHeader>Wyślij prośbę o rezerwacje</ReservationHeader>
      <SelectWrapper>
        <Label>Miejscowość</Label>
        <Controller
          name="city"
          defaultValue={city}
          control={control}
          rules={{ required: true }}
          render={() => (
            <SelectInputField
              value={city}
              options={options}
              styles={customStyles(!!errors.city)}
              placeholder="Wybierz"
              onChange={(selected: TSelect) => reservationHandler(selected, 'city')}
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
          name="bulding"
          defaultValue={bulding}
          control={control}
          rules={{ required: true }}
          render={() => (
            <SelectInputField
              value={bulding}
              options={options}
              styles={customStyles(!!errors.bulding)}
              placeholder="Wybierz"
              onChange={(selected: TSelect) => reservationHandler(selected, 'bulding')}
            />
          )}
        />
        {errors.bulding && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
      </SelectWrapper>
      <InputContainer>
        <Label>Imie i nazwisko</Label>
        <TextInputField
          name="person"
          placeholder="Wpisz"
          value={person}
          invalid={!!errors.person}
          onChange={({ target }) => reservationHandler(target.value as string, target.name)}
          ref={register({ required: true })}
        />
        {errors.person && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>Adres e-mail</Label>
        <TextInputField
          name="email"
          placeholder="Wpisz"
          value={email}
          invalid={!!errors.email}
          onChange={({ target }) => reservationHandler(target.value as string, target.name)}
          ref={register({ required: true })}
        />
        {errors.email && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>Podaj numer telefonu</Label>
        <TextInputField
          name="phone"
          placeholder="Wpisz"
          value={phone}
          invalid={!!errors.phone}
          onChange={({ target }) => reservationHandler(target.value as string, target.name)}
          ref={register({ required: true })}
        />
        {errors.phone && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
      </InputContainer>
      <InputContainer>
        <Label>Kiedy chciałby zarezerwować obiekt</Label>
        <Controller
          name="when"
          defaultValue={when}
          control={control}
          rules={{ required: true }}
          render={() => (
            <DataPickerField
              showTimeSelect={false}
              isClearable
              shouldCloseOnSelect
              placeholderText="Wybierz"
              locale="pl"
              invalid={!!errors.when}
              selected={when}
              onChange={(date: Date) => reservationHandler(date, 'when')}
            />
          )}
        />
        {errors.when && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>Od której godziny</Label>
        <Controller
          name="from"
          defaultValue={from}
          control={control}
          rules={{ required: true }}
          render={() => (
            <DataPickerField
              selected={from}
              placeholderText="Wybierz"
              showTimeSelect
              showTimeSelectOnly
              isClearable
              shouldCloseOnSelect
              invalid={!!errors.from}
              timeIntervals={15}
              timeCaption="Godzina"
              dateFormat="h:mm aa"
              locale="pl"
              onChange={(date) => reservationHandler(date as Date, 'from')}
            />
          )}
        />
        {errors.from && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>Do której godziny</Label>
        <Controller
          name="to"
          defaultValue={to}
          control={control}
          rules={{ required: true }}
          render={() => (
            <DataPickerField
              selected={to}
              placeholderText="Wybierz"
              showTimeSelect
              showTimeSelectOnly
              isClearable
              shouldCloseOnSelect
              invalid={!!errors.to}
              timeIntervals={15}
              timeCaption="Godzina"
              dateFormat="h:mm aa"
              locale="pl"
              onChange={(date) => reservationHandler(date as Date, 'to')}
            />
          )}
        />
        {errors.to && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
      </InputContainer>
      <Label>Chciałbyś przesłać dodatkowe informacje </Label>
      <MessageTextArea
        name="message"
        placeholder="Wpisz..."
        value={message}
        onChange={({ target }) => reservationHandler(target.value, target.name)}
        ref={register({ required: true })}
      />
      <RodoWrapper>
        <Checkbox
          checked={police}
          className="checkbox"
          name="police"
          changeHandler={reservationHandler}
        />
        <Anhore
          small
          href="http://www.sisk-siechnice.pl/wp-content/uploads/2019/09/Klauzula-informacyjna-do-formularza-kontaktowego-SISK.pdf"
          target="_blank"
        >
          Klauzula informacyjna do formularza kontaktowego o przetwarzaniu danych osobowych
        </Anhore>
      </RodoWrapper>
      <Button
        role="button"
        onClick={() => {
          setValue('email', email);
          setValue('phone', phone);
        }}
        disabled={!police}
      >
        Wyślij Rezerwacje
      </Button>
    </ReservationWrapper>
  );
};

export default ModalReservation;
