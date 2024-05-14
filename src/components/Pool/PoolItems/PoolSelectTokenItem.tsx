import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TokenType } from "@/types/type";
import { useTokenBalances } from "@/state/application/hooks/useSwapHooks";
import { useStatusContext } from "@/context/StatusContext";
import {
  useAddLiquidityToken1,
  useAddLiquidityToken2,
} from "@/state/application/hooks/usePoolHooks";

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
  const { addLiquidityToken1, setAddLiquidityToken1 } = useAddLiquidityToken1();
  const { tokenBalances } = useTokenBalances();
  const { setAddLiquidityToken2 } = useAddLiquidityToken2();
  const [balance, setBalance] = useState(0);
  const {
    setAddLiquiditySelectToken1ModalOpen,
    setAddLiquiditySelectToken2ModalOpen,
  } = useStatusContext();

  const handleSetAddLiquidityToken1 = () => {
    if (no === 1) {
      setAddLiquidityToken1(token);
      setAddLiquidityToken2(initialToken);
      setAddLiquiditySelectToken1ModalOpen(false);
    } else if (no === 2) {
      setAddLiquidityToken2(token);
      setAddLiquiditySelectToken2ModalOpen(false);
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
      onClick={() => handleSetAddLiquidityToken1()}
    >
      <Image width={50} height={50} src={imgUrl} alt="bnb" />
      <div className="ml-4 flex flex-col justify-between">
        <div className="">{spaced}</div>
        <div className="text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
          {name}
        </div>
      </div>
      <div className="ml-auto">{balance}</div>
    </div>
  );
};

export default PoolSelectTokenItem;
