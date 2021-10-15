import * as React from 'react';
import {
  BsFileEarmarkBarGraphFill,
  BsFileEarmarkBarGraph,
  BsFileEarmarkPersonFill,
  BsBuilding,
  BsFillPinFill
} from 'react-icons/bs';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { BUILDINGS_OPTIONS, CITY_OPTIONS, MODAL_TYPES } from 'utils';
import { openModal } from 'store';
import { IAdminState, IMainState, TSelect } from 'models';
import Label from 'components/atoms/Label';
import ButtonIcon, { iconStyle } from 'components/atoms/ButtonIcon';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import ReservationDetails from '../molecules/ReservationDetails';

// const { LARGE } = SIZE;

const SideWrapper = styled.aside`
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: transparent;
  padding: 30px 80px 0;
`;

interface IProps {
  admin?: boolean;
  state: IMainState | IAdminState;
  stateHandler: (value: TSelect, field: string) => void;
}

const SideNav: React.FunctionComponent<IProps> = ({ admin, state, stateHandler }): JSX.Element => {
  const dispatch = useDispatch();

  const { city, building } = state;

  const selectBuilding = (): TSelect[] => {
    if (!city) return [];
    return BUILDINGS_OPTIONS[city.value];
  };

  return (
    <SideWrapper>
      <SelectWrapper>
        <Label>Miejscowość</Label>
        <SelectInputField
          options={CITY_OPTIONS}
          styles={customStyles(false)}
          placeholder="Wybierz"
          onChange={(val: TSelect) => stateHandler(val, 'city')}
          selected={city}
        />
      </SelectWrapper>
      <SelectWrapper>
        <Label>Obiekt</Label>
        <SelectInputField
          options={selectBuilding()}
          styles={customStyles(false)}
          placeholder="Wybierz"
          onChange={(val: TSelect) => stateHandler(val, 'building')}
          selected={building}
          isDisabled={!city}
        />
      </SelectWrapper>
      {admin ? (
        <>
          <ButtonIcon role="button" onClick={() => dispatch(openModal(MODAL_TYPES.RESERVATION))}>
            <BsFillPinFill style={iconStyle} /> REZERWACJE
          </ButtonIcon>
          <ButtonIcon role="button" onClick={() => dispatch(openModal(MODAL_TYPES.RESERVATION))}>
            <BsFileEarmarkPersonFill style={iconStyle} /> NAJEMCY
          </ButtonIcon>
          <ButtonIcon role="button" onClick={() => dispatch(openModal(MODAL_TYPES.RESERVATION))}>
            <BsBuilding style={iconStyle} /> OBIEKTY
          </ButtonIcon>
          <ButtonIcon role="button" onClick={() => dispatch(openModal(MODAL_TYPES.RESERVATION))}>
            <BsFileEarmarkBarGraphFill style={iconStyle} /> PODSUMOWANIE NAJMÓW
          </ButtonIcon>
        </>
      ) : (
        <ButtonIcon role="button" onClick={() => dispatch(openModal(MODAL_TYPES.RESERVATION))}>
          <BsFileEarmarkBarGraph style={iconStyle} /> DODAJ REZERWACJE
        </ButtonIcon>
      )}
      <ReservationDetails />
    </SideWrapper>
  );
};

export default SideNav;
