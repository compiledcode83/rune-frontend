import React from "react";
import SelectTokenModal from "./SelectTokenModal";
import ConfirmSwapModal from "./ConfirmSwapModal";
import ImportTokenModal from "./ImportTokenModal";
import AddLiquidityModal from "../Pool/PoolModals/AddLiquidityModal";
import AddLiquidityConfirmModal from "../Pool/PoolModals/AddLiquidityConfirmModal";
import AddLiquiditySelectTokenAModal from "../Pool/PoolModals/AddLiquiditySelectTokenAModal";
import AddLiquiditySelectTokenBModal from "../Pool/PoolModals/AddLiquiditySelectTokenBModal";
import RemoveLiquidityConfirmModal from "../Pool/PoolModals/RemoveLiquidityConfirmModal";
import RemoveLiquidityModal from "../Pool/PoolModals/RemoveLiquidityModal";
import CollectFeesModal from "../Pool/PoolModals/CollectFeesModal";
import ConnectWalletModal from "./ConnectWalletModal";
import TxSubmittedModal from "./TxSubmittedModal";

const Modals = () => {
  return (
    <div>
      <SelectTokenModal />
      <ConfirmSwapModal />
      <ImportTokenModal />
      <AddLiquidityModal />
      <AddLiquidityConfirmModal />
      <AddLiquiditySelectTokenAModal />
      <AddLiquiditySelectTokenBModal />
      <RemoveLiquidityModal />
      <RemoveLiquidityConfirmModal />
      <ConnectWalletModal />
      <TxSubmittedModal />
      <CollectFeesModal />
    </div>
  );
};

export default Modals;
