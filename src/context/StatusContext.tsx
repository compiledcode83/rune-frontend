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
  addLiquiditySelectToken1ModalOpen: false,
  setAddLiquiditySelectToken1ModalOpen: () => {},
  addLiquiditySelectToken2ModalOpen: false,
  setAddLiquiditySelectToken2ModalOpen: () => {},
  removeLiquidityModalOpen: false,
  setRemoveLiquidityModalOpen: () => {},
  removeLiquidityConfirmModalOpen: false,
  setRemoveLiquidityConfirmModalOpen: () => {},
  swapSelectSendTokenModalOpen: false,
  setSwapSelectSendTokenModalOpen: () => {},
  swapSelectReceiveTokenModalOpen: false,
  setSwapSelectReceiveTokenModalOpen: () => {},
  swapConfirmModalOpen: false,
  setSwapConfirmModalOpen: () => {},
  swapTxSubmittedModalOpen: false,
  setSwapTxSubmittedModalOpen: () => {},
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
    addLiquiditySelectToken1ModalOpen,
    setAddLiquiditySelectToken1ModalOpen,
  ] = useState(false);
  const [
    addLiquiditySelectToken2ModalOpen,
    setAddLiquiditySelectToken2ModalOpen,
  ] = useState(false);
  const [removeLiquidityModalOpen, setRemoveLiquidityModalOpen] =
    useState(false);
  const [removeLiquidityConfirmModalOpen, setRemoveLiquidityConfirmModalOpen] =
    useState(false);

  const [swapSelectSendTokenModalOpen, setSwapSelectSendTokenModalOpen] =
    useState(false);

  const [swapSelectReceiveTokenModalOpen, setSwapSelectReceiveTokenModalOpen] =
    useState(false);
  const [swapConfirmModalOpen, setSwapConfirmModalOpen] = useState(false);
  const [swapTxSubmittedModalOpen, setSwapTxSubmittedModalOpen] =
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
        addLiquiditySelectToken1ModalOpen,
        setAddLiquiditySelectToken1ModalOpen,
        addLiquiditySelectToken2ModalOpen,
        setAddLiquiditySelectToken2ModalOpen,
        removeLiquidityModalOpen,
        setRemoveLiquidityModalOpen,
        removeLiquidityConfirmModalOpen,
        setRemoveLiquidityConfirmModalOpen,

        swapSelectSendTokenModalOpen,
        setSwapSelectSendTokenModalOpen,
        swapSelectReceiveTokenModalOpen,
        setSwapSelectReceiveTokenModalOpen,
        swapConfirmModalOpen,
        setSwapConfirmModalOpen,
        swapTxSubmittedModalOpen,
        setSwapTxSubmittedModalOpen,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
