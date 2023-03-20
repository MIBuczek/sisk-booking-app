import { TSelect } from 'models';

interface IMainState {
   city: TSelect;
   building: TSelect;
   [x: string]: TSelect;
}

interface IAdminState extends IMainState {}

export type { IMainState, IAdminState };
