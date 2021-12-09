import ErrorMsg from 'components/atoms/ErrorMsg';
import Header from 'components/atoms/Header';
import Label from 'components/atoms/Label';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import { IAdminState, IReduxState, TSelect } from 'models';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBuilding } from 'store';
import styled from 'styled-components';
import { CITY_OPTIONS, RECORDS_BUILDINGS_HEADERS, RECORDS_BUILDINGS_ROW } from 'utils';
import MultipleRecords from 'components/atoms/MultipleRecords';
import { IBuildingForm } from 'models/forms/building-form-models';
import { Controller, useForm } from 'react-hook-form';
import NewBuildingForm from '../forms/NewBuildingForm';

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

const BuildingSelectWrapper = styled(SelectWrapper)`
  margin-top: 0;
`;

interface IProps {
  adminState: IAdminState;
}

const ModalBuilding: React.FunctionComponent<IProps> = ({ adminState }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedItemIndex, setEditedItemIndex] = React.useState<number | undefined>(undefined);

  const dispatch = useDispatch();
  const { buildings } = useSelector((state: IReduxState) => state.buildingStore);

  const { errors, control, watch } = useForm<{ city: TSelect }>({
    defaultValues: { city: adminState.city }
  });

  const selectedCity = watch('city');

  const editBuildingHandler = (index: number) => {
    setIsEditing(true);
    setEditedItemIndex(index);
  };

  const deleteBuildingHandler = (index: number) => {
    const currentBuilding = buildings[index];
    if (currentBuilding.id) dispatch(deleteBuilding(currentBuilding.id));
    initialEditingState();
  };

  const initialEditingState = () => {
    setIsEditing(false);
    setEditedItemIndex(undefined);
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
          {errors.city && <ErrorMsg innerText="Pole nie moze byc puste" />}
        </BuildingSelectWrapper>
        <MultipleRecords
          title="buildings"
          headers={RECORDS_BUILDINGS_HEADERS}
          dataProperty={RECORDS_BUILDINGS_ROW}
          records={buildings}
          editHandler={editBuildingHandler}
          deleteHandler={deleteBuildingHandler}
          emptyText={`Nie został dodany żadny budynek w ${adminState.city?.label}`}
        />
      </BuildingInnerContent>
      <NewBuildingForm
        isEditing={isEditing}
        selectedCity={selectedCity}
        editedItemIndex={editedItemIndex}
        initialEditingState={initialEditingState}
      />
    </BuildingWrapper>
  );
};

export default ModalBuilding;
