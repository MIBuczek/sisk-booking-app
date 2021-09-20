/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState, IBookingsPayload } from '../../models/store/store-models';
import { getBookingsData } from '../../store/bookings/bookingsAction';
import { SAVING_STAGE } from '../../utils/store-data';
import Loading from './Loading';

export interface IProps {
  children: React.ReactNode;
}

const PrepareStore: React.FC<IProps> = ({ children }): JSX.Element | null => {
  const [storeReady, setStoreReady] = React.useState(true);

  const { INITIAL, SUCCESS } = SAVING_STAGE;
  const { savingStage } = useSelector((state: IReduxState): IBookingsPayload => state.bookings);
  const distpatch = useDispatch();

  React.useEffect(() => {
    if (savingStage === INITIAL) {
      // distpatch(getBookingsData());
      // setStoreReady(false);
    }
    if (savingStage === SUCCESS) {
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
