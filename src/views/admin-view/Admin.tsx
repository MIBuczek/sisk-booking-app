import * as React from 'react';
import {Navigate} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import Header from 'components/atoms/Header';
import {fadeIn} from 'style/animation';
import SideNav from 'components/organisms/SideNav';
import BookingCalender from 'components/organisms/Calender';
import {IAdminState, IReduxState, TSelect} from 'models';
import {
   ADMIN_TABS,
   BUILDINGS_OPTIONS,
   CITY_OPTIONS,
   initialAdminState,
   adminSeeContentCredentials,
   hasRightsToSeeContent
} from 'utils';
import Clients from 'components/organisms/Clients';
import Bookings from 'components/organisms/Bookings';
import Building from 'components/organisms/Building';
import Summary from 'components/organisms/Summary';

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

const Admin = (): JSX.Element => {
   const [adminState, setAdminState] = React.useState<IAdminState>({...initialAdminState});
   const [tab, setTab] = React.useState<ADMIN_TABS>(ADMIN_TABS.CALENDER);

   const {
      authStore: {auth},
      currentUserStore: {user}
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
    * @param value
    * @param field
    */
   const stateHandler = (value: TSelect, field: string) => {
      if (field === 'city') {
         setAdminState(() => ({city: value, building: BUILDINGS_OPTIONS[value.value][0]}));
      } else {
         setAdminState((prev) => ({...prev, building: value}));
      }
   };

   /**
    * Function switch view after admin selection.
    * @param currentTab
    */
   const tabHandler = (currentTab: ADMIN_TABS): void => {
      setTab(currentTab);
   };

   React.useEffect(() => setWorkPlace(), [user]);

   React.useEffect(() => {}, [tab]);

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
      </AdminWrapper>
   );
};

export default Admin;
