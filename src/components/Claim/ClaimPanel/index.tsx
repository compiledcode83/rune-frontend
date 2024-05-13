import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import React from "react";

function ClaimPanel() {
  return (
    <div className="mx-auto mt-96 w-[320px] rounded-[13px] px-7 py-8 lg:w-[524px] dark:bg-dark-panel">
      <div className="flex flex-col items-start">
        <div className="mb-10 flex w-full justify-between">
          <div className="mx-auto text-[20px] font-bold">Claim Reward</div>
          <div>
            <XMarkIcon
              width={28}
              className="cursor-pointer"
              // onClick={() => setSwapConfirmModalOpen(false)}
            />
          </div>
        </div>
        <div className="mb-2 text-[12px] lg:text-[16px]">
          Reward Date: 25/04/2024
        </div>
        <div className="mb-5 text-[10px] lg:text-[14px]  dark:text-[#B7B7B7]">
          Last claim: 30/02/2024 14:57
        </div>
        <div className="flex w-full justify-between">
          <div className="text-[12px] lg:text-[16px]">
            Your reward: 0.0000 ETH
          </div>
          <div className="text-[14px] text-[#A7A7A7]">dev fee</div>
        </div>
        <Input
          placeholder="Address"
          crossOrigin={undefined}
          label={undefined}
          color="amber"
          className="text-[18px] font-bold text-black lg:!text-[24px] dark:text-white"
        />
      </div>
    </div>
  );
}

export default ClaimPanel;
