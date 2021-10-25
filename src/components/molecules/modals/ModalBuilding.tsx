import Button from 'components/atoms/Button';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import SelectRecord from 'components/atoms/SelectRecord';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import TextInputField from 'components/atoms/TextInputField';
import { IAdminState, IBuilding, TSelect } from 'models';
import * as React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { addBuilding, closeModal } from 'store';
import styled from 'styled-components';
import { BUILDINGS_OPTIONS, CITY_OPTIONS, SIZE_FIELD_OPTIONS } from 'utils';
import MultipleRecords from 'components/atoms/MultipleRecords';
import ButtonGroup from 'components/atoms/ButtonGroup';
import { Controller, useForm } from '../../../../node_modules/react-hook-form/dist';

const BuildingWrapper = styled.section`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const BuildingHeader = styled(Header)`
  width: 100%;
  margin: 20px 0 40px;
`;

const BuildingSubHeader = styled(Header)`
  font-size: ${({ theme }) => theme.fontSize.m};
  width: 100%;
  margin: 15px 0 25px;
`;

const BuildingInnerContent = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
`;

const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
  button {
    margin-left: 0.8rem;
  }
`;

const BuildingSelectWrapper = styled(SelectWrapper)`
  margin-top: 0;
`;

interface IProps {
  adminState: IAdminState;
}

const ModalBuilding: React.FunctionComponent<IProps> = ({ adminState }) => {
  const dispatch = useDispatch();
  const { city, building } = adminState;

  const { handleSubmit, errors, control, watch } = useForm({
    defaultValues: adminState
  });

  const cityValue = watch('city');

  const onSubmit = handleSubmit<IBuilding>(async (cred) => {
    dispatch(
      addBuilding({
        ...cred
      })
    );
    dispatch(closeModal());
  });

  return (
    <BuildingWrapper>
      <BuildingHeader>OBIEKTY</BuildingHeader>
      <BuildingInnerContent>
        <BuildingSubHeader>Lista obiektów</BuildingSubHeader>
        <BuildingSelectWrapper>
          <Label>Miejscowość</Label>
          <Controller
            name="city"
            defaultValue={city}
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
                defaultValue={city}
              />
            )}
          />
          {errors.city && (
            <ErrorMsg>
              Pole nie moze byc puste <BsExclamationCircle />
            </ErrorMsg>
          )}
        </BuildingSelectWrapper>
        <MultipleRecords records={[]} emptyText={`Nie został dodany żadny budynek w ${city}`} />
      </BuildingInnerContent>
      <BuildingInnerContent>
        <BuildingSubHeader>Dodaj nowy obiekt</BuildingSubHeader>
        <Label>Nazwa obiektu</Label>
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
        <Label>Telefon kontaktowy</Label>
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
        <Label>Email</Label>
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
        <Label>Rodzaje powierzchni do wybory</Label>
        <ButtonGroup options={['1/1', '2/2', '4/4']} />
        <ButtonPanel>
          <Button secondary>Wyczyść</Button>
          <Button>Dodaj</Button>
        </ButtonPanel>
      </BuildingInnerContent>
    </BuildingWrapper>
  );
};

export default ModalBuilding;
