export const MODAL_TYPES = {
  MESSAGE: 'MESSAGE',
  RESERVATION: 'RESERVATION',
  CONFIRM: 'CONFIRM',
  EMPTY: 'EMPTY',
};

export const initialModal = {
  type: MODAL_TYPES.EMPTY,
  isOpen: false,
  callback: () => null,
};
