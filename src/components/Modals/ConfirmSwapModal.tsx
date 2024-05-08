import { useStatusContext } from "@/context/StatusContext";
import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";
import ConfirmSwapPanel from "../Panels/ConfirmSwapPanel";

const ConfirmSwapModal = () => {
  const { confirmSwapModalOpen } = useStatusContext();
  return (
    <Dialog
      placeholder={undefined}
      open={confirmSwapModalOpen}
      className="bg-transparent outline-none"
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
        <ConfirmSwapPanel />
      </DialogBody>
    </Dialog>
  );
};

export default ConfirmSwapModal;
