import Button from 'components/atoms/Button';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import TextInputField from 'components/atoms/TextInputField';
import { IAdminState, IReduxState } from 'models';
import * as React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addBuilding, deleteBuilding, updateBuilding } from 'store';
import styled from 'styled-components';
import { CITY_OPTIONS, generateSelectDefaultValue } from 'utils';
import MultipleRecords from 'components/atoms/MultipleRecords';
import ButtonGroup from 'components/atoms/ButtonGroup';
import { BUILDING_INITIAL_VALUE, SIZE_OPTIONS, SIZE_OPTIONS_BTN } from 'utils/variables/form-const';
import { IBuildingForm } from 'models/forms/building-form-models';
import { Controller, useForm } from '../../../../node_modules/react-hook-form/dist';

const BuildingWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 40px;
  justify-content: space-between;
  max-width: 920px;
`;

const BuildingHeader = styled(Header)`
  width: 100%;
  margin: 20px 0 40px 20px;
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
  padding: 0 40px 0 20px;
  &:first-of-type {
    border-right: ${({ theme }) => `1px solid ${theme.green}`};
  }
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
  const [selectedSize, setSelectedSize] = React.useState(SIZE_OPTIONS['1/1']);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItemId, setEditedItemId] = React.useState<string | undefined>(undefined);

  const dispatch = useDispatch();
  const { buildings } = useSelector((state: IReduxState) => state.buildingStore);

  const selectedSizeHandler = (value: SIZE_OPTIONS): void => {
    setSelectedSize(value);
  };

  const { handleSubmit, errors, control, reset } = useForm<IBuildingForm>({
    defaultValues: adminState
  });

  const onSubmit = handleSubmit<IBuildingForm>(async (cred) => {
    const buildingData = {
      ...cred,
      city: cred.city.value,
      size: selectedSize,
      id: editedItemId || buildings.length.toString()
    };

    if (isEditing && editedItemId) {
      dispatch(updateBuilding(buildingData));
    } else dispatch(addBuilding(buildingData));

    createInitialState();
  });

  const editBuildingHandler = (index: number) => {
    const currentBuilding = buildings[index];
    reset({ ...currentBuilding, city: generateSelectDefaultValue(currentBuilding.city) });
    setIsEditing(true);
    setEditedItemId(currentBuilding.id);
    setSelectedSize(currentBuilding.size);
  };

  const deleteBuildingHandler = (index: number) => {
    const currentBuilding = buildings[index];
    if (currentBuilding.id) dispatch(deleteBuilding(currentBuilding.id));
    createInitialState();
  };

  const createInitialState = () => {
    reset(BUILDING_INITIAL_VALUE);
    setSelectedSize(SIZE_OPTIONS['1/1']);
    setIsEditing(false);
    setEditedItemId(undefined);
  };

  return (
    <BuildingWrapper>
      <BuildingHeader>OBIEKTY</BuildingHeader>
      <BuildingInnerContent>
        <BuildingSubHeader>Lista obiektów</BuildingSubHeader>
        <BuildingSelectWrapper>
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
          {errors.city && (
            <ErrorMsg>
              Pole nie moze byc puste <BsExclamationCircle />
            </ErrorMsg>
          )}
        </BuildingSelectWrapper>
        <MultipleRecords
          records={buildings?.map((b) => b.name)}
          editHandler={editBuildingHandler}
          deleteHandler={deleteBuildingHandler}
          emptyText={`Nie został dodany żadny budynek w ${adminState.city?.label}`}
        />
      </BuildingInnerContent>
      <BuildingInnerContent>
        <BuildingSubHeader>Dodaj nowy obiekt</BuildingSubHeader>
        <Label>Nazwa obiektu</Label>
        <Controller
          name="name"
          defaultValue={''}
          control={control}
          rules={{ required: true }}
          render={({ onChange, onBlur, value }) => (
            <TextInputField
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              invalid={!!errors.name}
              className="input"
              placeholder="Wpisz"
            />
          )}
        />
        {errors.name && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>Telefon kontaktowy</Label>
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
              placeholder="Wpisz"
            />
          )}
        />
        {errors.phone && (
          <ErrorMsg>
            Pole nie moze byc puste <BsExclamationCircle />
          </ErrorMsg>
        )}
        <Label>Email</Label>
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
        <Label>Rodzaje powierzchni do wybory</Label>
        <ButtonGroup
          options={SIZE_OPTIONS_BTN}
          value={selectedSize}
          optionsHandler={selectedSizeHandler}
        />
        <ButtonPanel>
          <Button secondary onClick={createInitialState}>
            Anuluj
          </Button>
          <Button onClick={onSubmit}>{isEditing ? 'Zapisz' : 'Dodaj'}</Button>
        </ButtonPanel>
      </BuildingInnerContent>
    </BuildingWrapper>
  );
};

export default ModalBuilding;
