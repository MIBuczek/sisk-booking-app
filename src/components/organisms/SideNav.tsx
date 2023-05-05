import * as React from 'react';
import {
   BsBuilding,
   BsFileEarmarkBarGraph,
   BsFileEarmarkBarGraphFill,
   BsFileEarmarkPersonFill,
   BsFillCalendar2DateFill,
   BsFillPinFill
} from 'react-icons/bs';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {ADMIN_TABS, CITY_OPTIONS, generateBuildingOptions, MODAL_TYPES} from 'utils';
import {openModal} from 'store';
import {IAdminState, IMainState, IReduxState, TSelect} from 'models';
import Label from 'components/atoms/Label';
import ButtonIcon, {iconStyle} from 'components/atoms/ButtonIcon';
import SelectInputField, {customStyles, SelectWrapper} from 'components/atoms/SelectInputField';
import BookingDetails from 'components/molecules/BookingDetails';

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
      justify-content: flex-start;
   }

   @media (max-width: 799px) {
      flex-wrap: nowrap;
      flex-direction: column;
      align-items: flex-start;
   }
`;

const InnerNavigationPanel = styled.div`
   display: flex;
   flex-direction: column;

   @media (max-width: 1400px) {
      width: 80%;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 30px 20px;
   }

   @media (max-width: 799px) {
      flex-direction: column;
      align-items: flex-start;
      padding: 20px 10px;
   }
`;

const SideSelectWrapper = styled(SelectWrapper)`
   min-width: 290px;

   &:last-of-type {
      margin-bottom: 60px;
   }

   @media (max-width: 1400px) {
      min-width: 290px;
      margin: 10px 60px 10px 10px;

      &:last-of-type {
         margin-bottom: 10px;
      }
   }
`;

interface IProps {
   isAdmin: boolean;
   isAdminPanel?: boolean;
   state: IMainState | IAdminState;
   stateHandler: (value: TSelect, field: string) => void;
   activeTab: ADMIN_TABS;
   tabHandler: (currentTab: ADMIN_TABS) => void;
}

/**
 * Side navigation panel - admin view.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const SideNav: React.FunctionComponent<IProps> = ({
   isAdmin,
   isAdminPanel,
   state,
   stateHandler,
   activeTab,
   tabHandler
}): JSX.Element => {
   const dispatch = useDispatch();
   const {buildings} = useSelector((appState: IReduxState) => appState.buildingStore);

   const {city, building} = state;

   /**
    * Function to select active and add class 'active'
    */
   const setActiveTab = (buttonTab: ADMIN_TABS): string =>
      activeTab === buttonTab ? 'active' : '';

   /**
    * Function to get building options assigned to selected city.
    */
   const selectBuilding = (): TSelect[] => {
      if (!city) return [];
      return generateBuildingOptions(buildings)[city.value];
   };

   React.useEffect(() => undefined, [city.value]);

   const blockSelectOptions = isAdminPanel ? !isAdmin : false;

   return (
      <SideWrapper>
         <InnerNavigationPanel style={{paddingBottom: '0px'}}>
            <SideSelectWrapper>
               <Label>Miejscowość</Label>
               <SelectInputField
                  defaultValue={city}
                  options={CITY_OPTIONS}
                  styles={customStyles(false)}
                  placeholder="Wybierz"
                  onChange={(val) => stateHandler(val as TSelect, 'city')}
                  value={city}
                  isDisabled={blockSelectOptions}
                  blurInputOnSelect
                  isSearchable={false}
               />
            </SideSelectWrapper>
            <SideSelectWrapper>
               <Label>Obiekt</Label>
               <SelectInputField
                  defaultValue={building}
                  value={building}
                  options={selectBuilding()}
                  styles={customStyles(false)}
                  placeholder="Wybierz"
                  onChange={(val: unknown) => stateHandler(val as TSelect, 'building')}
                  isDisabled={!city}
                  blurInputOnSelect
                  isSearchable={false}
               />
            </SideSelectWrapper>
         </InnerNavigationPanel>
         {isAdminPanel ? (
            <InnerNavigationPanel>
               <ButtonIcon
                  className={setActiveTab(ADMIN_TABS.CALENDER)}
                  role="button"
                  onClick={() => tabHandler(ADMIN_TABS.CALENDER)}
               >
                  <BsFillCalendar2DateFill style={iconStyle} /> KALENDARZ
               </ButtonIcon>
               <ButtonIcon
                  className={setActiveTab(ADMIN_TABS.BOOKINGS)}
                  role="button"
                  onClick={() => tabHandler(ADMIN_TABS.BOOKINGS)}
               >
                  <BsFillPinFill style={iconStyle} /> REZERWACJE
               </ButtonIcon>
               {isAdmin && (
                  <>
                     <ButtonIcon
                        className={setActiveTab(ADMIN_TABS.CLIENTS)}
                        role="button"
                        onClick={() => tabHandler(ADMIN_TABS.CLIENTS)}
                     >
                        <BsFileEarmarkPersonFill style={iconStyle} /> NAJEMCY
                     </ButtonIcon>
                     <ButtonIcon
                        className={setActiveTab(ADMIN_TABS.BUILDINGS)}
                        role="button"
                        onClick={() => tabHandler(ADMIN_TABS.BUILDINGS)}
                     >
                        <BsBuilding style={iconStyle} /> OBIEKTY
                     </ButtonIcon>
                     <ButtonIcon
                        className={setActiveTab(ADMIN_TABS.SUMMARY)}
                        role="button"
                        onClick={() => tabHandler(ADMIN_TABS.SUMMARY)}
                     >
                        <BsFileEarmarkBarGraphFill style={iconStyle} /> PODSUMOWANIE NAJMÓW
                     </ButtonIcon>
                  </>
               )}
            </InnerNavigationPanel>
         ) : (
            <>
               <InnerNavigationPanel>
                  <ButtonIcon
                     role="button"
                     onClick={() => dispatch(openModal(MODAL_TYPES.BOOKINGS))}
                  >
                     <BsFileEarmarkBarGraph style={iconStyle} />{' '}
                     {isAdmin ? 'DODAJ REZERWACJĘ' : 'PROŚBA O REZERWACJĘ'}
                  </ButtonIcon>
               </InnerNavigationPanel>
               <BookingDetails />
            </>
         )}
      </SideWrapper>
   );
};

export default SideNav;
