import Button from 'components/atoms/Button';
import ErrorMsg from 'components/atoms/ErrorMsg';
import ErrorMsgServer from 'components/atoms/ErrorMsgServer';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import Paragraph from 'components/atoms/Paragraph';
import SelectInputField, { customStyles } from 'components/atoms/SelectInputField';
import TextAreaField from 'components/atoms/TextAreaField';
import TextInputField from 'components/atoms/TextInputField';
import ConfirmAction from 'components/molecules/ConfirmAction';
import {
  IAdminState,
  IBuilding,
  IEmployeeMessage,
  IEmployeeMessageForm,
  IReduxState,
  TSelect
} from 'models';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { fadeIn } from 'style/animation';
import styled from 'styled-components';
import {
  generateAllBuilding,
  INITIAL_ALL_BUILDINGS,
  INITIAL_EMPLOYEE_MESSAGE,
  sendEmailNotification,
  USER_MIB_ID,
  USER_MIB_SERVICE_ID,
  USER_MIB_TEMPLATE_EMPLOYEE_ID
} from 'utils';

const BuildingWrapper = styled.article`
  width: 60%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 30px 0;
  z-index: 0;
  @media (max-width: 1400px) {
    width: 95%;
    justify-content: center;
  }
`;

const BuildingHeader = styled(Header)`
  width: 100%;
  height: fit-content;
  margin: 20px 0 40px 0;
  @media (max-width: 1400px) {
    width: 80%;
  }
  @media (max-width: 890px) {
    width: 90%;
  }
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
    @media (max-width: 890px) {
      width: 90%;
      border-right-color: transparent;
      height: auto;
    }
    padding: 20px 0 40px 0;
  }
  @media (max-width: 890px) {
    width: 90%;
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
  margin: 0 0 0.5rem 0.5rem;
  font-size: 14px;
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

  const { buildings, errorMessage } = useSelector((state: IReduxState) => state.buildingStore);

  /**
   * Function to get all building employees.
   * @param selectedBuilding
   * @returns {Array<TSelect>}
   */
  const getEmployeesOptions = (selectedBuilding: IBuilding | undefined): TSelect[] => {
    if (!selectedBuilding) return [];
    return selectedBuilding.employees.map((e): TSelect => ({ value: e, label: e }));
  };

  /**
   * Function to compare selected building with building database.
   * @param b
   * @returns {Boolean}
   */
  const compareBuildings = (b: IBuilding): boolean => b.property === building.value;

  /**
   * Function to find and return building into building database.
   * @param pickedCity
   * @returns {Object<IBuilding> | undefined}
   */
  const findBuilding = (pickedCity: string): IBuilding | undefined => {
    const allBuildings = generateAllBuilding(buildings) || INITIAL_ALL_BUILDINGS;
    switch (pickedCity) {
      case 'radwanice':
        return allBuildings.radwanice.find(compareBuildings);
      case 'siechnice':
        return allBuildings.siechnice.find(compareBuildings);
      case 'swieta-katarzyna':
        return allBuildings['swieta-katarzyna'].find(compareBuildings);
      case 'zerniki-wroclawskie':
        return allBuildings['zerniki-wroclawskie'].find(compareBuildings);
      default:
        return undefined;
    }
  };

  const { control, handleSubmit, errors, reset } = useForm<IEmployeeMessageForm>();

  /**
   * Function to submit actual form values into form employee message state.
   * It will be dispatched to database it user confirm action.
   * @param cred
   */
  const onSubmit = handleSubmit<IEmployeeMessageForm>((cred): void => {
    setMessage({ ...cred, person: cred.person.value });
    setDisplayConfirmation(true);
  });

  /**
   * Function to confirm dispatch action. If so then sent notification to pointed email address.
   */
  const confirmSubmit = async (): Promise<void> => {
    await sendEmailNotification(
      USER_MIB_SERVICE_ID,
      USER_MIB_TEMPLATE_EMPLOYEE_ID,
      message,
      USER_MIB_ID
    );
    initialState();
  };

  /**
   * Function to restore initial status.
   */
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
      {errorMessage && <ErrorMsgServer innerText={errorMessage} />}
      <InnerContent>
        <BuildingSubHeader>Dane o obiekcie</BuildingSubHeader>
        <DetailsParagraph bold>Miejscowość :</DetailsParagraph>
        <DetailsSpan>{city.label}</DetailsSpan>
        <DetailsParagraph bold>Nazwa obiektu :</DetailsParagraph>
        <DetailsSpan>{currentCity.name}</DetailsSpan>
        <DetailsParagraph bold>Telefon Kontaktowy :</DetailsParagraph>
        <DetailsSpan>{currentCity.phone}</DetailsSpan>
        <DetailsParagraph bold>E-mail :</DetailsParagraph>
        <DetailsSpan>{currentCity.email}</DetailsSpan>
        <DetailsParagraph bold>Pracownicy :</DetailsParagraph>
        {currentCity.employees.map((e, i) => (
          <DetailsSpan key={`${e}`}>{`${i + 1}. ${e}`}</DetailsSpan>
        ))}
      </InnerContent>
      <InnerContent>
        <BuildingSubHeader>Wyślij wiadomość pracownikowi</BuildingSubHeader>
        <Label>Imię i nazwisko</Label>
        <Controller
          name="person"
          defaultValue={{ label: '', value: '' }}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <SelectInputField
              options={getEmployeesOptions(currentCity)}
              styles={customStyles(!!errors.person)}
              placeholder="Wybierz"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              value={value}
              isDisabled={displayConfirmation}
              defaultValue={building}
            />
          )}
        />
        {errors.person && <ErrorMsg innerText="Pole nie może być puste" />}
        <Label>E-mail</Label>
        <Controller
          name="email"
          defaultValue={currentCity.email || ''}
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
              disabled={displayConfirmation}
            />
          )}
        />
        {errors.email && <ErrorMsg innerText="Pole nie może być puste" />}
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
        {errors.message && <ErrorMsg innerText="Pole nie może być puste" />}
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
