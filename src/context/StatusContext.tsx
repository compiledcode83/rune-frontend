import { createContext, useContext, useEffect, useState } from "react";
import { StatusContextProps } from "@/propsType";

export const StatusContext = createContext<StatusContextProps>({
  connectWalletModalOpen: false,
  setConnectWalletModalOpen: () => {},
  confirmSwapModalOpen: false,
  setConfirmSwapModalOpen: () => {},
  txSubmittedModalOpen: false,
  setTxSubmittedModalOpen: () => {},
  selectTokenModalOpen: false,
  setSelectTokenModalOpen: () => {},
});

export const useStatusContext = () => useContext(StatusContext);

export const StatusProvider = ({ ...props }) => {
  const { children } = props;
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  const [txSubmittedModalOpen, setTxSubmittedModalOpen] = useState(false);
  const [selectTokenModalOpen, setSelectTokenModalOpen] = useState(false);
  const [confirmSwapModalOpen, setConfirmSwapModalOpen] = useState(false);

  return (
    <StatusContext.Provider
      value={{
        connectWalletModalOpen,
        setConnectWalletModalOpen,
        txSubmittedModalOpen,
        setTxSubmittedModalOpen,
        selectTokenModalOpen,
        setSelectTokenModalOpen,
        confirmSwapModalOpen,
        setConfirmSwapModalOpen,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
