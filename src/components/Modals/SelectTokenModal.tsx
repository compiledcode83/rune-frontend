import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";
import SelectTokenPanel from "../Header/Panels/SelectTokenPanel";
import { useStatusContext } from "@/context/StatusContext";

const SelectTokenModal = () => {
  const { selectTokenModalOpen, setSelectTokenModalOpen } = useStatusContext();
  return (
    <Dialog
      placeholder={undefined}
      open={selectTokenModalOpen}
      className="bg-transparent outline-none"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      handler={() => {}}
    >
      <DialogBody
        placeholder={undefined}
        className="z-50 mx-auto w-[520px] overflow-auto rounded-[20px] bg-[#252B36] p-[20px] text-white backdrop-blur-sm"
      >
        <SelectTokenPanel />
      </DialogBody>
    </Dialog>
  );
};

export default SelectTokenModal;
