import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TokenType } from "@/types/type";
import {
  useTokenBalances,
  useReceiveToken,
  useSendToken,
} from "@/state/application/hooks/useSwapHooks";
import { useStatusContext } from "@/context/StatusContext";
import { convertWithDecimal } from "@/utils/utils";
// import { convertWithDecimal } from "@/utils/utils";

type SwapSelectTokenItemProps = {
  token: TokenType;
  type: string;
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

const SwapSelectTokenItem: React.FC<SwapSelectTokenItemProps> = ({
  token,
  type,
}) => {
  const { imgUrl, name, runeId, symbol, spaced, divisibility } = token;
  const { sendToken, setSendToken } = useSendToken();
  const { tokenBalances } = useTokenBalances();
  const { setReceiveToken } = useReceiveToken();
  const [balance, setBalance] = useState(0);
  const {
    setSwapSelectSendTokenModalOpen,
    setSwapSelectReceiveTokenModalOpen,
  } = useStatusContext();

  const handleSetSendToken = () => {
    if (type === "send") {
      setSendToken(token);
      setReceiveToken(initialToken);
      setSwapSelectSendTokenModalOpen(false);
    } else if (type === "receive") {
      setReceiveToken(token);
      setSwapSelectReceiveTokenModalOpen(false);
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
      onClick={() => handleSetSendToken()}
    >
      <Image width={50} height={50} src={imgUrl} alt="bnb" />
      <div className="ml-4 flex flex-col justify-between">
        <div className="">{spaced}</div>
        <div className="text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
          {name}
        </div>
      </div>
      {/* <div className="ml-auto">{convertWithDecimal(balance, token)}</div> */}
      <div className="ml-auto">{convertWithDecimal(balance, token)}</div>
    </div>
  );
};

export default SwapSelectTokenItem;
