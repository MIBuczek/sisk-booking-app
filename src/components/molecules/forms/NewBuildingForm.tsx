import Button from 'components/atoms/Button';
import ButtonGroup from 'components/atoms/ButtonGroup';
import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import TextInputField from 'components/atoms/TextInputField';
import { IReduxState, TSelect } from 'models';
import { IBuildingForm } from 'models/forms/building-form-models';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addBuilding, updateBuilding } from 'store';
import styled from 'styled-components';
import {
  BUILDING_INITIAL_VALUE,
  generateSelectDefaultValue,
  SIZE_OPTIONS,
  SIZE_OPTIONS_BTN
} from 'utils';

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

interface NewBuildingFormProps {
  selectedCity: TSelect;
  isEditing: boolean;
  editedItemIndex?: number;
  initialEditingState: () => void;
}

const NewBuildingForm: React.FunctionComponent<NewBuildingFormProps> = ({
  isEditing,
  selectedCity,
  editedItemIndex,
  initialEditingState
}) => {
  const [buildingId, setBuildingId] = React.useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = React.useState(SIZE_OPTIONS['1/1']);

  const selectedSizeHandler = (e: Event, value: SIZE_OPTIONS): void => {
    e.preventDefault();
    setSelectedSize(value);
  };

  const dispatch = useDispatch();
  const { buildings } = useSelector((state: IReduxState) => state.buildingStore);

  React.useEffect(() => {
    if (isEditing && typeof editedItemIndex === 'number') {
      editBuildingHandler(editedItemIndex);
    } else {
      createInitialState();
    }
  }, [isEditing]);

  const { handleSubmit, errors, control, reset } = useForm<IBuildingForm>();

  const onSubmit = handleSubmit<IBuildingForm>(async (cred) => {
    const buildingData = {
      ...cred,
      city: selectedCity.value || '',
      size: selectedSize,
      id: buildingId || buildings.length.toString()
    };

    if (isEditing && buildingId) {
      dispatch(updateBuilding(buildingData));
    } else dispatch(addBuilding(buildingData));

    createInitialState();
  });

  const editBuildingHandler = (index: number) => {
    const currentBuilding = buildings[index];
    reset({ ...currentBuilding, city: generateSelectDefaultValue(currentBuilding.city) });
    setBuildingId(currentBuilding.id);
    setSelectedSize(currentBuilding.size);
  };

  const createInitialState = () => {
    reset(BUILDING_INITIAL_VALUE);
    setSelectedSize(SIZE_OPTIONS['1/1']);
    initialEditingState();
  };

  return (
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
      {errors.name && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
      {errors.phone && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
      {errors.email && <ErrorMsg innerText="Pole nie moze byc puste" />}
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
  );
};

export default NewBuildingForm;
