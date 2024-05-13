import React from "react";
import TxSubmittedPanel from "../../Panels/TxSubmittedPanel";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useStatusContext } from "@/context/StatusContext";
import SwapTxSubmittedPanel from "../SwapPanels/SwapTxSubmittedPanel";

type Props = {
  txId: string;
};

const SwapTxSubmittedModal: React.FC<Props> = ({ txId }) => {
  const { swapTxSubmittedModalOpen } = useStatusContext();
  return (
    <Dialog
      placeholder={undefined}
      open={swapTxSubmittedModalOpen}
      className="bg-transparent shadow-none outline-none"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      handler={() => {}}
    >
      <DialogBody
        placeholder={undefined}
        className="z-50 mx-auto w-[350px] overflow-auto rounded-[20px] bg-light-item p-[20px] text-black backdrop-blur-sm lg:w-[520px] dark:bg-dark-panel dark:text-white"
      >
        <SwapTxSubmittedPanel txId={txId} />
      </DialogBody>
    </Dialog>
  );
};

export default SwapTxSubmittedModal;
