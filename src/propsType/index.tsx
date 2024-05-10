import { WalletTypes } from "@/types/type";

export type ThemeContextProps = {
  darkMode: boolean;
  setDarkMode: (open: boolean) => void;
  handleTheme: () => void;
};

export type StatusContextProps = {
  connectWalletModalOpen: boolean;
  setConnectWalletModalOpen: (open: boolean) => void;
  selectTokenModalOpen: boolean;
  setSelectTokenModalOpen: (open: boolean) => void;
  confirmSwapModalOpen: boolean;
  setConfirmSwapModalOpen: (open: boolean) => void;
  txSubmittedModalOpen: boolean;
  setTxSubmittedModalOpen: (open: boolean) => void;
  importTokenModalOpen: boolean;
  setImportTokenModalOpen: (open: boolean) => void;
  addLiquidityModalOpen: boolean;
  setAddLiquidityModalOpen: (open: boolean) => void;
  addLiquidityConfirmModalOpen: boolean;
  setAddLiquidityConfirmModalOpen: (open: boolean) => void;
  addLiquiditySelectTokenModalOpen: boolean;
  setAddLiquiditySelectTokenModalOpen: (open: boolean) => void;
  removeLiquidityModalOpen: boolean;
  setRemoveLiquidityModalOpen: (open: boolean) => void;
  removeLiquidityConfirmModalOpen: boolean;
  setRemoveLiquidityConfirmModalOpen: (open: boolean) => void;

  swapSelectSendTokenModalOpen: boolean;
  setSwapSelectSendTokenModalOpen: (open: boolean) => void;

  swapSelectReceiveTokenModalOpen: boolean;
  setSwapSelectReceiveTokenModalOpen: (open: boolean) => void;

  swapConfirmModalOpen: boolean;
  setSwapConfirmModalOpen: (open: boolean) => void;

  swapTxSubmittedModalOpen: boolean;
  setSwapTxSubmittedModalOpen: (open: boolean) => void;
};

export type UserSessionProps = {
  walletType: WalletTypes;
  setWalletType: (c: WalletTypes) => void;
  paymentAddress: string;
  setPaymentAddress: (c: string) => void;
  paymentPublicKey: string;
  setPaymentPublicKey: (c: string) => void;
  ordinalAddress: string;
  setOrdinalAddress: (c: string) => void;
  ordinalPublicKey: string;
  setOrdinalPublicKey: (c: string) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  handleDisconnect: () => void;
};
