import React from "react";
import SelectTokenModal from "./SelectTokenModal";
import ConfirmSwapModal from "./ConfirmSwapModal";
import TxSubmittedModal from "./TxSubmittedModal";
import ImportTokenModal from "./ImportTokenModal";
import AddLiquidityModal from "../Pool/PoolModals/AddLiquidityModal";
import AddLiquidityConfirmModal from "../Pool/PoolModals/AddLiquidityConfirmModal";
import AddLiquiditySelectToken1Modal from "../Pool/PoolModals/AddLiquiditySelectToken1Modal";
import AddLiquiditySelectToken2Modal from "../Pool/PoolModals/AddLiquiditySelectToken2Modal";
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
      <AddLiquiditySelectToken1Modal />
      <AddLiquiditySelectToken2Modal />
      <RemoveLiquidityModal />
      <RemoveLiquidityConfirmModal />
      <ConnectWalletModal />
    </div>
  );
};

export default Modals;
