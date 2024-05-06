import React from "react";
import TxSubmittedPanel from "../Header/Panels/TxSubmittedPanel";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useStatusContext } from "@/context/StatusContext";

const TxSubmittedModal = () => {
  const { txSubmittedModalOpen } = useStatusContext();
  return (
    <Dialog
      placeholder={undefined}
      open={txSubmittedModalOpen}
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
        <TxSubmittedPanel />
      </DialogBody>
    </Dialog>
  );
};

export default TxSubmittedModal;
