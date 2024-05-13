import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup, Input } from "@material-tailwind/react";
import React from "react";

function ClaimPanel() {
  return (
    <div className="relative z-10 mx-auto mt-[50px] w-[320px] rounded-[13px] bg-light-panel px-7 py-8 lg:mt-[150px] lg:w-[524px] dark:bg-dark-panel">
      <div className="flex flex-col items-start">
        <div className="mb-10 flex w-full justify-center">
          <div className="mx-auto text-[20px] font-bold">Claim Reward</div>
        </div>
        <div className="mb-2 text-[12px] lg:text-[16px]">
          Reward Date: 25/04/2024
        </div>
        <div className="mb-5 text-[10px] lg:text-[14px]  dark:text-[#B7B7B7]">
          Last claim: 30/02/2024 14:57
        </div>
        <div className="mb-3 flex w-full justify-between">
          <div className="text-[12px] lg:text-[16px]">
            Your reward: 0.0000 ETH
          </div>
          <div className="text-[12px] text-[#A7A7A7] lg:text-[14px]">
            dev fee
          </div>
        </div>
        <input
          placeholder="Address"
          className="mb-4 h-[47px] w-full cursor-text rounded-[6px] bg-[#394356] p-4 font-bold outline-none"
        />
        <div className="mb-1 text-[12px] text-[#FF5353] lg:text-[14px]">
          Claim Min-Max (after tax): 300.00 - 1,000.00 ETH
        </div>
        <div className="mb-2 text-[12px] text-[#00FF75] lg:text-[14px]">
          Require ETH in wallet : 100.00 ETH
        </div>
        <div className="mb-5 flex w-full flex-col gap-1 text-[12px] lg:text-[14px]">
          <div className="flex justify-between">
            <div>Fee 5%</div>
            <div>0.00 ETH</div>
          </div>
          <div className="flex justify-between">
            <div>Total earn</div>
            <div>0.00 ETH</div>
          </div>
        </div>
        <div className="mb-14 flex flex-col gap-1 text-[12px] lg:text-[14px]">
          <div>-Fee 5% is calculated from 30/01/2024 13:57</div>
          <div>
            -When claim success the fee will immediately reset to the 1st day
          </div>
        </div>
        <Button
          placeholder={undefined}
          className="flex w-full justify-center bg-gradient text-[14px] font-bold normal-case  lg:text-[18px]"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default ClaimPanel;
