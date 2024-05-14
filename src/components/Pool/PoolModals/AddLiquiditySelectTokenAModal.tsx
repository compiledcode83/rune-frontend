import React from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useStatusContext } from "@/context/StatusContext";
import AddLiquiditySelectTokenAPanel from "../PoolPanels/AddLiquiditySelectTokenAPanel";

const AddLiquiditySelectTokenAModal = () => {
  const { addLiquiditySelectTokenAModalOpen } = useStatusContext();

  return (
    <Dialog
      placeholder={undefined}
      open={addLiquiditySelectTokenAModalOpen}
      className="bg-transparent shadow-none outline-none"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      handler={() => {}}
    >
      <DialogBody
        placeholder={undefined}
        className="z-50 mx-auto w-[350px] overflow-auto rounded-[20px] bg-light-panel p-[20px] text-black backdrop-blur-sm lg:w-[520px] dark:bg-dark-panel dark:text-white"
      >
        <div>
          <AddLiquiditySelectTokenAPanel />
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default AddLiquiditySelectTokenAModal;
