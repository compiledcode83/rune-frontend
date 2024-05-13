import React, { useState, useEffect } from "react";
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
import SwapSelectTokenItem from "../SwapItems/SwapSelectTokenItem";
import { usePoolTokens } from "@/state/application/hooks/useSwapHooks";
import { TokenType } from "@/types/type";
import { containsSubstring } from "@/utils/utils";

const SwapSelectSendTokenPanel = () => {
  const { setSwapSelectSendTokenModalOpen } = useStatusContext();
  const { poolTokens } = usePoolTokens();

  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [poolTokenSearchResults, setPoolTokenSearchResults] = useState<
    TokenType[]
  >([]);

  const handleSelectTokenModalClose = () => {
    setSwapSelectSendTokenModalOpen(false);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setFilterText(searchText);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText, setFilterText]);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const resultList = poolTokens.filter((token) => {
      return containsSubstring(token.name, filterText);
    });
    setPoolTokenSearchResults(resultList);
  }, [filterText, poolTokens]);

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
          label="Search name or pasto address"
          icon={<MagnifyingGlassIcon width={20} />}
          color="amber"
          className="text-[12px] text-black lg:!text-[24px] dark:text-white"
          value={searchText}
          onChange={onChangeSearchInput}
        />
      </div>
      <div className="flex h-[50vh] flex-col gap-2 overflow-auto">
        {poolTokenSearchResults.map((token, index) => (
          <SwapSelectTokenItem key={index} token={token} type="send" />
        ))}
      </div>
      <div className="flex cursor-pointer items-center justify-center gap-2 text-primary dark:text-[#EAAC33]">
        <Image src={Menu} alt="menu" />
        <div>Manage</div>
      </div>
    </div>
  );
};

export default SwapSelectSendTokenPanel;
