import React from "react";
import SelectTokenModal from "./SelectTokenModal";
import ConfirmSwapModal from "./ConfirmSwapModal";
import TxSubmittedModal from "./TxSubmittedModal";
import ImportTokenModal from "./ImportTokenModal";
import AddLiquidityModal from "../Pool/PoolModals/AddLiquidityModal";
import AddLiquidityConfirmModal from "../Pool/PoolModals/AddLiquidityConfirmModal";
import AddLiquiditySelectTokenAModal from "../Pool/PoolModals/AddLiquiditySelectTokenAModal";
import AddLiquiditySelectTokenBModal from "../Pool/PoolModals/AddLiquiditySelectTokenBModal";
import RemoveLiquidityConfirmModal from "./RemoveLiquidityConfirmModal";
import RemoveLiquidityModal from "./RemoveLiquidityModal";
import ConnectWalletModal from "./ConnectWalletModal";

const Modals = () => {
  return (
    <div>
      <SelectTokenModal />
      <ConfirmSwapModal />
      <TxSubmittedModal />
      <ImportTokenModal />
      <AddLiquidityModal />
      <AddLiquidityConfirmModal />
      <AddLiquiditySelectTokenAModal />
      <AddLiquiditySelectTokenBModal />
      <RemoveLiquidityModal />
      <RemoveLiquidityConfirmModal />
      <ConnectWalletModal />
    </div>
  );
};

export default Modals;
