import React, { MouseEventHandler, useEffect } from "react";
import Image from "next/image";
import { Drawer } from "@material-tailwind/react";
import Avatar from "boring-avatars";

import { useStatusContext } from "@/context/StatusContext";
import { useUserContext } from "@/context/UserContext";
import Pedro from "@/assets/imgs/pedro.png";
import Setting from "@/assets/imgs/setting-outline.svg";
import Logout from "@/assets/imgs/log-off.svg";
import Unisat from "@/assets/imgs/unisat.svg";
import Okx from "@/assets/imgs/okx.png";
import Xverse from "@/assets/imgs/xverse.svg";
import Hiro from "@/assets/imgs/hiro.svg";

import { addressShortening } from "@/utils/adress";
import { useTokenBalances } from "@/state/application/hooks/useSwapHooks";
import poolApiService from "@/api.services/pool/pool.api.service";
import { convertWithDecimal, stringToDisplay } from "@/utils/utils";
import ProfileTokenItemPanel from "./ProfileTokenItemPanel";

interface DesignPalette {
  colors: string[];
}

export const designPalette: DesignPalette = {
  colors: [
    "#FFA6D6",
    "#DAFF73",
    "#BCE6EC",
    "#B9A9FB",
    "#FF9179",
    "#E7E6E9",
    "#202025",
    "#FFFFFF",
  ],
};

export const WalletAvatar = (address: string) => {
  return (
    <Avatar
      size={48}
      name={address}
      variant="pixel"
      colors={designPalette.colors}
    />
  );
};

const ProfileDrawer = () => {
  const { profileDrawerOpen, setProfileDrawerOpen } = useStatusContext();
  const { ordinalAddress, paymentAddress, walletType, handleDisconnect } =
    useUserContext();
  console.log({ profileDrawerOpen });
  const { tokenBalances, setTokenBalances } = useTokenBalances();

  useEffect(() => {
    (async () => {
      if (ordinalAddress !== "" && paymentAddress !== "") {
        const balances = await poolApiService.getBalance(
          ordinalAddress,
          paymentAddress
        );
        console.log({ balances });
        setTokenBalances(balances);
      }
    })();
  }, [ordinalAddress, paymentAddress]);

  const btcRune = tokenBalances.find(
    (balance) => balance.spacedRune === "BITCOIN"
  );
  const handleLogout = () => {
    setProfileDrawerOpen(false);
    handleDisconnect();
  };
  const walletBadge = () => {
    if (walletType === "Unisat")
      return <Image src={Unisat} alt="unisat" width={20} height={20} />;
    else if (walletType === "Okx")
      return <Image src={Okx} alt="okx" width={20} height={20} />;
    else if (walletType === "Xverse")
      return <Image src={Xverse} alt="xverse" width={20} height={20} />;
    else if (walletType === "Hiro")
      return <Image src={Hiro} alt="hiro" width={20} height={20} />;
  };
  return (
    <Drawer
      open={profileDrawerOpen}
      onClose={() => setProfileDrawerOpen(false)}
      placeholder={undefined}
      placement="right"
      size={423}
    >
      <div className="flex h-full flex-col gap-[32px] bg-white px-[24px] pt-[30px] dark:bg-dark-panel">
        <div className="flex items-center justify-between">
          <div className="relative">
            {WalletAvatar(ordinalAddress)}
            <div className="absolute -bottom-[5px] -right-[5px]">
              {walletBadge()}
            </div>
          </div>
          <div className="flex justify-between gap-[90px]">
            <div className="text-primary">
              {addressShortening(ordinalAddress)}
            </div>
            <div className="flex gap-4">
              <Image
                src={Setting}
                alt="setting"
                className="cursor-pointer"
                // onClick={handleTheme}
                height={18}
                width={18}
              />
              <Image
                src={Logout}
                alt="setting"
                className="cursor-pointer"
                // onClick={handleTheme}
                height={18}
                width={18}
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
        <div className="text-[45px] font-medium text-black dark:text-white">
          {stringToDisplay((btcRune?.amount || 0) / 10 ** 8)} BTC
        </div>
        <div>
          <div className="mb-[27px]">Tokens</div>
          <div className="flex flex-col gap-[35px]">
            {tokenBalances.map((balance) => (
              <ProfileTokenItemPanel balance={balance} key={balance.runeId} />
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ProfileDrawer;
