import React from "react";
import SwapSelectSendTokenModal from "./SwapSelectSendTokenModal";
import SwapSelectReceiveTokenModal from "./SwapSelectReceiveTokenModal";
import SwapConfirmModal from "./SwapConfirmModal";
import SwapTxSubmittedModal from "./SwapTxSubmittedModal";

const SwapModals = () => {
  return (
    <div>
      <SwapSelectSendTokenModal />
      <SwapSelectReceiveTokenModal />
      <SwapConfirmModal />
    </div>
  );
};

export default SwapModals;
