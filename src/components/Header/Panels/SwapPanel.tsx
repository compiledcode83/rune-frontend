import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Setting from "@/assets/imgs/setting.svg";
import Eth from "@/assets/imgs/ETh.svg";
import Eos from "@/assets/imgs/EOS.svg";
import ArrowDown from "@/assets/imgs/arrowdown.svg";
import Arrow2 from "@/assets/imgs/arrow-2.svg";
import SettingPanel from "./SettingPanel";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useStatusContext } from "@/context/StatusContext";

const SwapPanel = () => {
  const { setSelectTokenModalOpen, setConfirmSwapModalOpen } =
    useStatusContext();

  const handleSelectTokenModalOpen = () => {
    setSelectTokenModalOpen(true);
  };

  const handleConfirmSwapModalOpen = () => {
    setConfirmSwapModalOpen(true);
  };

  return (
    <div>
      <div className="mx-auto mt-8 w-[526px] rounded-xl bg-[#252B36] p-4">
        <div className="flex items-center justify-between">
          <div className="pl-8 text-[28px] font-bold">Swap</div>
          <div>
            <Popover
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="bottom-end"
            >
              <PopoverHandler>
                <Image src={Setting} alt="setting" className="cursor-pointer" />
              </PopoverHandler>
              <PopoverContent
                placeholder={undefined}
                className="z-[100] rounded-none border-none bg-transparent p-0"
              >
                <SettingPanel />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="relative mt-2">
          <div className="rounded-xl bg-[#2B3342] p-4 px-6">
            <div className="flex items-center justify-between">
              <div
                className="flex cursor-pointer items-center justify-center gap-4 rounded-xl bg-[#252B36] px-4 py-2"
                onClick={() => handleSelectTokenModalOpen()}
              >
                <Image src={Eth} alt="eth" />
                <div>ETH</div>
                <Image src={ArrowDown} alt="eth" />
              </div>
              <div>0.00</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[#9DA6B9]">
              <div>Balance: 2.8989 ETH (MAX)</div>
              <div>≈$ 6726.2307</div>
            </div>
          </div>
          <div className="mt-2 rounded-xl bg-[#2B3342] p-4 px-6">
            <div className="flex items-center justify-between">
              <div className="flex cursor-pointer items-center justify-center gap-4 rounded-xl bg-[#252B36] px-4 py-2">
                <Image src={Eos} alt="eth" />
                <div>EOS</div>
                <Image src={ArrowDown} alt="eth" />
              </div>
              <div>0.00</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[#9DA6B9]">
              <div>Balance: 400.8989 EOS</div>
              <div>≈$ 284.6382</div>
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full  border-[5px] border-[#252B36] bg-[#2B3342] p-2">
            <Image src={Arrow2} alt="exchangearrow" />
          </div>
        </div>
        <div className="mt-8">
          <Button
            className="w-full bg-gradient text-[24px] normal-case"
            placeholder={undefined}
            onClick={() => handleConfirmSwapModalOpen()}
          >
            Swap
          </Button>
        </div>
      </div>
      <div className="mx-auto my-8 flex w-[500px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            Minimum received
            <QuestionMarkCircleIcon width={16} className="cursor-pointer" />
          </div>
          <div>9.741 EOS</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            Price Impact
            <QuestionMarkCircleIcon width={16} className="cursor-pointer" />
          </div>
          <div>0.01%</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            Liquidity Provider Fee
            <QuestionMarkCircleIcon width={16} className="cursor-pointer" />
          </div>
          <div>0.0000066 ETH</div>
        </div>
        <div className="text-center text-[#EAAC33]">View Pair Analytics</div>
      </div>
    </div>
  );
};

export default SwapPanel;
