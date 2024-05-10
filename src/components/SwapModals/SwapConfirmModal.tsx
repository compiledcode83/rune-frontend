import { useStatusContext } from "@/context/StatusContext";
import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";
import SwapConfirmPanel from "../SwapPanels/SwapConfirmPanel";

const SwapConfirmModal = () => {
  const { swapConfirmModalOpen } = useStatusContext();
  return (
    <Dialog
      placeholder={undefined}
      open={swapConfirmModalOpen}
      className="bg-transparent shadow-none outline-none"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      handler={() => {}}
    >
      <DialogBody
        placeholder={undefined}
        className="z-50 mx-auto w-[350px] overflow-auto rounded-[20px] bg-light-item p-[20px] text-black shadow-none backdrop-blur-sm lg:w-[520px] dark:bg-dark-panel dark:text-white"
      >
        <SwapConfirmPanel />
      </DialogBody>
    </Dialog>
  );
};

export default SwapConfirmModal;
