/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBookingsPayload, IReduxState } from '../../models';
import { SAVING_STAGE } from '../../utils/variables/store-const';
import Loading from './Loading';

export interface IProps {
  children: React.ReactNode;
}

const PrepareStore: React.FC<IProps> = ({ children }): JSX.Element | null => {
  const [storeReady, setStoreReady] = React.useState(true);

  const { savingStage } = useSelector((state: IReduxState): IBookingsPayload => state.bookingStore);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (savingStage === SAVING_STAGE.INITIAL) {
      // dispatch(getBookingsData());
      // setStoreReady(false);
    }
    if (savingStage === SAVING_STAGE.SUCCESS) {
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
