import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  XMarkIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useStatusContext } from "@/context/StatusContext";
import Image from "next/image";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import BNB from "@/assets/imgs/bnb.svg";

const ImportTokenPanel = () => {
  const { setImportTokenModalOpen } = useStatusContext();
  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      <div className="flex items-center justify-between">
        <div className="">
          <ChevronLeftIcon
            width={20}
            onClick={() => setImportTokenModalOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="text-[24px]">Import a Token</div>
        <div>
          <XMarkIcon
            width={20}
            className="cursor-pointer"
            onClick={() => setImportTokenModalOpen(false)}
          />
        </div>
      </div>
      <div className="flex items-center rounded-lg bg-light-panel p-3 dark:bg-dark-item">
        <Image src={BNB} alt="bnb" />
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <div className="text-[16px] lg:text-[24px]">BNB</div>
            <div className="text-[11px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
              Binance coin
            </div>
          </div>
          <div className="text-blue text-[11px] lg:text-[16px]">
            0x4ae42244891fa9eF6A0975CEc2A074a57a60b652
          </div>
          <div className="text-[11px] text-light-gray-font lg:text-[16px] dark:text-dark-gray-font">
            via Kleros Tokens
          </div>
        </div>
      </div>
      <div>
        <ExclamationTriangleIcon
          width={100}
          className="dark:text-dark-primary mx-auto text-primary"
        />
      </div>
      <div className="text-center">Trade at your own risk!</div>
      <div className="mx-auto text-center text-[12px] text-light-gray-font lg:w-2/3 lg:text-[16px] dark:text-dark-gray-font">
        Anyone can create a token, including creating fake versions of existing
        tokens that claim to represent projects.
        <br />
        If you purchase this token, you may not be able to sell it back
      </div>
      <div className="flex items-center justify-center">
        <Checkbox crossOrigin={undefined} color="amber" defaultChecked />
        <div className="text-[12px] lg:text-[16px]">I understand</div>
      </div>
      <div>
        <Button
          placeholder={undefined}
          className="w-full bg-gradient text-[16px] normal-case lg:text-[20px]"
          onClick={() => setImportTokenModalOpen(false)}
        >
          Import
        </Button>
      </div>
    </div>
  );
};

export default ImportTokenPanel;
