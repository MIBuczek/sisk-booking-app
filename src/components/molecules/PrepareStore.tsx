import { isEmpty } from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as StoreActions from 'store';
import { IReduxState } from '../../models';
import { SAVING_STAGE } from '../../utils';
import Loading from './Loading';

export interface IProps {
  children: React.ReactNode;
}

const PrepareStore: React.FC<IProps> = ({ children }): JSX.Element | null => {
  const [isUserPage] = React.useState<boolean>(window.location.hash.length === 2);
  const [storeReady, setStoreReady] = React.useState<boolean>(true);

  const dispatch = useDispatch();
  const { authStore, currentUserStore, bookingStore, clientStore, buildingStore } = useSelector(
    (state: IReduxState): IReduxState => state
  );

  // const checkLocalStorage = (): boolean => {
  //   const lastUpdate = localStorage.getItem('lastUpdate');
  //   if (!lastUpdate) {
  //     return true;
  //   }
  //   if (Number(lastUpdate) + 900000 < Date.now()) {
  //     return true;
  //   }
  //   const bookingData = JSON.parse(localStorage.getItem('bookings') || '[]') as IBooking[];
  //   dispatch(StoreActions.fetchingBookingsDone(BOOKING_STATE.GET_BOOKING, bookingData));
  //   return false;
  // };

  const adminStoreReady =
    currentUserStore.savingStage === SAVING_STAGE.SUCCESS &&
    bookingStore.savingStage === SAVING_STAGE.SUCCESS &&
    clientStore.savingStage === SAVING_STAGE.SUCCESS &&
    buildingStore.savingStage === SAVING_STAGE.SUCCESS;

  const userStoreReady = bookingStore.savingStage === SAVING_STAGE.SUCCESS;

  React.useEffect(() => {
    if (!isEmpty(authStore.auth)) {
      dispatch(StoreActions.getUserData());
      dispatch(StoreActions.getBookingsData());
      dispatch(StoreActions.getClientsData());
      dispatch(StoreActions.getBuildingsData());
      setStoreReady(false);
    } else {
      dispatch(StoreActions.getBookingDataForUser());
      dispatch(StoreActions.getBuildingsData());
    }
  }, [authStore.savingStage, isUserPage]);

  React.useEffect(() => {
    if (adminStoreReady && !isUserPage) {
      setStoreReady(true);
    }
    if (userStoreReady && userStoreReady) {
      setStoreReady(true);
    }
  }, [
    currentUserStore.savingStage,
    bookingStore.savingStage,
    clientStore.savingStage,
    buildingStore.savingStage
  ]);

  if (storeReady) {
    return <>{children}</>;
  }
  return (
    <>
      <Loading />
      {children}
    </>
  );
};
export default PrepareStore;
