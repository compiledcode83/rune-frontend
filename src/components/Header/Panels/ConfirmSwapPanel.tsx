import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import Image from "next/image";
import Eth from "@/assets/imgs/ETh.svg";
import Eos from "@/assets/imgs/EOS.svg";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Tooltip,
} from "@material-tailwind/react";

const ConfirmSwapPanel = () => {
  const { setConfirmSwapModalOpen, setTxSubmittedModalOpen } =
    useStatusContext();

  const handleConfirmSwap = () => {
    setConfirmSwapModalOpen(false);
    setTxSubmittedModalOpen(true);
  };
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex items-center justify-between">
        <div className="invisible">
          <XMarkIcon width={20} />
        </div>
        <div className="text-[24px]">Confirm Swap</div>
        <div>
          <XMarkIcon
            width={20}
            className="cursor-pointer"
            onClick={() => setConfirmSwapModalOpen(false)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div>Swap from</div>
          <div className="text-[24px] font-semibold">0.022</div>
        </div>
        <div className="flex items-center gap-2">
          <Image src={Eth} alt="eth" />
          <div>ETH</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div>Swap to</div>
          <div className="text-[24px] font-semibold">82.89</div>
        </div>
        <div className="flex items-center gap-2">
          <Image src={Eos} alt="eth" />
          <div>EOS</div>
        </div>
      </div>
      <div className="text-[14px] text-[#A7A7A7]">
        Output is estimated. If the price changes by more than 0.5% your
        transaction will revert
      </div>
      <div className="flex items-center justify-between text-[14px]">
        <div>Price</div>
        <div className="flex items-center gap-1">
          <div>0.00027 ETH per 1 EOS</div>
          <ArrowsUpDownIcon width={20} />
        </div>
      </div>
      <div className="flex items-center justify-between text-[14px]">
        <div className="flex items-center gap-1">
          <div>Minimum received</div>
          <Tooltip
            className="!z-9999 relative bg-transparent"
            content={
              <div className="!z-9999 relative rounded-xl bg-[#394356] p-2 px-4">
                Your transaction will revert if there is a large, unfavorable
                price movement before it is confirmed
              </div>
            }
            placement="top-start"
          >
            <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
          </Tooltip>
        </div>
        <div className="flex items-center gap-1">
          <div>9.741 EOS</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[14px]">
        <div className="flex items-center gap-1">
          <div>Price Impact</div>
          <Popover
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            placement="bottom-end"
          >
            <PopoverHandler>
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </PopoverHandler>
            <PopoverContent
              placeholder={undefined}
              className="z-[100] rounded-none border-none bg-transparent p-0"
            >
              <div className="w-[230px] rounded-xl bg-[#394356] p-2 px-4">
                The difference between the market price and estimated price due
                to trade size
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-1">
          <div>0.01%</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[14px]">
        <div className="flex items-center gap-1">
          <div>Liquidity Provider Fee</div>
          <Tooltip
            className="bg-transparent"
            content={
              <div className="w-[230px] rounded-xl bg-[#394356] p-2 px-4">
                A portion of each trade (0.30%) goes to liquidity providers as a
                protocol incentive
              </div>
            }
            placement="top-start"
          >
            <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
          </Tooltip>
        </div>
        <div className="flex items-center gap-1">
          <div>0.0000066 ETH</div>
        </div>
      </div>
      <Button
        placeholder={undefined}
        className="mt-4 bg-gradient text-[18px] font-bold normal-case"
        onClick={() => handleConfirmSwap()}
      >
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmSwapPanel;
