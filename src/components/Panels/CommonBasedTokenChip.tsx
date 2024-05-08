import React from "react";
import Image from "next/image";
import BNB from "@/assets/imgs/bnb.png";

type CommonBasedTokenChipProps = {
  symbol: string;
  img: string;
};

const CommonBasedTokenChip: React.FC<CommonBasedTokenChipProps> = ({
  symbol,
  img,
}) => {
  return (
    <div className="flex w-[100px] items-center gap-2 rounded-lg bg-light-item p-2 dark:bg-dark-item">
      <Image src={BNB} width={20} alt="token" />
      <div className="text-[14px] lg:text-[16px]">{symbol}</div>
    </div>
  );
};

export default CommonBasedTokenChip;
