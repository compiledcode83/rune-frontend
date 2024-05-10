import React from "react";
import SelectTokenModal from "./SelectTokenModal";
import ConfirmSwapModal from "./ConfirmSwapModal";
import TxSubmittedModal from "./TxSubmittedModal";
import ImportTokenModal from "./ImportTokenModal";
import AddLiquidityModal from "./AddLiquidityModal";
import AddLiquidityConfirmModal from "./AddLiquidityConfirmModal";
import AddLiquiditySelectTokenModal from "./AddLiquiditySelectTokenModal";
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
      <AddLiquiditySelectTokenModal />
      <RemoveLiquidityModal />
      <RemoveLiquidityConfirmModal />
      <ConnectWalletModal />
    </div>
  );
};

export default Modals;
