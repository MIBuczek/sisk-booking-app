import * as React from 'react';
import {
  BsFileEarmarkBarGraphFill,
  BsFileEarmarkBarGraph,
  BsFileEarmarkPersonFill,
  BsBuilding,
  BsFillPinFill,
  BsFillCalendar2DateFill
} from 'react-icons/bs';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ADMIN_TABS, BUILDINGS_OPTIONS, CITY_OPTIONS, MODAL_TYPES } from 'utils';
import { openModal } from 'store';
import { IAdminState, IMainState, TSelect } from 'models';
import Label from 'components/atoms/Label';
import ButtonIcon, { iconStyle } from 'components/atoms/ButtonIcon';
import SelectInputField, { customStyles, SelectWrapper } from 'components/atoms/SelectInputField';
import BookingDetails from '../molecules/BookingDetails';

const SideWrapper = styled.aside`
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: transparent;
  padding: 30px 80px 0;
  @media (max-width: 1400px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 95%;
    padding: 30px 20px;
  }
  @media (max-width: 799px) {
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: flex-start;
  }
`;

interface IProps {
  isAdmin: boolean;
  isAdminPanel?: boolean;
  state: IMainState | IAdminState;
  stateHandler: (value: TSelect, field: string) => void;
  tabHandler: (currentTab: ADMIN_TABS) => void;
}

const SideNav: React.FunctionComponent<IProps> = ({
  isAdmin,
  isAdminPanel,
  state,
  stateHandler,
  tabHandler
}): JSX.Element => {
  const dispatch = useDispatch();

  const { city, building } = state;

  const selectBuilding = (): TSelect[] => {
    if (!city) return [];
    return BUILDINGS_OPTIONS[city.value];
  };

  React.useLayoutEffect(() => {}, [state]);

  const blockSelectOptions = isAdminPanel ? !isAdmin : false;

  return (
    <SideWrapper>
      <SelectWrapper>
        <Label>Miejscowość</Label>
        <SelectInputField
          defaultValue={city}
          options={CITY_OPTIONS}
          styles={customStyles(false)}
          placeholder="Wybierz"
          onChange={(val: TSelect) => stateHandler(val, 'city')}
          selected={city}
          isDisabled={blockSelectOptions}
        />
      </SelectWrapper>
      <SelectWrapper>
        <Label>Obiekt</Label>
        <SelectInputField
          defaultValue={building}
          value={building}
          options={selectBuilding()}
          styles={customStyles(false)}
          placeholder="Wybierz"
          onChange={(val: TSelect) => stateHandler(val, 'building')}
          selected={building}
          isDisabled={blockSelectOptions || !city}
        />
      </SelectWrapper>
      {isAdminPanel ? (
        <>
          <ButtonIcon role="button" onClick={() => tabHandler(ADMIN_TABS.CALENDER)}>
            <BsFillCalendar2DateFill style={iconStyle} /> KALENDARZ
          </ButtonIcon>
          <ButtonIcon role="button" onClick={() => tabHandler(ADMIN_TABS.BOOKINGS)}>
            <BsFillPinFill style={iconStyle} /> REZERWACJE
          </ButtonIcon>
          {isAdmin && (
            <>
              <ButtonIcon role="button" onClick={() => tabHandler(ADMIN_TABS.CLIENTS)}>
                <BsFileEarmarkPersonFill style={iconStyle} /> NAJEMCY
              </ButtonIcon>
              <ButtonIcon role="button" onClick={() => tabHandler(ADMIN_TABS.BUILDINGS)}>
                <BsBuilding style={iconStyle} /> OBIEKTY
              </ButtonIcon>
              <ButtonIcon role="button" onClick={() => tabHandler(ADMIN_TABS.SUMMARY)}>
                <BsFileEarmarkBarGraphFill style={iconStyle} /> PODSUMOWANIE NAJMÓW
              </ButtonIcon>
            </>
          )}
        </>
      ) : (
        <ButtonIcon role="button" onClick={() => dispatch(openModal(MODAL_TYPES.BOOKINGS))}>
          <BsFileEarmarkBarGraph style={iconStyle} /> DODAJ REZERWACJE
        </ButtonIcon>
      )}
      <BookingDetails />
    </SideWrapper>
  );
};

export default SideNav;
