import {IPayload} from 'models';

interface IAuth {
   email: string;
   uid: string;
}

interface IAuthPayload extends IPayload {
   auth?: IAuth;
}

interface IAuthAction {
   type: string;
   payload: IAuthPayload;
}

export type {IAuth, IAuthPayload, IAuthAction};
