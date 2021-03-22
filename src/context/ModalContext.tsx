import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface IModal {
  type: string;
  isOpen: boolean;
  callback: () => void;
}

interface IModalContext {
  modal: IModal;
  setModal: Dispatch<SetStateAction<IModal>>;
}

export const initialModal = {
  type: '',
  isOpen: false,
  callback: () => null,
};

export const ModalContext = createContext<IModalContext>({
  modal: { ...initialModal },
  setModal: () => null,
});

export interface IProps {
  children: ReactNode;
}

const ModalContextProvider: React.FC<IProps> = ({ children }): JSX.Element => {
  const [modal, setModal] = useState<IModal>({ ...initialModal });

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
