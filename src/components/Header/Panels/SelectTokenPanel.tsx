import React, { useState } from "react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useStatusContext } from "@/context/StatusContext";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import BNB from "@/assets/imgs/bnb.svg";
import Menu from "@/assets/imgs/menu.svg";
import Image from "next/image";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const SelectTokenPanel = () => {
  const { setSelectTokenModalOpen } = useStatusContext();
  const [isImport, setIsImport] = useState(false);

  const handleSelectTokenModalClose = () => {
    setSelectTokenModalOpen(false);
  };

  const handleImportToken = () => {
    setIsImport(true);
  };
  return (
    <div>
      {!isImport ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="invisible">
              <XMarkIcon width={20} />
            </div>
            <div className="text-[24px]">Select a Token</div>
            <div>
              <XMarkIcon
                width={20}
                className="cursor-pointer"
                onClick={() => handleSelectTokenModalClose()}
              />
            </div>
          </div>
          <div>
            <Input
              crossOrigin={undefined}
              label="Search name or pasto address"
              icon={<MagnifyingGlassIcon width={20} />}
              color="amber"
              className="!text-[24px] text-white"
            />
          </div>
          <div className="flex h-[50vh] flex-col gap-2 overflow-auto">
            <div className="flex items-center rounded-lg bg-[#323A49] p-3">
              <Image src={BNB} alt="bnb" />
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <div className="text-[24px]">BNB</div>
                  <div className="text-[#9DADB2]">Binance coin</div>
                </div>
                <div className="text-[#9DADB2]">via Kleros Tokens</div>
              </div>
              <Button
                placeholder={undefined}
                className="ml-auto bg-gradient text-[20px] normal-case"
                onClick={() => handleImportToken()}
              >
                Import
              </Button>
            </div>
            <div className="flex items-center rounded-lg bg-[#323A49] p-3">
              <Image src={BNB} alt="bnb" />
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <div className="text-[24px]">BNB</div>
                  <div className="text-[#9DADB2]">Binance coin</div>
                </div>
                <div className="text-[#9DADB2]">via Kleros Tokens</div>
              </div>
              <Button
                placeholder={undefined}
                className="ml-auto bg-gradient text-[20px] normal-case"
                onClick={() => handleImportToken()}
              >
                Import
              </Button>
            </div>
            <div className="flex items-center rounded-lg bg-[#323A49] p-3">
              <Image src={BNB} alt="bnb" />
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <div className="text-[24px]">BNB</div>
                  <div className="text-[#9DADB2]">Binance coin</div>
                </div>
                <div className="text-[#9DADB2]">via Kleros Tokens</div>
              </div>
              <Button
                placeholder={undefined}
                className="ml-auto bg-gradient text-[20px] normal-case"
                onClick={() => handleImportToken()}
              >
                Import
              </Button>
            </div>
          </div>
          <div className="flex cursor-pointer items-center justify-center gap-2 text-[#EAAC33]">
            <Image src={Menu} alt="menu" />
            <div>Manage</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="">
              <ChevronLeftIcon
                width={20}
                onClick={() => setIsImport(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="text-[24px]">Import a Token</div>
            <div>
              <XMarkIcon
                width={20}
                className="cursor-pointer"
                onClick={() => handleSelectTokenModalClose()}
              />
            </div>
          </div>
          <div className="flex items-center rounded-lg bg-[#323A49] p-3">
            <Image src={BNB} alt="bnb" />
            <div className="ml-4">
              <div className="flex items-center gap-2">
                <div className="text-[24px]">BNB</div>
                <div className="text-[#9DADB2]">Binance coin</div>
              </div>
              <div className="text-[#00A3FF]">
                0x4ae42244891fa9eF6A0975CEc2A074a57a60b652
              </div>
              <div className="text-[#9DADB2]">via Kleros Tokens</div>
            </div>
          </div>
          <div>
            <ExclamationTriangleIcon
              color="#EAAC33"
              width={100}
              className="mx-auto"
            />
          </div>
          <div className="text-center">Trade at your own risk!</div>
          <div className="mx-auto w-2/3 text-center text-[#B1B1B1]">
            Anyone can create a token, including creating fake versions of
            existing tokens that claim to represent projects.
            <br />
            If you purchase this token, you may not be able to sell it back
          </div>
          <div className="flex items-center justify-center">
            <Checkbox crossOrigin={undefined} color="amber" defaultChecked />
            <div>I understand</div>
          </div>
          <div>
            <Button
              placeholder={undefined}
              className="w-full bg-gradient text-[20px] normal-case"
              onClick={() => setIsImport(false)}
            >
              Import
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTokenPanel;
