import {isEmpty} from 'lodash';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as StoreActions from 'store';
import {IReduxState} from 'models';
import {SAVING_STAGE} from 'utils';
import Loading from 'components/molecules/Loading';

export interface IProps {
   children: React.ReactNode;
}

/**
 * Method to check current url and if is user or admin then load data
 * @returns {Boolean}
 */
const checkCurrentUrl = (): boolean => !['#/contact', '#/login'].includes(window.location.hash);

/**
 * Prepare redux store during app initialization.
 *
 * @param {IProps} props
 * @returns
 */
const PrepareStore: React.FC<IProps> = ({children}): JSX.Element | null => {
   const [shouldLoad] = React.useState<boolean>(checkCurrentUrl());
   const [storeReady, setStoreReady] = React.useState<boolean>(true);

   const dispatch = useDispatch();
   const {authStore, currentUserStore, bookingStore, clientStore, buildingStore} = useSelector(
      (state: IReduxState): IReduxState => state
   );

   const adminStoreReady =
      currentUserStore.savingStage === SAVING_STAGE.SUCCESS &&
      clientStore.savingStage === SAVING_STAGE.SUCCESS &&
      buildingStore.savingStage === SAVING_STAGE.SUCCESS;

   const userStoreReady = bookingStore.savingStage === SAVING_STAGE.SUCCESS;

   /**
    * Effect to start loading data from firebase
    */
   React.useEffect(() => {
      if (shouldLoad) {
         if (!isEmpty(authStore.auth)) {
            dispatch(StoreActions.getUserData());
            dispatch(StoreActions.getClientsData());
            dispatch(StoreActions.getBuildingsData());
            setStoreReady(false);
         } else {
            dispatch(StoreActions.getBookingDataForUser());
            dispatch(StoreActions.getBuildingsData());
            setStoreReady(false);
         }
      }
   }, [authStore.savingStage]);

   /**
    * Effect to set store ready flag and close loaded component.
    */
   React.useEffect(() => {
      if (adminStoreReady && shouldLoad) {
         setStoreReady(true);
      }
      if (userStoreReady && shouldLoad) {
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
