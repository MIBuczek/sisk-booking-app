/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsData, getBuildingsData, getClientsData, getUserData } from 'store';
import { IAuthPayload, IBookingsPayload, IReduxState } from '../../models';
import { SAVING_STAGE } from '../../utils/variables/store-const';
import Loading from './Loading';

export interface IProps {
  children: React.ReactNode;
}

const PrepareStore: React.FC<IProps> = ({ children }): JSX.Element | null => {
  const [isUserPage] = React.useState<boolean>(window.location.hash.length === 2);
  const [storeReady, setStoreReady] = React.useState<boolean>(true);

  const { authStore, currentUserStore, bookingStore, buildingStore, clientStore } = useSelector(
    (state: IReduxState): IReduxState => state
  );
  const dispatch = useDispatch();

  const adminStoreReady =
    currentUserStore.savingStage === SAVING_STAGE.SUCCESS &&
    bookingStore.savingStage === SAVING_STAGE.SUCCESS &&
    buildingStore.savingStage === SAVING_STAGE.SUCCESS &&
    clientStore.savingStage === SAVING_STAGE.SUCCESS;

  const userStoreReady = bookingStore.savingStage === SAVING_STAGE.SUCCESS;

  React.useEffect(() => {
    // if (!isEmpty(authStore.auth) && !isUserPage) {
    dispatch(getUserData());
    dispatch(getBookingsData());
    dispatch(getBuildingsData());
    dispatch(getClientsData());
    setStoreReady(false);
    // }
    // if (isUserPage) {
    //   dispatch(getBookingsData());
    // }
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
    buildingStore.savingStage,
    clientStore.savingStage
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
