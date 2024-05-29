import React, { useState } from "react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useStatusContext } from "@/context/StatusContext";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import BNB from "@/assets/imgs/bnb.svg";
import Menu from "@/assets/imgs/menu.svg";
import Image from "next/image";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ImportTokenItem from "./ImportTokenItem";

const tokens = [
  {
    symbol: "BNB",
    name: "Binance coin",
    detail: "via kieors Tokens",
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    detail: "via kieors Tokens",
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    detail: "via kieors Tokens",
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    detail: "via kieors Tokens",
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    detail: "via kieors Tokens",
    img: BNB,
  },
  {
    symbol: "BNB",
    name: "Binance coin",
    detail: "via kieors Tokens",
    img: BNB,
  },
];

const SelectTokenPanel = () => {
  const { setSelectTokenModalOpen } = useStatusContext();

  const handleSelectTokenModalClose = () => {
    setSelectTokenModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="invisible">
          <XMarkIcon width={20} />
        </div>
        <div className="text-[24px]">Select a Token</div>
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
          label="Search name or paste address"
          icon={<MagnifyingGlassIcon width={20} />}
          color="amber"
          className="text-[12px] text-black lg:!text-[24px] dark:text-white"
        />
      </div>
      <div className="flex h-[50vh] flex-col gap-2 overflow-auto">
        {tokens.map((token, index) => (
          <ImportTokenItem
            key={index}
            symbol={token.symbol}
            name={token.name}
            detail={token.detail}
            img={token.img}
          />
        ))}
      </div>
      <div className="flex cursor-pointer items-center justify-center gap-2 text-primary dark:text-[#EAAC33]">
        <Image src={Menu} alt="menu" />
        <div>Manage</div>
      </div>
    </div>
  );
};

export default SelectTokenPanel;
