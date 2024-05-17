import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TokenType } from "@/types/type";
import { useTokenBalances } from "@/state/application/hooks/useSwapHooks";
import { useStatusContext } from "@/context/StatusContext";
import {
  useAddLiquidityTokenA,
  useAddLiquidityTokenB,
} from "@/state/application/hooks/usePoolHooks";
import { convertWithDecimal } from "@/utils/utils";

type PoolSelectTokenItemProps = {
  token: TokenType;
  no: number;
};

const initialToken: TokenType = {
  uuid: "",
  name: "",
  imgUrl: "",
  runeId: "",
  spaced: "",
  symbol: "",
  divisibility: 0,
};

const PoolSelectTokenItem: React.FC<PoolSelectTokenItemProps> = ({
  token,
  no,
}) => {
  const { imgUrl, name, runeId, symbol, spaced, divisibility } = token;
  const { addLiquidityTokenA, setAddLiquidityTokenA } = useAddLiquidityTokenA();
  const { tokenBalances } = useTokenBalances();
  const { addLiquidityTokenB, setAddLiquidityTokenB } = useAddLiquidityTokenB();
  const [balance, setBalance] = useState(0);
  const {
    setAddLiquiditySelectTokenAModalOpen,
    setAddLiquiditySelectTokenBModalOpen,
  } = useStatusContext();

  const handleSetAddLiquidityTokenA = () => {
    if (no === 1) {
      if (token.runeId !== addLiquidityTokenA.runeId) {
        setAddLiquidityTokenA(token);
        setAddLiquidityTokenB(initialToken);
      }
      setAddLiquiditySelectTokenAModalOpen(false);
    } else if (no === 2) {
      if (token.runeId !== addLiquidityTokenB.runeId) {
        setAddLiquidityTokenB(token);
      }
      setAddLiquiditySelectTokenBModalOpen(false);
    }
  };

  useEffect(() => {
    const newBalance = tokenBalances.find(
      (tokenBalance) => tokenBalance.runeId === runeId
    );
    if (newBalance) {
      setBalance(newBalance.amount);
    } else {
      setBalance(0);
    }
  }, [runeId]);

  return (
    <div
      className="flex cursor-pointer items-start rounded-lg border border-transparent bg-light-panel p-3 text-[14px] hover:border-primary hover:bg-light-item hover:transition-all lg:text-[18px] dark:bg-dark-panel dark:hover:bg-dark-item"
      onClick={() => handleSetAddLiquidityTokenA()}
    >
      <Image width={50} height={50} src={imgUrl} alt="bnb" />
      <div className="ml-4 flex flex-col justify-between">
        <div className="">{spaced}</div>
        <div className="text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
          {name}
        </div>
      </div>
      <div className="ml-auto">{convertWithDecimal(balance, token)}</div>
    </div>
  );
};

export default PoolSelectTokenItem;
