import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as StoreActions from 'store';
import {IReduxState} from 'models';
import {SAVING_STAGE} from 'utils';
import Loading from 'components/molecules/Loading';
import {isEmpty} from 'lodash';

export interface IProps {
   children: React.ReactNode;
}

/**
 * Prepare redux store during app initialization.
 *
 * @param {IProps} props
 * @returns
 */
const PrepareStore: React.FC<IProps> = ({children}): JSX.Element | null => {
   const [storeReady, setStoreReady] = React.useState<boolean>(true);

   const dispatch = useDispatch();
   const {
      buildingStore: {buildings, savingStage}
   } = useSelector((state: IReduxState): IReduxState => state);

   /**
    * Effect to start loading data from firebase
    */
   React.useEffect(() => {
      if (isEmpty(buildings) && savingStage === SAVING_STAGE.INITIAL)
         dispatch(StoreActions.getBuildingsData());
   }, []);

   /**
    * Effect to set store ready flag and close loaded component.
    */
   React.useEffect(() => {
      if (buildings.length && savingStage === SAVING_STAGE.SUCCESS) {
         setStoreReady(true);
      }
   }, [savingStage]);

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
