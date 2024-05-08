import React from "react";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, Switch } from "@material-tailwind/react";
const SettingPanel = () => {
  return (
    <div className="w-[316px] rounded-xl border border-primary bg-[#21262F] p-4 text-white">
      <div className="text-center text-[22px]">Transaction Settings</div>
      <div className="mt-4 flex items-center gap-1">
        Instead Fee adjustor in Sats/vb{" "}
        <Tooltip
          className="bg-transparent"
          content={
            <div className="w-[230px] rounded-xl bg-[#394356] p-2 px-4">
              Your transaction will revert if the price changes unfavorably by
              more than this percentage.
            </div>
          }
          placement="top-start"
        >
          <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
        </Tooltip>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="cursor-pointer rounded-lg bg-[#2B3342] p-3 text-[16px]">
          0.1%
        </div>
        <div className="cursor-pointer rounded-lg bg-[#2B3342] p-3 text-[16px]">
          0.5%
        </div>
        <div className="cursor-pointer rounded-lg bg-[#2B3342] p-3 text-[16px]">
          1%
        </div>
        <input
          value={"1%"}
          className="w-[70px] rounded-lg border border-primary bg-transparent p-3 text-center outline-none"
        />
      </div>
      <div className="mt-4 flex items-center gap-1">
        Transaction Dealine
        <Tooltip
          className="bg-transparent"
          content={
            <div className="w-[230px] rounded-xl bg-[#394356] p-2 px-4">
              Your transaction will revert if it is pending for more than this
              long
            </div>
          }
          placement="top-start"
        >
          <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
        </Tooltip>
      </div>
      <div className="mt-2 flex items-center gap-1">
        <input
          className="w-[95px] rounded-lg bg-[#2B3342] p-3 outline-none"
          value={20}
        />
        <div>minutes</div>
      </div>
      <div className="mt-8 text-center text-[22px]">Interface Settings</div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          Toggle Expert Modle
          <Tooltip
            className="bg-transparent"
            content={
              <div className="w-[230px] rounded-xl bg-[#394356] p-2 px-4">
                Bypasses confirmation modals and allows high slippage trades.
                <br />
                Use at your own risk
              </div>
            }
            placement="top-start"
          >
            <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
          </Tooltip>
        </div>
        <Switch crossOrigin={undefined} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          Toggle Expert Modle
          <Tooltip
            className="bg-transparent"
            content={
              <div className="w-[230px] rounded-xl bg-[#394356] p-2 px-4">
                Restricts swaps to direct pairt only
              </div>
            }
            placement="top-start"
          >
            <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
          </Tooltip>
        </div>
        <Switch crossOrigin={undefined} />
      </div>
    </div>
  );
};

export default SettingPanel;
