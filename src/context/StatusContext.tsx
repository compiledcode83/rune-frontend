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
  importTokenModalOpen: false,
  setImportTokenModalOpen: () => {},
  addLiquidityModalOpen: false,
  setAddLiquidityModalOpen: () => {},
  addLiquidityConfirmModalOpen: false,
  setAddLiquidityConfirmModalOpen: () => {},
  addLiquiditySelectTokenModalOpen: false,
  setAddLiquiditySelectTokenModalOpen: () => {},
  removeLiquidityModalOpen: false,
  setRemoveLiquidityModalOpen: () => {},
  removeLiquidityConfirmModalOpen: false,
  setRemoveLiquidityConfirmModalOpen: () => {},
});

export const useStatusContext = () => useContext(StatusContext);

export const StatusProvider = ({ ...props }) => {
  const { children } = props;
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  const [txSubmittedModalOpen, setTxSubmittedModalOpen] = useState(false);
  const [selectTokenModalOpen, setSelectTokenModalOpen] = useState(false);
  const [confirmSwapModalOpen, setConfirmSwapModalOpen] = useState(false);
  const [importTokenModalOpen, setImportTokenModalOpen] = useState(false);
  const [addLiquidityModalOpen, setAddLiquidityModalOpen] = useState(false);
  const [addLiquidityConfirmModalOpen, setAddLiquidityConfirmModalOpen] =
    useState(false);
  const [
    addLiquiditySelectTokenModalOpen,
    setAddLiquiditySelectTokenModalOpen,
  ] = useState(false);
  const [removeLiquidityModalOpen, setRemoveLiquidityModalOpen] =
    useState(false);
  const [removeLiquidityConfirmModalOpen, setRemoveLiquidityConfirmModalOpen] =
    useState(false);

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
        importTokenModalOpen,
        setImportTokenModalOpen,
        addLiquidityModalOpen,
        setAddLiquidityModalOpen,
        addLiquidityConfirmModalOpen,
        setAddLiquidityConfirmModalOpen,
        addLiquiditySelectTokenModalOpen,
        setAddLiquiditySelectTokenModalOpen,
        removeLiquidityModalOpen,
        setRemoveLiquidityModalOpen,
        removeLiquidityConfirmModalOpen,
        setRemoveLiquidityConfirmModalOpen,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
