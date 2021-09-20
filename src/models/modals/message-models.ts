export interface IMessage {
  email: string;
  phone: string;
  message: string;
  police: boolean;
}

export const innitlaMessage: IMessage = {
  email: '',
  phone: '',
  message: '',
  police: false,
};
