import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import ArrowDown from "@/assets/imgs/arrowdown.svg";
import Arrow2 from "@/assets/imgs/arrow-2.svg";
import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { BalanceType, TokenType } from "@/types/type";

import poolApiService from "@/api.services/pool/pool.api.service";
import { useUserContext } from "@/context/UserContext";

const AddLiquidityPanel = () => {
  const { setCollectFeesModalOpen } = useStatusContext();

  const { ordinalAddress } = useUserContext();
  const [addLiquidityTokenABalance, setAddLiquidityTokenABalance] = useState(0);
  const [addLiquidityTokenBBalance, setAddLiquidityTokenBBalance] = useState(0);

  return (
    <div className="mx-auto w-[300px] text-black lg:w-[526px] dark:text-white">
      <div className="mx-auto mt-8 rounded-xl bg-light-panel p-4 lg:p-8 dark:bg-dark-panel">
        <div className="flex flex-col">
          <div className="mb-10 flex justify-between">
            <div className="invisible">
              <ChevronLeftIcon width={20} className="cursor-pointer" />
            </div>
            <div className="text-[16px] font-bold lg:text-[24px]">
              Collect Fees
            </div>
            <div className="mr-0">
              <XMarkIcon
                width={20}
                className="cursor-pointer"
                onClick={() => setCollectFeesModalOpen(false)}
              />
            </div>
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
              About fee
            </div>
          </div>
          <input
            placeholder="Address"
            className="mb-4 h-[47px] w-full cursor-text rounded-[6px] bg-white p-4 font-bold outline-none dark:bg-[#394356]"
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
    </div>
  );
};

export default AddLiquidityPanel;
