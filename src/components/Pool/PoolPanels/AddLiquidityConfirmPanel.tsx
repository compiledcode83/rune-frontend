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
import SettingPanel from "../../Panels/SettingPanel";
import { useStatusContext } from "@/context/StatusContext";
import {
  XMarkIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

const AddLiquidityConfirmPanel = () => {
  const { setAddLiquidityConfirmModalOpen, setAddLiquidityModalOpen } =
    useStatusContext();

  const handleConfirmSupply = () => {
    setAddLiquidityConfirmModalOpen(false);
    setAddLiquidityModalOpen(false);
  };

  return (
    <div className="mx-auto w-[300px] text-black lg:w-[526px] dark:text-white">
      <div className="mx-auto mt-8 rounded-xl bg-light-panel p-4 lg:p-8 dark:bg-dark-panel">
        <div className="flex items-center justify-between">
          <div className="invisible">
            <ChevronLeftIcon width={20} className="cursor-pointer" />
          </div>
          <div className="text-[16px] font-bold lg:text-[24px]">
            You Will Receive
          </div>
          <div>
            <XMarkIcon
              width={20}
              className="cursor-pointer"
              onClick={() => setAddLiquidityConfirmModalOpen(false)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 lg:mt-8">
          <div className="text-[16px] font-semibold lg:text-[24px]">
            0.000922108941
          </div>
          <div className="text-[12px] lg:text-[16px]">ETH/EOS Pool Tokens</div>
          <div className="text-[12px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
            Output is estimated. If the price changes by more than 0.5% your
            transaction revert
          </div>
          <div className="flex flex-col gap-2 text-[12px] lg:text-[16px]">
            <div className="flex items-center justify-between">
              <div>ETH Deposited</div>
              <div className="flex items-center gap-1">
                <Image src={Eth} alt="eth" />
                <div>0.022</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>EOS Deposited</div>
              <div className="flex items-center gap-1">
                <Image src={Eos} alt="eth" />
                <div>82.89</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[12px] lg:text-[16px]">
            <div>Rates</div>
            <div className="flex flex-col gap-2">
              <div>1 ETH = 3753.23 EOS</div>
              <div>1 EOS = 0.00027 ETH</div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] lg:text-[14px]">
            <div>Share of Pool</div>
            <div>0.14%</div>
          </div>
        </div>
        <div className="mt-8">
          <Button
            className="w-full bg-gradient text-[16px] normal-case lg:text-[24px]"
            placeholder={undefined}
            onClick={() => handleConfirmSupply()}
          >
            Confirm Supply
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

export default AddLiquidityConfirmPanel;
