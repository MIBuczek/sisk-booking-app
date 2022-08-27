import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
import { isEmpty } from 'lodash';
import { BsArrowLeft, BsPrinter } from 'react-icons/bs';
import { IClient, IReduxState } from '../../models';
import {
  modelDisplayValue,
  RECORDS_CLIENTS_DETAILS_PROPERTY_MAP,
  RECORDS_CLIENTS_ROW_DETAILS
} from '../../utils';
import Button from '../../components/atoms/Button';
import Header from '../../components/atoms/Header';
import { iconStyle } from '../../components/atoms/ButtonIcon';

const PDFWrapper = styled.section`
  position: relative;
  width: 620px;
  min-height: 82vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const PDFHeader = styled(Header)`
  margin-bottom: 40px;
  width: 100%;
  height: 40px;
  @media (max-width: 1400px) {
    width: 90%;
    margin: 20px 40px;
  }
`;

const ClientDetailTable = styled.table`
  width: 100%;
  height: auto;
  display: block;
  padding: 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.green}`};

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
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.darkGrey};
  word-break: break-word;
  width: 100%;
  padding: 5px 5px 5px 0;

  strong {
    margin-bottom: 5px;
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

const iconPrintStyle = {
  ...iconStyle,
  color: 'white'
};

const PrintBtn = styled(Button)`
  position: absolute;
  top: 40px;
  left: -250px;
  display: flex;
`;

const RedirectBtn = styled(Link)`
  position: absolute;
  top: 100px;
  left: -250px;
  min-width: 175px;
  width: fit-content;
  display: flex;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.ml};
  text-decoration: none;
  transition: 0.4s;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 8px 14px;
  line-height: 1.3;

  &:hover {
    border-color: ${({ theme }) => theme.green};
  }
`;

const PreviewPDF = (): JSX.Element => {
  const [currentClient, setCurrentClient] = React.useState<IClient | null>(null);

  const params = useParams() as { id: string };
  const location = useLocation();

  const {
    authStore: { auth },
    currentUserStore: { user },
    clientStore: { clients },
    bookingStore: { bookings }
  } = useSelector((state: IReduxState) => state);

  if (!auth?.uid || !user?.isAdmin || !params.id) {
    return <Redirect to={'/admin'} />;
  }

  /**
   * Function to generate summary according selected client.
   */
  const generateClientSummary = (): void => {
    const selectedClient = clients.find((c) => c.id === params.id);
    const monthValue = new URLSearchParams(location.search).get('month');

    if (!clients || !selectedClient || !monthValue) return;

    setCurrentClient(selectedClient);
  };

  React.useEffect(() => {
    generateClientSummary();
  }, []);

  return (
    <PDFWrapper>
      <PrintBtn type="button" onClick={() => window.print()}>
        <BsPrinter style={iconPrintStyle} />
        Wydrukuj Raport
      </PrintBtn>
      <RedirectBtn to="/admin">
        <BsArrowLeft style={iconStyle} />
        Powrót
      </RedirectBtn>
      <PDFHeader>Podsumowanie Najmów</PDFHeader>
      <ClientDetailTable>
        <tbody>
          <ClientDetailWrapper>
            {RECORDS_CLIENTS_ROW_DETAILS.map((prop) => {
              if (currentClient && !isEmpty(currentClient[prop])) {
                return (
                  <DetailContent key={prop}>
                    <strong>{RECORDS_CLIENTS_DETAILS_PROPERTY_MAP[prop]} : </strong>
                    {modelDisplayValue(prop, currentClient[prop])}
                  </DetailContent>
                );
              }
              return null;
            })}
          </ClientDetailWrapper>
        </tbody>
      </ClientDetailTable>
    </PDFWrapper>
  );
};

export default PreviewPDF;
