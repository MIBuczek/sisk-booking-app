import * as React from 'react';
import {Navigate} from 'react-router-dom';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import Header from 'components/atoms/Header';
import {fadeIn} from 'style/animation';
import SideNav from 'components/organisms/SideNav';
import BookingCalender from 'components/organisms/Calender';
import {IAdminState, IReduxState, TSelect} from 'models';
import {
   ADMIN_TABS,
   adminSeeContentCredentials,
   BUILDINGS_OPTIONS,
   CITY_OPTIONS,
   hasRightsToSeeContent,
   initialAdminState,
   MODAL_TYPES,
   SAVING_STAGE
} from 'utils';
import Clients from 'components/organisms/Clients';
import Bookings from 'components/organisms/Bookings';
import Building from 'components/organisms/Building';
import Summary from 'components/organisms/Summary';
import Modal from 'components/organisms/Modal';
import ModalOutLogOut from 'components/molecules/modals/ModalOutLogOut';
import ModalLoadBookings from 'components/molecules/modals/ModalLoadBookings';
import {getClientsData, getUserData, openModal} from 'store';
import {isEmpty} from 'lodash';

const AdminWrapper = styled.section`
   width: 100%;
   min-height: 100vh;
   margin-top: 5vh;
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   animation: ${fadeIn} 0.5s linear;
   padding-bottom: 60px;
`;

/**
 * Admin Panel Component.
 *
 * @returns {JSX.Element}
 */
const Admin = (): JSX.Element => {
   const [adminState, setAdminState] = React.useState<IAdminState>({...initialAdminState});
   const [tab, setTab] = React.useState<ADMIN_TABS>(ADMIN_TABS.CALENDER);

   // TODO - Client change requirement - level it for later purpose.
   /* Register last user click action */
   // const lastMouseClick = userMouseClick();
   const dispatch = useDispatch();

   const {
      authStore: {auth},
      modal: {isOpen, type},
      currentUserStore: {user, savingStage: userSavingStatus},
      clientStore: {clients, savingStage: clientSavingStatus}
   } = useSelector((state: IReduxState) => state);

   /**
    * Function select in dropdown user work place. City and building.
    */
   const setWorkPlace = (): void => {
      if (!user?.city) return;
      const selectedCity = CITY_OPTIONS.find((co) => co.value === user?.city) || CITY_OPTIONS[0];
      stateHandler(selectedCity, 'city');
   };

   /**
    * Function to handler main state on admin view.
    *
    * @param value
    * @param field
    */
   const stateHandler = (value: TSelect, field: string): void => {
      if (field === 'city') {
         setAdminState(() => ({city: value, building: BUILDINGS_OPTIONS[value.value][0]}));
      } else {
         setAdminState((prev) => ({...prev, building: value}));
      }
   };

   /**
    * Function switch view after admin selection.
    *
    * @param currentTab
    */
   const tabHandler = (currentTab: ADMIN_TABS): void => {
      setTab(currentTab);
   };

   // TODO - Client change requirement - leve it for later purpose.
   // /**
   //  * Effect to track last user actiongetUserData to log him out if no action in last 15 minute.
   //  */
   // React.useEffect(() => {
   //    const intervalId = setInterval((): void => {
   //       if (new Date().getTime() - lastMouseClick > 900000) {
   //          dispatch(openModal(MODAL_TYPES.AUTO_LOGOUT));
   //       }
   //    }, 60000);
   //    return () => clearInterval(intervalId);
   // }, [lastMouseClick]);

   React.useEffect(() => {
      dispatch(openModal(MODAL_TYPES.LOAD_BOOKINGS));
      if (isEmpty(user) && userSavingStatus === SAVING_STAGE.INITIAL) {
         dispatch(getUserData());
      }
      if (isEmpty(clients) && clientSavingStatus === SAVING_STAGE.INITIAL) {
         dispatch(getClientsData());
      }
   }, []);

   /**
    * Effect set city from user assigned work place
    */
   React.useEffect(() => setWorkPlace(), [user]);

   /**
    * Effect to refresh view after new tab selection
    */
   React.useEffect(() => undefined, [tab]);

   if (!auth) {
      return <Navigate to="/login" />;
   }

   return (
      <AdminWrapper>
         <Header>Panel Administratora</Header>
         <SideNav
            isAdminPanel
            state={adminState}
            stateHandler={stateHandler}
            activeTab={tab}
            tabHandler={tabHandler}
            user={user}
            isAdmin={adminSeeContentCredentials(user)}
         />
         {/* admin inner content */}
         {tab === ADMIN_TABS.CALENDER && (
            <BookingCalender mainState={adminState} hasRights={hasRightsToSeeContent(user)} />
         )}
         {tab === ADMIN_TABS.BOOKINGS && <Bookings mainState={adminState} />}
         {adminSeeContentCredentials(user) && (
            <>
               {tab === ADMIN_TABS.CLIENTS && <Clients />}
               {tab === ADMIN_TABS.BUILDINGS && <Building mainState={adminState} />}
               {tab === ADMIN_TABS.SUMMARY && <Summary />}
            </>
         )}
         {isOpen &&
            [MODAL_TYPES.AUTO_LOGOUT, MODAL_TYPES.LOAD_BOOKINGS].includes(type as MODAL_TYPES) && (
               <Modal>
                  {type === MODAL_TYPES.AUTO_LOGOUT && <ModalOutLogOut />}
                  {type === MODAL_TYPES.LOAD_BOOKINGS && <ModalLoadBookings />}
               </Modal>
            )}
      </AdminWrapper>
   );
};

export default Admin;
