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
  addLiquiditySelectTokenAModalOpen: false,
  setAddLiquiditySelectTokenAModalOpen: () => {},
  addLiquiditySelectTokenBModalOpen: false,
  setAddLiquiditySelectTokenBModalOpen: () => {},
  removeLiquidityModalOpen: false,
  setRemoveLiquidityModalOpen: () => {},
  removeLiquidityConfirmModalOpen: false,
  setCollectFeesModalOpen: () => {},
  collectFeesModalOpen: false,
  setRemoveLiquidityConfirmModalOpen: () => {},
  swapSelectSendTokenModalOpen: false,
  setSwapSelectSendTokenModalOpen: () => {},
  swapSelectReceiveTokenModalOpen: false,
  setSwapSelectReceiveTokenModalOpen: () => {},
  swapConfirmModalOpen: false,
  setSwapConfirmModalOpen: () => {},
  transactionId: "",
  setTransactionId: () => {},
  transactionDesc: "",
  setTransactionDesc: () => {},
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
  const [collectFeesModalOpen, setCollectFeesModalOpen] = useState(false);
  const [
    addLiquiditySelectTokenAModalOpen,
    setAddLiquiditySelectTokenAModalOpen,
  ] = useState(false);
  const [
    addLiquiditySelectTokenBModalOpen,
    setAddLiquiditySelectTokenBModalOpen,
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
  const [transactionId, setTransactionId] = useState("");
  const [transactionDesc, setTransactionDesc] = useState("");
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
        addLiquiditySelectTokenAModalOpen,
        setAddLiquiditySelectTokenAModalOpen,
        addLiquiditySelectTokenBModalOpen,
        setAddLiquiditySelectTokenBModalOpen,
        removeLiquidityModalOpen,
        setRemoveLiquidityModalOpen,
        removeLiquidityConfirmModalOpen,
        setRemoveLiquidityConfirmModalOpen,
        collectFeesModalOpen,
        setCollectFeesModalOpen,

        swapSelectSendTokenModalOpen,
        setSwapSelectSendTokenModalOpen,
        swapSelectReceiveTokenModalOpen,
        setSwapSelectReceiveTokenModalOpen,
        swapConfirmModalOpen,
        setSwapConfirmModalOpen,
        transactionId,
        setTransactionId,
        transactionDesc,
        setTransactionDesc,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
