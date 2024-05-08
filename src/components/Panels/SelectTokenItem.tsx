import React from "react";
import Image from "next/image";

type SelectTokenItemProps = {
  symbol: string;
  name: string;
  balance: number;
  img: string;
};

const SelectTokenItem: React.FC<SelectTokenItemProps> = ({
  symbol,
  name,
  balance,
  img,
}) => {
  return (
    <div className="flex cursor-pointer items-start rounded-lg border border-transparent bg-light-panel p-3 text-[14px] hover:border-primary hover:bg-light-item hover:transition-all lg:text-[18px] dark:bg-dark-panel dark:hover:bg-dark-item">
      <Image src={img} alt="bnb" />
      <div className="ml-4 flex flex-col justify-between">
        <div className="">{symbol}</div>
        <div className="text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
          {name}
        </div>
      </div>
      <div className="ml-auto">{balance}</div>
    </div>
  );
};

export default SelectTokenItem;
