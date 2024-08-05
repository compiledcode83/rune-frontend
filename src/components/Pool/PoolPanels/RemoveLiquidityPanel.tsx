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
import {
  useRemoveLiquiditySharePercent,
  useRemoveLiquidityTokenA,
  useRemoveLiquidityTokenAAmount,
  useRemoveLiquidityTokenB,
  useRemoveLiquidityTokenBAmount,
} from "@/state/application/hooks/usePoolHooks";
import { convertWithDecimal, stringToDisplay } from "@/utils/utils";

const RemoveLiquidityPanel = () => {
  const { setRemoveLiquidityModalOpen, setRemoveLiquidityConfirmModalOpen } =
    useStatusContext();

  const { removeLiquidityTokenA } = useRemoveLiquidityTokenA();
  const { removeLiquidityTokenAAmount } = useRemoveLiquidityTokenAAmount();
  const { removeLiquidityTokenB } = useRemoveLiquidityTokenB();
  const { removeLiquidityTokenBAmount } = useRemoveLiquidityTokenBAmount();
  const { removeLiquiditySharePercent } = useRemoveLiquiditySharePercent();

  // const RemoveButton = () =>{
  //   if(removeLiquidityTokenAAmount === 0 || )
  // }
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
              <div>
                {stringToDisplay(
                  convertWithDecimal(
                    removeLiquidityTokenAAmount,
                    removeLiquidityTokenA
                  )
                )}
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={removeLiquidityTokenA.imgUrl}
                  alt={removeLiquidityTokenA.name}
                  width={24}
                  height={24}
                />
                <div>{removeLiquidityTokenA.spaced}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                {stringToDisplay(
                  convertWithDecimal(
                    removeLiquidityTokenBAmount,
                    removeLiquidityTokenB
                  )
                )}
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={removeLiquidityTokenB.imgUrl}
                  alt={removeLiquidityTokenB.name}
                  width={24}
                  height={24}
                />
                <div>{removeLiquidityTokenB.spaced}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[12px] lg:text-[16px]">
            <div>Price</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div>
              1 {removeLiquidityTokenA.spaced} ={" "}
              {stringToDisplay(
                (removeLiquidityTokenBAmount / removeLiquidityTokenAAmount) *
                  10 **
                    (removeLiquidityTokenA.divisibility -
                      removeLiquidityTokenB.divisibility)
              )}{" "}
              {removeLiquidityTokenB.spaced}
            </div>
            <div>
              1 {removeLiquidityTokenB.spaced} ={" "}
              {stringToDisplay(
                (removeLiquidityTokenAAmount / removeLiquidityTokenBAmount) *
                  10 **
                    (removeLiquidityTokenB.divisibility -
                      removeLiquidityTokenA.divisibility)
              )}{" "}
              {removeLiquidityTokenA.spaced}
            </div>
          </div>
          <div className="flex justify-between text-[10px] lg:text-[14px]">
            <div>Share of Pool</div>
            <div>{removeLiquiditySharePercent}%</div>
          </div>
        </div>
        <div className="mt-8 flex gap-2">
          {/* <Button
            className="w-full bg-dark-panel text-[16px] normal-case text-light-gray-font lg:text-[24px] dark:bg-light-panel"
            placeholder={undefined}
          >
            Approve
          </Button> */}
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
        There is 1.5% fee or 0.00002BTC(minimum) for swapping tokens. This fee
        is split by liquidity providers proportional to their contribution to
        liquidity reserves. Swapping fees are immediately deposited into
        liquidity reserves.
      </div>
    </div>
  );
};

export default RemoveLiquidityPanel;
