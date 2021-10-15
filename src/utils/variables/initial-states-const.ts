import { IAdminState, IMainState } from 'models';

const initialMainState: IMainState = {
  city: undefined,
  building: undefined
};

const initialAdminState: IAdminState = {
  ...initialMainState
};

export { initialMainState, initialAdminState };
