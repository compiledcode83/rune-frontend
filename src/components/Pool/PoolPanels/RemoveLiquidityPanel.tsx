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

const RemoveLiquidityPanel = () => {
  const { setRemoveLiquidityModalOpen, setRemoveLiquidityConfirmModalOpen } =
    useStatusContext();

  return (
    <div className="mx-auto w-[300px] text-black lg:w-[526px] dark:text-white">
      <div className="mx-auto mt-8 rounded-xl bg-light-panel p-4 lg:p-8 dark:bg-dark-panel">
        <div className="flex items-center justify-between">
          <div className="invisible">
            <ChevronLeftIcon width={20} className="cursor-pointer" />
          </div>
          <div className="text-[16px] font-bold lg:text-[24px]">
            Remove Liquidity
          </div>
          <div>
            <XMarkIcon
              width={20}
              className="cursor-pointer"
              onClick={() => setRemoveLiquidityModalOpen(false)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 lg:mt-8">
          {/* <div className="flex justify-between text-[12px] lg:text-[16px]">
            <div>Amount</div>
            <div className="text-primary">Detailed</div>
          </div>
          <div className="mt-4 text-center text-[18px] font-semibold lg:text-[36px]">
            50%
          </div>
          <div className="my-2 flex justify-around gap-2">
            <div className="cursor-pointer rounded-lg border border-transparent bg-light-item px-4 py-1 transition-all hover:border-primary dark:bg-dark-item">
              25%
            </div>
            <div className="cursor-pointer rounded-lg border border-transparent bg-light-item px-4 py-1 transition-all hover:border-primary dark:bg-dark-item">
              50%
            </div>
            <div className="cursor-pointer rounded-lg border border-transparent bg-light-item px-4 py-1 transition-all hover:border-primary dark:bg-dark-item">
              75%
            </div>
            <div className="cursor-pointer rounded-lg border border-transparent bg-light-item px-4 py-1 transition-all hover:border-primary dark:bg-dark-item">
              MAX
            </div>
          </div> */}
          <div className="flex flex-col gap-2 text-[12px] lg:text-[16px]">
            <div className="flex items-center justify-between">
              <div>0.0002226458</div>
              <div className="flex items-center gap-1">
                <Image src={Eth} alt="eth" />
                <div>ETH</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>0.0000659465996</div>
              <div className="flex items-center gap-1">
                <Image src={Eos} alt="eth" />
                <div>EOS</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[12px] lg:text-[16px]">
            <div>Price</div>
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
        <div className="mt-8 flex gap-2">
          <Button
            className="w-full bg-dark-panel text-[16px] normal-case text-light-gray-font lg:text-[24px] dark:bg-light-panel"
            placeholder={undefined}
          >
            Approve
          </Button>
          <Button
            className="w-full bg-gradient text-[16px] normal-case lg:text-[24px]"
            placeholder={undefined}
            onClick={() => setRemoveLiquidityConfirmModalOpen(true)}
          >
            Remove
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

export default RemoveLiquidityPanel;
