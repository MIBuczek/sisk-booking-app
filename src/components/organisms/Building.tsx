import Button from 'components/atoms/Button';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import Paragraph from 'components/atoms/Paragraph';
import TextAreaField from 'components/atoms/TextAreaField';
import TextInputField from 'components/atoms/TextInputField';
import ConfirmAction from 'components/molecules/ConfirmAction';
import NewFormMessage from 'components/molecules/forms/NewFormMessage';
import { IAdminState, IBuilding, IEmployeeMessage } from 'models';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { fadeIn } from 'style/animation';
import styled from 'styled-components';
import {
  RADWANICE_BUILDINGS,
  SIECHNICE_BUILDINGS,
  SWIETA_KATARZYNA_BUILDING,
  ZERNIKI_WROCLAWSKIE_BUILDING
} from 'utils';
import { INITIAL_EMPLOYEE_MESSAGE } from 'utils/variables/eployee-message-const';

const BuildingWrapper = styled.article`
  width: 60%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 30px 0;
  z-index: 0;
`;

const BuildingHeader = styled(Header)`
  width: 100%;
  height: fit-content;
  margin: 20px 0 40px 20px;
`;

const BuildingSubHeader = styled(Header)`
  font-size: ${({ theme }) => theme.fontSize.ml};
  width: 85%;
  margin: 0 0 25px;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 80%;
  padding: 20px 0 40px 40px;
  &:first-of-type {
    width: 35%;
    border-right: ${({ theme }) => `1px solid ${theme.green}`};
    padding: 20px 0 40px 20px;
  }
`;

const DetailsParagraph = styled(Paragraph)`
  font-size: 12px;
  animation: ${fadeIn} 0.5s linear;
  color: ${({ theme }) => theme.green};
  padding: 10px 0;
`;

const DetailsSpan = styled.span`
  font-weight: 400;
  margin-left: 0.5rem;
  font-size: 14px;
`;

const EmployeeInput = styled(TextInputField)`
  width: 100%;
`;

const EmployeeTextArea = styled(TextAreaField)`
  width: 100%;
`;

const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin: 3rem 0;
  button {
    margin: 0 0 0 0.8rem;
  }
`;

interface BuildingProps {
  mainState: IAdminState;
}

const Building: React.FunctionComponent<BuildingProps> = ({ mainState }) => {
  const [currentCity, setCurrentCity] = React.useState<IBuilding | undefined>(undefined);
  const [message, setMessage] = React.useState<IEmployeeMessage | undefined>();
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);

  const { city, building } = mainState;

  const compareBuildings = (b: IBuilding): boolean => b.property === building.value;

  const findBuilding = (pickedCity: string): IBuilding | undefined => {
    switch (pickedCity) {
      case 'radwanice':
        return RADWANICE_BUILDINGS.find(compareBuildings);
      case 'siechnice':
        return SIECHNICE_BUILDINGS.find(compareBuildings);
      case 'swieta-katarzyna':
        return SWIETA_KATARZYNA_BUILDING.find(compareBuildings);
      case 'zerniki-wroclawskie':
        return ZERNIKI_WROCLAWSKIE_BUILDING.find(compareBuildings);
      default:
        return undefined;
    }
  };

  const { control, handleSubmit, errors, reset } = useForm<IEmployeeMessage>();

  const onSubmit = handleSubmit<IEmployeeMessage>((cred): void => {
    setMessage({ ...cred });
    setDisplayConfirmation(true);
  });

  const confirmSubmit = (): void => {
    alert(JSON.stringify(message));
    initialState();
  };

  const initialState = (): void => {
    setMessage(undefined);
    setDisplayConfirmation(false);
    reset({ ...INITIAL_EMPLOYEE_MESSAGE });
  };

  React.useEffect(() => {
    setCurrentCity(findBuilding(city.value));
  }, [mainState]);

  if (!currentCity) {
    return null;
  }

  return (
    <BuildingWrapper>
      <BuildingHeader>Obiekty sportowe</BuildingHeader>
      <InnerContent>
        <BuildingSubHeader>Dane o obiekcie</BuildingSubHeader>
        <DetailsParagraph bold>Miejscowość</DetailsParagraph>
        <DetailsSpan>{city.label}</DetailsSpan>
        <DetailsParagraph bold>Nazwa obiektu</DetailsParagraph>
        <DetailsSpan>{currentCity.name}</DetailsSpan>
        <DetailsParagraph bold>Telefon Kontaktowy</DetailsParagraph>
        <DetailsSpan>{currentCity.phone}</DetailsSpan>
        <DetailsParagraph bold>Email</DetailsParagraph>
        <DetailsSpan>{currentCity.email}</DetailsSpan>
        <DetailsParagraph bold>Pracownicy</DetailsParagraph>
        <DetailsSpan>1. Lorem Ipsum</DetailsSpan>
      </InnerContent>
      <InnerContent>
        <BuildingSubHeader>Wyślij wiadomość pracownikowi</BuildingSubHeader>
        <Label>E-mail</Label>
        <Controller
          name="email"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <EmployeeInput
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.email}
              className="input"
              placeholder="E-mail"
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.email && <ErrorMsg innerText="Pole nie moze byc puste" />}
        <Label>Imie i nazwisko</Label>
        <Controller
          name="person"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <EmployeeInput
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.person}
              className="input"
              placeholder="Wpisz"
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.person && <ErrorMsg innerText="Pole nie moze byc puste" />}
        <Label>Wiadomość</Label>
        <Controller
          name="message"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <EmployeeTextArea
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.message}
              className="input"
              placeholder="Wiadomość"
              disabled={displayConfirmation}
              style={{ marginBottom: displayConfirmation ? '20px' : '0px' }}
            />
          )}
        />
        {errors.message && <ErrorMsg innerText="Pole nie moze byc puste" />}
        {displayConfirmation ? (
          <ConfirmAction
            message="Czy napewno chcesz wysłać wiadomość"
            callback={confirmSubmit}
            cancelCallback={() => setDisplayConfirmation(false)}
          />
        ) : (
          <ButtonPanel>
            <Button secondary onClick={initialState}>
              Wyczyść
            </Button>
            <Button onClick={onSubmit}>Wyślij</Button>
          </ButtonPanel>
        )}
      </InnerContent>
    </BuildingWrapper>
  );
};

export default Building;
