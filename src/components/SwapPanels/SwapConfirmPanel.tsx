import { useStatusContext } from "@/context/StatusContext";
import { XMarkIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import Eth from "@/assets/imgs/ETH.svg";
import Eos from "@/assets/imgs/EOS.svg";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Tooltip,
} from "@material-tailwind/react";
import CustomTooltip from "@/components/Tooltip";
import {
  useReceiveToken,
  useReceiveTokenAmount,
  useSendToken,
  useSendTokenAmount,
} from "@/state/application/hooks/useSwapHooks";
import { useUserContext } from "@/context/UserContext";
import poolApiService from "@/api.services/pool/pool.api.service";

const SwapConfirmPanel = () => {
  const { setSwapConfirmModalOpen, setTxSubmittedModalOpen } =
    useStatusContext();

  const {
    ordinalAddress,
    ordinalPublicKey,
    paymentPublicKey,
    paymentAddress,
    walletType,
  } = useUserContext();
  console.log({ walletType });

  const { sendToken } = useSendToken();
  const { receiveToken } = useReceiveToken();
  const { sendTokenAmount } = useSendTokenAmount();
  const { receiveTokenAmount } = useReceiveTokenAmount();

  const handleConfirmSwap = async () => {
    try {
      const res = await poolApiService.generateSwapPsbt(
        ordinalAddress,
        ordinalPublicKey,
        paymentAddress,
        paymentPublicKey,
        walletType,
        sendToken.uuid,
        receiveToken.uuid,
        sendTokenAmount,
        receiveTokenAmount
      );
      console.log(res);
      const { psbt } = res;
      console.log(psbt);

      const signedPsbt = await window.unisat.signPsbt(psbt);
      console.log(signedPsbt);
      const txRes = await poolApiService.pushTx(signedPsbt, signedPsbt);
      console.log(txRes);
    } catch (error) {}
    // setSwapConfirmModalOpen(false);
    // setTxSubmittedModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-2 px-4 lg:gap-4">
      <div className="flex items-center justify-between">
        <div className="invisible">
          <XMarkIcon width={20} />
        </div>
        <div className="text-[24px]">Confirm Swap</div>
        <div>
          <XMarkIcon
            width={20}
            className="cursor-pointer"
            onClick={() => setSwapConfirmModalOpen(false)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px] lg:text-[16px]">Swap from</div>
          <div className="text-[16px] font-semibold lg:text-[24px]">0.022</div>
        </div>
        <div className="flex items-center gap-2">
          <Image src={Eth} alt="eth" />
          <div className="text-[12px] lg:text-[16px]">ETH</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px] lg:text-[16px]">Swap to</div>
          <div className="text-[16px] font-semibold lg:text-[24px]">82.89</div>
        </div>
        <div className="flex items-center gap-2">
          <Image src={Eos} alt="eth" />
          <div className="lg:text-[16px text-[12px]">EOS</div>
        </div>
      </div>
      <div className="text-[12px] text-light-gray-font lg:text-[14px] lg:text-[16px] dark:text-dark-gray-font">
        Output is estimated. If the price changes by more than 0.5% your
        transaction will revert
      </div>
      <div className="flex flex-col gap-2 text-[12px] lg:gap-4 lg:text-[14px]">
        <div className="flex items-center justify-between ">
          <div>Price</div>
          <div className="flex items-center gap-1">
            <div>0.00027 ETH per 1 EOS</div>
            <ArrowsUpDownIcon width={20} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div>Minimum received</div>
            <CustomTooltip
              content="Your transaction will revert if there is a large, unfavorable
                price movement before it is confirmed"
            >
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </CustomTooltip>
          </div>
          <div className="flex items-center gap-1">
            <div>9.741 EOS</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div>Price Impact</div>
            <CustomTooltip
              content="The difference between the market price and estimated price
              due to trade size"
            >
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </CustomTooltip>
          </div>
          <div className="flex items-center gap-1">
            <div>0.01%</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div>Liquidity Provider Fee</div>

            <CustomTooltip
              content="A portion of each trade (0.30%) goes to liquidity providers as
              a protocol incentive"
            >
              <QuestionMarkCircleIcon width={20} className="cursor-pointer" />
            </CustomTooltip>
          </div>
          <div className="flex items-center gap-1">
            <div>0.0000066 ETH</div>
          </div>
        </div>
      </div>
      <Button
        placeholder={undefined}
        className="mt-4 bg-gradient text-[16px] font-bold normal-case lg:text-[18px]"
        onClick={() => handleConfirmSwap()}
      >
        Confirm
      </Button>
    </div>
  );
};

export default SwapConfirmPanel;
