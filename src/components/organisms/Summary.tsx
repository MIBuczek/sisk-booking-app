import * as React from 'react';
import { DataPickerField } from 'components/atoms/DatapickerField';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import { IReduxState, ISummaryClientBookings, TSelect } from 'models';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import pl from 'date-fns/locale/pl';
import { registerLocale } from 'react-datepicker';
import Button from 'components/atoms/Button';
import {
  findAllClientReservation,
  generateReservationSummary,
  INITIAL_CLIENT_BOOKING_DETAILS
} from 'utils';
import { cloneDeep } from 'lodash';

registerLocale('pl', pl);

const SummaryWrapper = styled.section`
  width: 60%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 30px 0;
  z-index: 0;
`;

const SummaryHeader = styled(Header)`
  margin: 20px 0 40px 20px;
  width: 100%;
  height: 40px;
`;

const SummaryInputContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  max-height: 350px;
  align-items: center;
`;

const SummaryDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
`;

const MonthPickerWrapper = styled(SelectWrapper)`
  .react-datepicker {
    border-color: ${({ theme }) => theme.green};
    .react-datepicker__header {
      height: 30px;
    }
    .react-datepicker__month {
      width: 290px;
      font-size: 12px;
    }
  }
`;

const MonthPicker = styled(DataPickerField)`
  width: 290px;
  height: 35px;
  border-radius: 5px;
`;

const SummaryBtn = styled(Button)`
  width: 290px;
  margin-top: auto;
`;

const Summary = () => {
  const [clientSummary, setClientSummary] = React.useState<ISummaryClientBookings>(
    INITIAL_CLIENT_BOOKING_DETAILS
  );

  const {
    clientStore: { clients },
    bookingStore: { bookings }
  } = useSelector((state: IReduxState) => state);

  const { control, watch } = useForm();

  const clientValue: TSelect = watch('client');
  const monthValue: Date = watch('month');

  const generateClientsOptions = (): TSelect[] => {
    if (!clients.length) return [];

    return clients.map((c) => ({ label: c.name, value: c?.id || c.name }));
  };

  const generateClientSummary = (): void => {
    if (!clientValue || !monthValue || !clients) return;

    const currentClient = clients.find((c) => c.id === clientValue.value);

    if (!currentClient) return;

    const allClientReservations = findAllClientReservation(bookings, clientValue, monthValue);

    const initialSummary = cloneDeep({
      ...INITIAL_CLIENT_BOOKING_DETAILS,
      clientName: currentClient.name || currentClient.contactPerson
    });

    setClientSummary(generateReservationSummary(initialSummary, allClientReservations));
  };

  return (
    <SummaryWrapper>
      <SummaryHeader>Podsumowanie Najmów</SummaryHeader>
      <SummaryInputContent>
        <SelectWrapper>
          <Label>Wybrany klient</Label>
          <Controller
            name="client"
            control={control}
            rules={{ required: true }}
            render={({ onChange, onBlur, value }) => (
              <SelectInputField
                options={generateClientsOptions()}
                styles={customStyles(false)}
                placeholder="Wybierz"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                value={value}
              />
            )}
          />
        </SelectWrapper>
        <MonthPickerWrapper>
          <Label>Wybierz miesiac</Label>
          <Controller
            name="month"
            defaultValue={new Date()}
            control={control}
            rules={{ required: true }}
            render={({ value, onChange, onBlur }) => (
              <MonthPicker
                placeholderText="Wybierz"
                dateFormat="MM/yyyy"
                showMonthYearPicker
                shouldCloseOnSelect
                locale="pl"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
        </MonthPickerWrapper>
        <SummaryBtn type="button" onClick={generateClientSummary}>
          Generuj podsumowanie
        </SummaryBtn>
      </SummaryInputContent>
      <SummaryDetailContent>h1</SummaryDetailContent>
    </SummaryWrapper>
  );
};

export default Summary;
