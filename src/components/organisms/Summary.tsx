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
import Paragraph from 'components/atoms/Paragraph';
import { fadeInLeft } from 'style/animation';
import SummaryDetailsItem from 'components/atoms/SummaryDetailItem';

registerLocale('pl', pl);

const SummaryWrapper = styled.section`
  width: 60%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 30px 0;
  z-index: 0;
  @media (max-width: 1400px) {
    width: 95%;
    height: fit-content;
  }
`;

const SummaryHeader = styled(Header)`
  margin: 20px 0 40px 20px;
  width: 100%;
  height: 40px;
  @media (max-width: 1400px) {
    width: 90%;
    margin: 20px 40px;
  }
`;

const SummaryInputContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  min-height: 90%;
  align-items: center;
  padding: 20px 40px 20px 0;
  border-right: ${({ theme }) => `1px solid ${theme.green}`};
  @media (max-width: 1200px) {
    width: 45%;
  }
  @media (max-width: 890px) {
    width: 90%;
    border-right-color: transparent;
    align-items: flex-start;
    padding: 20px 40px;
  }
`;

const SummaryDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  min-height: 90%;
  padding: 20px 40px;
  animation: ${fadeInLeft} 0.5s linear;
  @media (max-width: 1200px) {
    width: 55%;
  }
  @media (max-width: 890px) {
    width: 90%;
  }
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
  @media (max-width: 890px) {
    margin: 20px 10px;
  }
`;

const DetailsParagraph = styled(Paragraph)`
  font-size: 12px;
  padding-top: 12px;
  &.empty {
    text-align: center;
  }
`;

const DetailsSpan = styled.span`
  font-weight: 400;
  font-weight: 400;
  margin: 0 4rem 0 0.5rem;
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

  const { client: clientValue, month: monthValue } = watch();

  /**
   * Function to generate client options into dropdown.
   * @returns {Array<TSelect>}
   */
  const generateClientsOptions = (): TSelect[] => {
    if (!clients.length) return [];
    return clients.map((c) => ({ label: c.name, value: c?.id || c.name }));
  };

  /**
   * Function to generate summary according selected client.
   */
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
            defaultValue={{ label: '', value: '' }}
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
      <SummaryDetailContent>
        {clientSummary.clientName ? (
          <>
            <DetailsParagraph bold>
              Nazwa klienta : <DetailsSpan>{clientSummary.clientName}</DetailsSpan>
            </DetailsParagraph>
            <DetailsParagraph bold>
              Radwanice :<DetailsSpan>{clientSummary.radwanice.length} rezerwacji.</DetailsSpan>
            </DetailsParagraph>
            {clientSummary.radwanice.length ? (
              <SummaryDetailsItem bookingCityDetails={clientSummary.radwanice} />
            ) : null}
            <DetailsParagraph bold>
              Siechnice:
              <DetailsSpan>{clientSummary.siechnice.length} rezerwacji.</DetailsSpan>
            </DetailsParagraph>
            {clientSummary.siechnice.length ? (
              <SummaryDetailsItem bookingCityDetails={clientSummary.siechnice} />
            ) : null}
            <DetailsParagraph bold>
              Świeta Katarzyna :
              <DetailsSpan>{clientSummary['swieta-katarzyna'].length} rezerwacji.</DetailsSpan>
            </DetailsParagraph>
            {clientSummary['swieta-katarzyna'].length ? (
              <SummaryDetailsItem bookingCityDetails={clientSummary['swieta-katarzyna']} />
            ) : null}
            <DetailsParagraph bold>
              Żerniki Wrocławskie :
              <DetailsSpan>{clientSummary['zerniki-wroclawskie'].length} rezerwacji.</DetailsSpan>
            </DetailsParagraph>
            {clientSummary['zerniki-wroclawskie'].length ? (
              <SummaryDetailsItem bookingCityDetails={clientSummary['zerniki-wroclawskie']} />
            ) : null}
          </>
        ) : (
          <DetailsParagraph bold className="empty">
            Aby zobaczyc posumowanie wybierz klienta oraz miesiac
          </DetailsParagraph>
        )}
      </SummaryDetailContent>
    </SummaryWrapper>
  );
};

export default Summary;

// Miejscowosc , ilość rezerwacji
