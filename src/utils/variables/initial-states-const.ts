import { IAdminState, IMainState } from 'models';

const initialMainState: IMainState = {
  city: {
    value: 'siechnice',
    label: 'Siechnice'
  },
  building: undefined
};

const initialAdminState: IAdminState = {
  ...initialMainState
};

export { initialMainState, initialAdminState };
