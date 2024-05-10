import React from "react";
import Image from "next/image";
import { TokenType } from "@/types/type";
import {
  useReceiveToken,
  useSendToken,
} from "@/state/application/hooks/useSwapHooks";
import { useStatusContext } from "@/context/StatusContext";

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
  const { setReceiveToken } = useReceiveToken();
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
      <div className="ml-auto">{0}</div>
    </div>
  );
};

export default SwapSelectTokenItem;
