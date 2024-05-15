import React from "react";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, Switch } from "@material-tailwind/react";
import { useSlippage } from "@/state/application/hooks/useSwapHooks";
const SettingPanel = () => {
  const { slippage, setSlippage } = useSlippage();
  const handleSlippageChange = (inputValue: number) => {
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100) {
      // Update state with the percentage value
      setSlippage(inputValue);
    }
  };
  return (
    <div className="w-[316px] rounded-xl border border-primary bg-white p-4 text-black dark:bg-[#21262F] dark:text-white">
      <div className="text-center text-[22px]">Transaction Settings</div>
      <div className="mt-4 flex items-center gap-1">
        Max. slippage
        <Tooltip
          className="bg-transparent"
          content={
            <div className="w-[230px] rounded-xl bg-light-tooltip-bg p-2 px-4 dark:bg-dark-tooltip-bg">
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
        <div
          className="cursor-pointer rounded-lg bg-light-panel p-3 text-[16px] dark:bg-dark-item"
          onClick={() => setSlippage(0.1)}
        >
          0.1%
        </div>
        <div
          className="cursor-pointer rounded-lg bg-light-panel p-3 text-[16px] dark:bg-dark-item"
          onClick={() => setSlippage(0.5)}
        >
          0.5%
        </div>
        <div
          className="cursor-pointer rounded-lg bg-light-panel p-3 text-[16px] dark:bg-dark-item"
          onClick={() => setSlippage(1)}
        >
          1%
        </div>
        <div className="flex w-[80px] justify-center gap-0 rounded-lg border border-primary bg-transparent p-3 text-[16px] outline-none">
          <input
            type="number"
            value={slippage}
            onChange={(e) => handleSlippageChange(Number(e.target.value))}
            min="0"
            max="100"
            step="any"
            className="w-[40px] bg-transparent text-center outline-none"
          />
          <div>%</div>
        </div>
      </div>
      {/* <div className="mt-4 flex items-center gap-1">
        Transaction Dealine
        <Tooltip
          className="bg-transparent"
          content={
            <div className="w-[230px] rounded-xl bg-light-tooltip-bg p-2 px-4 dark:bg-dark-tooltip-bg">
              Your transaction will revert if it is pending for more than this
              long
            </div>
          }
          placement="top-start"
        >
          <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
        </Tooltip>
      </div> */}
      {/* <div className="mt-2 flex items-center gap-1">
        <input
          className="w-[95px] rounded-lg bg-light-panel p-3 outline-none dark:bg-dark-item"
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
              <div className="w-[230px] rounded-xl bg-light-tooltip-bg p-2 px-4 dark:bg-dark-tooltip-bg">
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
      </div> */}
      {/* <div className="mt-4 flex items-center justify-between">
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
      </div> */}
    </div>
  );
};

export default SettingPanel;
