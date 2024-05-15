import React from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useStatusContext } from "@/context/StatusContext";
import AddLiquidityPanel from "../PoolPanels/AddLiquidityPanel";
import RemoveLiquidityPanel from "../PoolPanels/RemoveLiquidityPanel";
import RemoveLiquidityConfirmPanel from "../PoolPanels/RemoveLiquidityConfirmPanel";

const RemoveLiquidityConfirmModal = () => {
  const { removeLiquidityConfirmModalOpen } = useStatusContext();

  return (
    <Dialog
      placeholder={undefined}
      open={removeLiquidityConfirmModalOpen}
      className="bg-transparent shadow-none outline-none"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      handler={() => {}}
    >
      <DialogBody
        placeholder={undefined}
        className="z-50 mx-auto overflow-auto rounded-[20px] bg-transparent p-[20px] shadow-none"
      >
        <div>
          <RemoveLiquidityConfirmPanel />
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default RemoveLiquidityConfirmModal;
