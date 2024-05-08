import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Setting from "@/assets/imgs/setting.svg";
import Eth from "@/assets/imgs/ETH.svg";
import Eos from "@/assets/imgs/EOS.svg";
import ArrowDown from "@/assets/imgs/arrowdown.svg";
import Arrow2 from "@/assets/imgs/arrow-2.svg";
import SettingPanel from "./SettingPanel";
import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

const AddLiquidityPanel = () => {
  const {
    setAddLiquidityModalOpen,
    setAddLiquidityConfirmModalOpen,
    setAddLiquiditySelectTokenModalOpen,
  } = useStatusContext();

  return (
    <div className="mx-auto w-[300px] text-black lg:w-[526px] dark:text-white">
      <div className="mx-auto mt-8 rounded-xl bg-light-panel p-4 lg:p-8 dark:bg-dark-panel">
        <div className="flex items-center justify-between">
          <div className="invisible">
            <ChevronLeftIcon width={20} className="cursor-pointer" />
          </div>
          <div className="text-[16px] font-bold lg:text-[24px]">
            Add Liquidity
          </div>
          <div>
            <XMarkIcon
              width={20}
              className="cursor-pointer"
              onClick={() => setAddLiquidityModalOpen(false)}
            />
          </div>
        </div>
        <div className="relative mt-4 lg:mt-8">
          <div className="">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12px] lg:text-[16px]">Input</div>
                <div className="text-[14px] font-bold lg:text-[24px]">
                  0.0425
                </div>
                <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
                  Balance: 70.42
                </div>
              </div>
              <div
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-item px-4 py-2 lg:gap-4 dark:bg-dark-item"
                onClick={() => setAddLiquiditySelectTokenModalOpen(true)}
              >
                <Image src={Eth} alt="eth" />
                <div className="text-[12px] lg:text-[14px]">ETH</div>
                <Image src={ArrowDown} alt="eth" />
              </div>
            </div>
          </div>
          <div className="my-8 h-[1px] bg-[#535358]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full  border-[2px] border-light-panel bg-light-item p-2 dark:border-dark-panel dark:bg-dark-item">
              <Image src={Arrow2} alt="exchangearrow" />
            </div>
          </div>
          <div className="">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12px] lg:text-[16px]">Input</div>
                <div className="text-[14px] font-bold lg:text-[24px]">
                  82.89
                </div>
                <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
                  Balance: 0
                </div>
              </div>
              <div
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-light-item px-4 py-2 lg:gap-4 dark:bg-dark-item"
                onClick={() => setAddLiquiditySelectTokenModalOpen(true)}
              >
                <Image src={Eos} alt="eth" />
                <div className="text-[12px] lg:text-[14px]">EOS</div>
                <Image src={ArrowDown} alt="eth" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-2 text-[12px] lg:mt-4 lg:text-[14px]">
          <div className="flex items-center justify-between">
            <div>Share of Pool</div>
            <div>0.14%</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Price</div>
            <div>0.00027 ETH per 1 EOS</div>
          </div>
        </div>
        <div className="mt-8">
          <Button
            className="w-full bg-gradient text-[16px] normal-case lg:text-[24px]"
            placeholder={undefined}
            onClick={() => setAddLiquidityConfirmModalOpen(true)}
          >
            Supply
          </Button>
        </div>
      </div>
      <div className="mt-8 text-center text-[12px] text-white lg:text-[16px]">
        By adding liquidity earn 0.3% of all trades on this pair proportional to
        your share of the pool. Fees are added to the pool, accrue in real time
        and can be claimed by withdrawing your liquidity
      </div>
    </div>
  );
};

export default AddLiquidityPanel;
