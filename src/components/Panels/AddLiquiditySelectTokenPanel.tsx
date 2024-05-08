import React, { useState } from "react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useStatusContext } from "@/context/StatusContext";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import BNB from "@/assets/imgs/bnb.svg";
import Menu from "@/assets/imgs/menu.svg";
import Image from "next/image";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import SelectTokenItem from "./SelectTokenItem";
import CustomTooltip from "../Tooltip";
import CommonBasedTokenChip from "./CommonBasedTokenChip";

const tokens = [
  {
    symbol: "BNB",
    name: "Binance coin",
    balance: 997.2,
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    balance: 997.2,
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    balance: 997.2,
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    balance: 997.2,
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    balance: 997.2,
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    balance: 997.2,
    img: BNB,
  },
];

const AddLiquiditySelectTokenPanel = () => {
  const { setAddLiquiditySelectTokenModalOpen } = useStatusContext();

  const handleSelectTokenModalClose = () => {
    setAddLiquiditySelectTokenModalOpen(false);
  };

  return (
    <div className="mx-auto w-[300px] rounded-xl bg-light-panel p-4 text-black lg:w-[526px] lg:p-8 dark:bg-dark-panel dark:text-white">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="invisible">
            <XMarkIcon width={20} />
          </div>
          <div className="text-[16px] font-bold lg:text-[24px]">
            Select a Token
          </div>
          <div>
            <XMarkIcon
              width={20}
              className="cursor-pointer"
              onClick={() => handleSelectTokenModalClose()}
            />
          </div>
        </div>
        <div>
          <Input
            crossOrigin={undefined}
            label="Search name or pasto address"
            icon={<MagnifyingGlassIcon width={20} />}
            color="amber"
            className="text-[12px] text-black lg:!text-[24px] dark:text-white"
          />
        </div>
        <div>
          <div className="flex gap-1">
            <div className="text-[14px] lg:text-[18px]">Common Bases</div>
            <CustomTooltip content="These tokens are commonly paired with other tokens">
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </CustomTooltip>
          </div>
          <div className="flex flex-wrap gap-2">
            {tokens.map((item, index) => (
              <CommonBasedTokenChip
                symbol={item.symbol}
                key={index}
                img={item.img}
              />
            ))}
          </div>
        </div>
        <div className="flex h-[50vh] flex-col gap-2 overflow-auto">
          {tokens.map((token, index) => (
            <SelectTokenItem
              key={index}
              symbol={token.symbol}
              name={token.name}
              balance={token.balance}
              img={token.img}
            />
          ))}
        </div>
        <div className="flex cursor-pointer items-center justify-center gap-2 text-primary dark:text-[#EAAC33]">
          <Image src={Menu} alt="menu" />
          <div>Manage</div>
        </div>
      </div>
    </div>
  );
};

export default AddLiquiditySelectTokenPanel;
