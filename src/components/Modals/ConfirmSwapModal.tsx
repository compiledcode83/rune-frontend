import { useStatusContext } from "@/context/StatusContext";
import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";
import ConfirmSwapPanel from "../Header/Panels/ConfirmSwapPanel";

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
        className="mx-auto w-[520px] overflow-auto rounded-[20px] bg-[#252B36] p-[20px] text-white"
      >
        <ConfirmSwapPanel />
      </DialogBody>
    </Dialog>
  );
};

export default ConfirmSwapModal;
