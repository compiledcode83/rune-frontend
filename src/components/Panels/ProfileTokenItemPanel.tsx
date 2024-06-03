import { BalanceType, TokenType } from "@/types/type";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import tokenApiService from "@/api.services/token/token.api.service";
import { convertWithDecimal, stringToDisplay } from "@/utils/utils";
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
const ProfileTokenItemPanel: React.FC<Props> = ({ balance }) => {
  useEffect(() => {
    (async () => {
      const res = await tokenApiService.getTokenInfo(balance.runeId);
      setToken(res);
    })();
  }, [balance]);
  const [token, setToken] = useState<TokenType>(initialToken);
  return token.uuid != "" ? (
    <div className="flex gap-[17px]">
      <Image src={token.imgUrl} alt="token" height={45} width={45} />
      <div className="flex flex-col justify-between">
        <div>{token.spaced}</div>
        <div>{stringToDisplay(convertWithDecimal(balance.amount, token))}</div>
      </div>
    </div>
  ) : null;
};

export default ProfileTokenItemPanel;
