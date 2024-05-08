import React from "react";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { useStatusContext } from "@/context/StatusContext";

type ImportTokenItemProps = {
  symbol: string;
  name: string;
  detail: string;
  img: string;
};

const ImportTokenItem: React.FC<ImportTokenItemProps> = ({
  symbol,
  name,
  detail,
  img,
}) => {
  const { setImportTokenModalOpen } = useStatusContext();
  return (
    <div className="flex items-center rounded-lg bg-light-panel p-3 dark:bg-dark-item">
      <Image src={img} alt="bnb" />
      <div className="ml-4">
        <div className="flex items-center gap-2">
          <div className="text-[16px] lg:text-[24px]">{symbol}</div>
          <div className="text-[10px] text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
            {name}
          </div>
        </div>
        <div className="text-[10px] text-light-gray-font lg:text-[14px] dark:text-dark-gray-font">
          {detail}
        </div>
      </div>
      <Button
        placeholder={undefined}
        className="ml-auto bg-gradient text-[14px] normal-case lg:text-[20px]"
        onClick={() => setImportTokenModalOpen(true)}
      >
        Import
      </Button>
    </div>
  );
};

export default ImportTokenItem;
