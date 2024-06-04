import { BalanceType, TokenType } from "@/types/type";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import tokenApiService from "@/api.services/token/token.api.service";
import {
  convertWithDecimal,
  convertWithDecimalUsingBalance,
  stringToDisplay,
} from "@/utils/utils";
type Props = {
  balance: BalanceType;
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
const defaultImgUrl =
  "https://ordvision.s3.eu-north-1.amazonaws.com/dex-testnet/1714747846742.svg";
const ProfileTokenItemPanel: React.FC<Props> = ({ balance }) => {
  useEffect(() => {
    (async () => {
      try {
        const res = await tokenApiService.getTokenInfo(balance.runeId);
        setToken(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [balance]);
  const [token, setToken] = useState<TokenType>(initialToken);
  return (
    <div className="flex gap-[17px]">
      <Image
        src={token.imgUrl !== "" ? token.imgUrl : defaultImgUrl}
        alt="token"
        height={45}
        style={{ objectFit: "cover" }}
        width={45}
      />
      <div className="flex flex-col justify-between">
        <div>{balance.spacedRune}</div>
        <div>
          {stringToDisplay(
            convertWithDecimalUsingBalance(balance.amount, balance)
          )}{" "}
          {balance.symbol}
        </div>
      </div>
    </div>
  );
};

export default ProfileTokenItemPanel;
