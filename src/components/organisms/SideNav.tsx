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
import { useDispatch, useSelector } from 'react-redux';
import { ADMIN_TABS, CITY_OPTIONS, generateBuildingOptions, MODAL_TYPES } from 'utils';
import { openModal } from 'store';
import { IAdminState, IMainState, IReduxState, TSelect } from 'models';
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
    width: 95%;
    padding: 30px 20px;
    align-items: end;
  }
  @media (max-width: 799px) {
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
  }
`;

const InnerNavigationPanel = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 1400px) {
    width: 80%;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media (max-width: 799px) {
    flex-direction: column;
    align-items: center;
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
  const { buildings } = useSelector((appState: IReduxState) => appState.buildingStore);

  const { city, building } = state;

  /**
   * Function to get building options assigned to selected city.
   */
  const selectBuilding = (): TSelect[] => {
    if (!city) return [];
    return generateBuildingOptions(buildings)[city.value];
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
        <InnerNavigationPanel>
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
        </InnerNavigationPanel>
      ) : (
        <InnerNavigationPanel>
          <ButtonIcon role="button" onClick={() => dispatch(openModal(MODAL_TYPES.BOOKINGS))}>
            <BsFileEarmarkBarGraph style={iconStyle} /> DODAJ REZERWACJĘ
          </ButtonIcon>
        </InnerNavigationPanel>
      )}
      <BookingDetails />
    </SideWrapper>
  );
};

export default SideNav;
