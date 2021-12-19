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
  const [storeReady, setStoreReady] = React.useState(true);

  const { authStore, currentUserStore, bookingStore, buildingStore, clientStore } = useSelector(
    (state: IReduxState): IReduxState => state
  );
  const dispatch = useDispatch();

  const adminStoreReady =
    currentUserStore.savingStage === SAVING_STAGE.SUCCESS &&
    bookingStore.savingStage === SAVING_STAGE.SUCCESS &&
    buildingStore.savingStage === SAVING_STAGE.SUCCESS &&
    clientStore.savingStage === SAVING_STAGE.SUCCESS;

  console.log(adminStoreReady);
  React.useEffect(() => {
    if (!isEmpty(authStore.auth)) {
      dispatch(getUserData());
      dispatch(getBookingsData());
      dispatch(getBuildingsData());
      dispatch(getClientsData());
      setStoreReady(false);
    }
  }, [authStore.savingStage]);

  React.useEffect(() => {
    if (adminStoreReady) {
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
