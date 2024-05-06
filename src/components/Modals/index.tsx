import React from "react";
import SelectTokenModal from "./SelectTokenModal";
import ConfirmSwapModal from "./ConfirmSwapModal";
import TxSubmittedModal from "./TxSubmittedModal";

const Modals = () => {
  return (
    <div>
      <SelectTokenModal />
      <ConfirmSwapModal />
      <TxSubmittedModal />
    </div>
  );
};

export default Modals;
