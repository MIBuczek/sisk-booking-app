import * as React from 'react';
import { DataPickerField } from 'components/atoms/DatapickerField';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import { CSVReportData, IReduxState, ISummaryClientBookings, TSelect } from 'models';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import pl from 'date-fns/locale/pl';
import { registerLocale } from 'react-datepicker';
import Button from 'components/atoms/Button';
import {
  csvClientSummary,
  findAllClientReservation,
  generateReservationSummary,
  INITIAL_CLIENT_BOOKING_DETAILS,
  modelDisplayValue,
  RECORDS_CLIENTS_DETAILS_PROPERTY_MAP,
  RECORDS_CLIENTS_ROW_DETAILS,
  summaryTotalBookingsNumber
} from 'utils';
import { cloneDeep, isEmpty } from 'lodash';
import Paragraph from 'components/atoms/Paragraph';
import { fadeInLeft } from 'style/animation';
import ErrorMsgServer from 'components/atoms/ErrorMsgServer';
import { BsFilePdf, BsFileEarmarkRuledFill } from 'react-icons/bs';
import { CSVLink } from 'react-csv';
import Checkbox from '../atoms/Checkbox';
import { printPDFReport } from '../molecules/modals/PreviewPDF';
import { LoaderDots } from '../molecules/Loading';
import ErrorMsg from '../atoms/ErrorMsg';
import { csvFileHeaders } from '../../utils/variables/csv-file-headers';

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
  position: relative;
  display: flex;
  flex-direction: column;
  width: 65%;
  min-height: 550px;
  padding: 20px 0 20px 40px;
  animation: ${fadeInLeft} 0.5s linear;

  @media (max-width: 1200px) {
    width: 55%;
  }

  @media (max-width: 890px) {
    width: 90%;
  }
`;

const InputWrapper = styled(SelectWrapper)`
  flex-direction: row;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`;

const MonthPickerWrapper = styled(SelectWrapper)`
  flex-direction: row;
  flex-wrap: wrap;

  span {
    display: block;
    width: 100%;
    text-align: center;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  .react-datepicker {
    border-color: ${({ theme }) => theme.green};

    .react-datepicker__header {
      height: 30px;
    }

    .react-datepicker__month {
      width: 290px;
      font-size: 14px;
    }
  }

  @media (max-width: 900px) {
    width: 290px;
    justify-content: flex-start;
  }
`;

const MonthPicker = styled(DataPickerField)`
  width: 120px;
  height: 35px;
  border-radius: 5px;
  margin: 0 10px;
`;

const SummaryBtn = styled(Button)`
  width: 290px;
  position: relative;
  left: 0;
  top: 150px;

  @media (max-width: 890px) {
    margin: 20px 10px;
    position: static;
  }
`;

const DetailsParagraph = styled(Paragraph)`
  font-size: 14px;
  padding-top: 12px;

  &.empty {
    text-align: center;
  }
`;

const ClientDetailTable = styled.table`
  width: 100%;
  height: auto;
  display: block;
  padding: 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.green}`};
  margin-bottom: 20px;

  tbody {
    display: inherit;
    width: 100%;

    tr {
      display: flex;
      align-items: flex-start;
      width: 100%;
    }
  }
`;

const ClientDetailWrapper = styled.tr`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
`;

const DetailContent = styled.td`
  display: flex;
  align-items: flex-start;
  height: auto;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.darkGrey};
  word-break: break-word;
  width: 100%;
  padding: 5px 5px 5px 0;

  strong {
    margin: 0 10px 5px 0;
  }

  &:first-of-type {
    strong {
      letter-spacing: 0.2px;
    }
  }

  &:last-of-type {
    padding-right: 0;
  }
`;

const DetailsSpan = styled.span`
  font-weight: 400;
  margin: 0 4rem 0 0.5rem;
  font-size: 14px;
`;

const pdfIconStyles = {
  fontSize: '2rem',
  marginLeft: '1rem',
  color: 'AFBF36'
};

const ButtonPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: ${({ theme }) => `1px solid ${theme.green}`};
  margin-top: 2rem;
`;

const PDFButton = styled(Button)`
  width: 290px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.ml};
  line-height: 1.5;
  text-decoration: none;
  transition: 0.4s;
  background: transparent;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.green};
    background: ${({ theme }) => theme.middleGray};
  }
`;

const CSVButton = styled(CSVLink)`
  width: 290px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.ml};
  line-height: 1.5;
  text-decoration: none;
  transition: 0.4s;
  background: ${({ theme }) => theme.green};
  margin-left: auto;

  &:hover {
    box-shadow: 0 0 17px -7px rgba(66, 68, 90, 1);
    opacity: 0.8;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Summary = () => {
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [clientSummary, setClientSummary] = React.useState<ISummaryClientBookings>(
    cloneDeep(INITIAL_CLIENT_BOOKING_DETAILS)
  );
  const [csvReportData, setCSVReportData] = React.useState<CSVReportData[]>([]);
  const [isSummaryGenerated, setIsSummaryGenerated] = React.useState<boolean>(false);

  const {
    clientStore: { clients, errorMessage: errorClient },
    bookingStore: { bookings, errorMessage: errorBooking }
  } = useSelector((state: IReduxState) => state);

  const { handleSubmit, control, watch, reset, errors } = useForm();

  const { client: clientValue, fromMonth, toMonth, fromTheBeginning } = watch();

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
  const generateClientSummary = handleSubmit((): void => {
    setIsGenerating(true);
    if (!clientValue.value || !fromMonth || !clients) {
      setIsSummaryGenerated(false);
      setIsGenerating(false);
      return;
    }

    const currentClient = clients.find((c) => c.id === clientValue.value);

    if (!currentClient) return;

    const allClientReservations = findAllClientReservation(bookings, clientValue);

    const initialSummary = cloneDeep({
      ...INITIAL_CLIENT_BOOKING_DETAILS,
      client: cloneDeep(currentClient)
    });

    setClientSummary(
      generateReservationSummary(
        initialSummary,
        allClientReservations,
        fromTheBeginning,
        fromMonth,
        toMonth
      )
    );

    setCSVReportData(
      csvClientSummary(currentClient, allClientReservations, fromTheBeginning, fromMonth, toMonth)
    );
    setIsSummaryGenerated(true);

    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  });

  /**
   * Function to restore initial status.
   */
  const clearSummary = (): void => {
    setClientSummary(cloneDeep(INITIAL_CLIENT_BOOKING_DETAILS));
    setIsSummaryGenerated(false);
    setIsGenerating(false);
    reset({
      client: { label: '', value: '' },
      fromMonth: new Date(),
      toMonth: new Date()
    });
  };

  /**
   * Function to update field in toMonth in form if fromMonth change.
   */
  const updateToMonthDataInForm = (): void => {
    reset({ client: clientValue, fromMonth, toMonth: fromMonth, fromTheBeginning });
  };

  /**
   * Function to open current client pdf report in new window.
   */
  const generatePdfReport = () => {
    printPDFReport(clientSummary);
  };

  /**
   * Function to generate csv file name base on current client name and selected month.
   */
  const generateFileName = (): string => {
    if (clientSummary.client) {
      const partFileName = fromTheBeginning
        ? 'od początku'
        : `${fromMonth.getMonth()}-${toMonth.getMonth()}.${toMonth.getFullYear()}`;
      return `${clientSummary.client.name} [${partFileName}]`.toLowerCase();
    }
    return 'raport clienta';
  };

  React.useEffect(() => {
    updateToMonthDataInForm();
  }, [fromMonth]);

  return (
    <SummaryWrapper>
      <SummaryHeader>Podsumowanie Najmów</SummaryHeader>
      {(errorClient || errorBooking) && <ErrorMsgServer innerText={errorClient || errorBooking} />}
      <SummaryInputContent>
        <SelectWrapper>
          <Label>Wybrany klient</Label>
          <Controller
            name="client"
            defaultValue={{ label: '', value: '' }}
            control={control}
            rules={{ required: true }}
            render={({ onChange, onBlur, value }: ControllerRenderProps) => (
              <SelectInputField
                options={generateClientsOptions()}
                styles={customStyles(false)}
                placeholder="Wybierz"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                value={value}
                blurInputOnSelect
              />
            )}
          />
          {errors.client && <ErrorMsg innerText="Pole nie może być puste" />}
        </SelectWrapper>
        <MonthPickerWrapper>
          <Label>Wybierz zakres daty</Label>
          <Controller
            name="fromMonth"
            defaultValue={new Date()}
            control={control}
            rules={{ required: true }}
            render={({ value, onChange, onBlur }: ControllerRenderProps) => (
              <MonthPicker
                placeholderText="Wybierz"
                dateFormat="MM/yyyy"
                showMonthYearPicker
                shouldCloseOnSelect
                locale="pl"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                disabled={fromTheBeginning}
              />
            )}
          />
          <Controller
            name="toMonth"
            defaultValue={new Date()}
            control={control}
            rules={{ required: true }}
            render={({ value, onChange, onBlur }: ControllerRenderProps) => (
              <MonthPicker
                placeholderText="Wybierz"
                dateFormat="MM/yyyy"
                showMonthYearPicker
                shouldCloseOnSelect
                locale="pl"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                disabled={fromTheBeginning}
              />
            )}
          />
        </MonthPickerWrapper>
        <InputWrapper>
          <Label>Podsumowanie całościowe</Label>
          <Controller
            name="fromTheBeginning"
            defaultValue={false}
            control={control}
            render={({ onChange, value }: ControllerRenderProps) => (
              <Checkbox
                checked={value}
                className="checkbox"
                name="fromTheBeginning"
                changeHandler={onChange}
                disabled={false}
              />
            )}
          />
        </InputWrapper>
        <SummaryBtn type="button" onClick={generateClientSummary}>
          Generuj podsumowanie
        </SummaryBtn>
        <SummaryBtn type="button" onClick={clearSummary} secondary>
          Wyczyść
        </SummaryBtn>
      </SummaryInputContent>
      <SummaryDetailContent>
        {isGenerating && (
          <LoadingWrapper>
            <LoaderDots type="ball-pulse" active />
          </LoadingWrapper>
        )}
        {!isGenerating && isSummaryGenerated && (
          <>
            <ClientDetailTable>
              <tbody>
                {RECORDS_CLIENTS_ROW_DETAILS.map((prop) => {
                  if (!isEmpty(clientSummary.client[prop])) {
                    return (
                      <ClientDetailWrapper key={prop}>
                        <DetailContent>
                          <strong>{RECORDS_CLIENTS_DETAILS_PROPERTY_MAP[prop]} : </strong>
                          {modelDisplayValue(prop, clientSummary.client[prop])}
                        </DetailContent>
                      </ClientDetailWrapper>
                    );
                  }
                  return null;
                })}
              </tbody>
            </ClientDetailTable>
            <DetailsParagraph bold>
              Radwanice :
              <DetailsSpan>{summaryTotalBookingsNumber(clientSummary.radwanice)}</DetailsSpan>
            </DetailsParagraph>
            <DetailsParagraph bold>
              Siechnice:
              <DetailsSpan>{summaryTotalBookingsNumber(clientSummary.siechnice)}</DetailsSpan>
            </DetailsParagraph>
            <DetailsParagraph bold>
              Świeta Katarzyna :
              <DetailsSpan>
                {summaryTotalBookingsNumber(clientSummary['swieta-katarzyna'])}
              </DetailsSpan>
            </DetailsParagraph>
            <DetailsParagraph bold>
              Żerniki Wrocławskie :
              <DetailsSpan>
                {summaryTotalBookingsNumber(clientSummary['zerniki-wroclawskie'])}
              </DetailsSpan>
            </DetailsParagraph>
            <ButtonPanel>
              <PDFButton type="button" onClick={generatePdfReport}>
                Wyświetl szczegóły
                <BsFilePdf style={pdfIconStyles} />
              </PDFButton>
              <CSVButton
                data={csvReportData}
                headers={csvFileHeaders}
                filename={generateFileName()}
              >
                Pobierz plik [.csv]
                <BsFileEarmarkRuledFill style={{ ...pdfIconStyles, color: '#FFF' }} />
              </CSVButton>
              ;
            </ButtonPanel>
          </>
        )}
        {!isGenerating && !isSummaryGenerated && (
          <DetailsParagraph bold className="empty">
            Aby zobaczyć posumowanie, wybierz klienta oraz miesiąc.
          </DetailsParagraph>
        )}
      </SummaryDetailContent>
    </SummaryWrapper>
  );
};

export default Summary;
