import { TSelect } from 'models';

interface IMainState {
  city?: TSelect;
  building?: TSelect;
  [x: string]: TSelect | undefined;
}

interface IAdminState extends IMainState {}

export type { IMainState, IAdminState };
