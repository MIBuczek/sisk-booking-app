import React from 'react';
import styled from 'styled-components';
import Header from 'components/atoms/Header';
import BookingCalender from 'components/organisms/Calender';
import SideNav from 'components/organisms/SideNav';
import {fadeIn} from 'style/animation';
import {IMainState, IReduxState, TSelect} from 'models';
import {ADMIN_TABS, BUILDINGS_OPTIONS, initialMainState, MODAL_TYPES} from 'utils';
import {cloneDeep} from 'lodash';
import {useSelector} from 'react-redux';
import Modal from 'components/organisms/Modal';
import ModalBooking from 'components/molecules/modals/ModalBooking';
import ModalInfo from 'components/molecules/modals/ModalInfo';
import {Navigate} from 'react-router-dom';

const MainWrapper = styled.section`
   width: 100%;
   min-height: 100vh;
   margin-top: 5vh;
   display: flex;
   align-items: flex-start;
   justify-content: center;
   flex-wrap: wrap;
   animation: ${fadeIn} 0.5s linear;
   padding-bottom: 60px;
   @media (max-width: 1400px) {
      flex-direction: column;
      align-items: center;
      overflow: hidden;
   }
`;

export interface IProps {}

const Main: React.FC<IProps> = (): JSX.Element => {
   const [mainState, setNavState] = React.useState<IMainState>(cloneDeep(initialMainState));

   /**
    * Function to handler main state on user view.
    * @param value
    * @param field
    */
   const mainStateHandler = (value: TSelect, field: string) => {
      if (field === 'city') {
         setNavState(() => cloneDeep({city: value, building: BUILDINGS_OPTIONS[value.value][0]}));
      } else {
         setNavState((prev) => ({...prev, building: value}));
      }
   };

   const {
      modal: {isOpen, type},
      authStore: {auth}
   } = useSelector((state: IReduxState) => state);

   if (auth) {
      return <Navigate to="/admin" />;
   }

   return (
      <MainWrapper>
         <Header>KALENDARZ REZERWACJI OBIEKTÓW</Header>
         <SideNav
            state={mainState}
            stateHandler={mainStateHandler}
            activeTab={ADMIN_TABS.BOOKINGS}
            tabHandler={() => null}
            isAdmin={false}
         />
         <BookingCalender mainState={mainState} />
         {isOpen && (
            <Modal>
               {type === MODAL_TYPES.BOOKINGS && <ModalBooking mainState={mainState} />}
               {type === MODAL_TYPES.SUCCESS && <ModalInfo header="Rezerwacja" />}
               {type === MODAL_TYPES.ERROR && <ModalInfo header="Rezerwacja" />}
            </Modal>
         )}
      </MainWrapper>
   );
};

export default Main;
