import React from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useStatusContext } from "@/context/StatusContext";
import AddLiquiditySelectToken2Panel from "../PoolPanels/AddLiquiditySelectToken2Panel";

const AddLiquiditySelectToken2Modal = () => {
  const { addLiquiditySelectToken2ModalOpen } = useStatusContext();
  console.log({ addLiquiditySelectToken2ModalOpen });
  return (
    <Dialog
      placeholder={undefined}
      open={addLiquiditySelectToken2ModalOpen}
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
          <AddLiquiditySelectToken2Panel />
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default AddLiquiditySelectToken2Modal;
