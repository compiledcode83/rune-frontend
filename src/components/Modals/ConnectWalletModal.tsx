import { useStatusContext } from "@/context/StatusContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import HiroWallet from "@/assets/imgs/hiro.svg";
import XverseWallet from "@/assets/imgs/xverse.svg";
import UnisatWallet from "@/assets/imgs/unisat.svg";
import OkxWallet from "@/assets/imgs/okx.png";
import TickCircle from "@/assets/imgs/tick-circle.svg";

import { type WalletTypes } from "@/types/type";
import { type BtcAddress } from "@btckit/types";
import {
  type GetAddressOptions,
  getAddress,
  type GetAddressResponse,
  getCapabilities,
  type Capability,
  BitcoinNetworkType,
  AddressPurpose,
} from "sats-connect";
import { useUserContext } from "@/context/UserContext";
// import authService from "@/api.services/auth.service";
import { customToast } from "../toast";
import { useRouter } from "next/router";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ConnectWalletModal = () => {
  const router = useRouter();
  const {
    connectWalletModalOpen,
    setConnectWalletModalOpen,
    // setLoadingModalOpen,
  } = useStatusContext();

  const {
    walletType,
    isConnected,
    ordinalAddress,
    ordinalPublicKey,
    paymentAddress,
    paymentPublicKey,
    setWalletType,
    setPaymentAddress,
    setOrdinalAddress,
    setPaymentPublicKey,
    setOrdinalPublicKey,
    setIsConnected,
    handleDisconnect,
  } = useUserContext();
  const [capabilityState, setCapabilityState] = useState<
    "loading" | "loaded" | "missing" | "cancelled"
  >("loading");
  const [capabilities, setCapabilities] = useState<Set<Capability>>();
  const unisatInstalledRef = useRef<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    checkXVerseAvailability();
    checkUnisatAvailability();
  }, []);

  // useEffect(() => {
  //   setWalletType("");
  //   setIsLoading(false);
  // }, [connectWalletModalOpen, setWalletType]);

  const capabilityMessageRef = useRef<string | undefined>("");

  capabilityMessageRef.current =
    capabilityState === "loading"
      ? "Checking capabilities..."
      : capabilityState === "cancelled"
        ? "Capability check cancelled by wallet. Please refresh the page and try again."
        : capabilityState === "missing"
          ? "Could not find an installed Sats Connect capable wallet. Please install a wallet and try again."
          : !capabilities
            ? "Something went wrong with getting capabilities"
            : undefined;

  const runCapabilityCheck = async (walletType: string) => {
    if (walletType === "Xverse") {
      if (capabilityMessageRef.current !== undefined) {
        customToast({
          toastType: "warn",
          title: "Install XVerse Wallet",
        });
        setIsLoading(false);
        return false;
      }
    } else if (walletType === "Unisat") {
      if (unisatInstalledRef.current === false) {
        customToast({
          toastType: "warn",
          title: "Install Unisat Wallet",
        });
        setIsLoading(false);
        return false;
      }
    } else if (walletType === "Hiro") {
      if (!(window as any).LeatherProvider) {
        customToast({
          toastType: "warn",
          title: "Install Leather Wallet",
        });
        setIsLoading(false);
        return false;
      }
    } else if (walletType === "Okx") {
      if (typeof window.okxwallet === "undefined") {
        customToast({
          toastType: "warn",
          title: "Install OKX Wallet",
        });
        setIsLoading(false);
        return false;
      }
    }
  };

  const checkUnisatAvailability = async () => {
    let unisat = (window as any).unisat;

    for (let i = 1; i < 10 && !unisat; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 100 * i));
      unisat = (window as any).unisat;
    }
    if (unisat) {
      unisatInstalledRef.current = true;
    } else if (!unisat) {
      unisatInstalledRef.current = false;
    }
  };

  const checkXVerseAvailability = async () => {
    let runs = 0;
    const MAX_RUNS = 20;
    setCapabilityState("loading");

    while (runs < MAX_RUNS) {
      try {
        await getCapabilities({
          onFinish(response) {
            setCapabilities(new Set(response));
            setCapabilityState("loaded");
          },
          onCancel() {
            setCapabilityState("cancelled");
          },
          payload: {
            network: {
              type:
                process.env.NEXT_PUBLIC_NETWORK === "testnet"
                  ? BitcoinNetworkType.Testnet
                  : BitcoinNetworkType.Mainnet,
            },
          },
        });
      } catch (e) {
        runs++;
        if (runs === MAX_RUNS) {
          setCapabilityState("missing");
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const handleClose = () => {
    setConnectWalletModalOpen(false);
  };

  const onWalletBtnClicked = useCallback(
    async (walletName: WalletTypes) => {
      setIsLoading(true);
      console.log({ walletName });
      let possibility = await runCapabilityCheck(walletName);
      if (possibility === false) return;
      if (walletName === "Hiro") {
        try {
          const addressesRes = await window.btc?.request("getAddresses", {});
          const { address, publicKey } = (
            addressesRes as any
          ).result.addresses.find(
            (address: BtcAddress) => address.type === "p2tr"
          );

          const { address: paymentAddress, publicKey: paymentPublickey } = (
            addressesRes as any
          ).result.addresses.find(
            (address: BtcAddress) => address.type === "p2wpkh"
          );

          setWalletType("Hiro");
          setPaymentAddress(paymentAddress);
          console.log({ paymentAddress });
          setPaymentPublicKey(paymentPublickey);
          setOrdinalAddress(address);
          console.log({ address });
          setOrdinalPublicKey(publicKey);
          customToast({
            toastType: "success",
            title: "Leather Wallet Connected",
          });
          setIsConnected(true);
          handleClose();
        } catch (err) {
          customToast({
            toastType: "warn",
            title: "Wallet operation was cancelled",
          });
        }
      } else if (walletName === "Xverse") {
        try {
          const getAddressOptions: GetAddressOptions = {
            payload: {
              purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
              message: "Address for receiving Ordinals",
              network: {
                type:
                  process.env.NEXT_PUBLIC_NETWORK === "testnet"
                    ? BitcoinNetworkType.Testnet
                    : BitcoinNetworkType.Mainnet,
              },
            },
            onFinish: (response: GetAddressResponse) => {
              const address = (response as any).addresses[0].address as string;
              const paymentAddress = (response as any).addresses[1]
                .address as string;
              const pubkey = (response as any).addresses[0].publicKey as string;
              const paymentPubkey = (response as any).addresses[1]
                .publicKey as string;
              setWalletType("Xverse");
              setPaymentAddress(paymentAddress);
              console.log({ paymentAddress });
              setPaymentPublicKey(paymentPubkey);
              setOrdinalAddress(address);
              console.log({ address });

              setOrdinalPublicKey(pubkey);
              customToast({
                toastType: "success",
                title: "Xverse Wallet Connected",
              });

              setIsConnected(true);
              handleClose();
            },
            onCancel: () => {
              customToast({
                toastType: "warn",
                title: "Wallet operation was cancelled",
              });
            },
          };
          await getAddress(getAddressOptions);
        } catch (err) {
          customToast({
            toastType: "warn",
            title: "Wallet operation was cancelled",
          });
        }
      } else if (walletName === "Unisat") {
        try {
          const unisat = (window as any).unisat;
          const addresses = await unisat.requestAccounts();
          const pubkey = await unisat.getPublicKey();
          setWalletType("Unisat");
          setPaymentAddress(addresses[0]);
          setPaymentPublicKey(pubkey);
          setOrdinalAddress(addresses[0]);
          setOrdinalPublicKey(pubkey);
          customToast({
            toastType: "success",
            title: "Unisat Wallet Connected",
          });
          setIsConnected(true);
          handleClose();
        } catch (err) {
          customToast({
            toastType: "warn",
            title: "Wallet operation was cancelled",
          });
        }
      } else if (walletName === "Okx") {
        const result =
          process.env.NEXT_PUBLIC_NETWORK === "testnet"
            ? await window.okxwallet.bitcoinTestnet.connect()
            : await window.okxwallet.bitcoin.connect();
        setWalletType("Okx");
        setPaymentAddress(result.address);
        setPaymentPublicKey(result.publicKey);
        setOrdinalAddress(result.address);
        setOrdinalPublicKey(result.publicKey);
        customToast({
          toastType: "success",
          title: "OKX Wallet Connected",
        });
        setIsConnected(true);
        handleClose();
      }
      setIsLoading(false);
    },
    [
      setOrdinalAddress,
      setOrdinalPublicKey,
      setPaymentAddress,
      setPaymentPublicKey,
      setWalletType,
    ]
  );

  const handleConnect = useCallback(
    async (connectWalletType: WalletTypes) => {
      if (walletType !== "") {
        if (walletType !== connectWalletType)
          customToast({
            toastType: "warn",
            title: `${walletType} is already connected.`,
          });
      } else {
        if (!isLoading) {
          onWalletBtnClicked(connectWalletType);
        } else {
          customToast({
            toastType: "warn",
            title: `${connectWalletType} is not supported yet.`,
          });
        }
      }
    },
    [isLoading, walletType, onWalletBtnClicked]
  );

  const renderConnecting = useMemo(() => {
    return (
      <>
        <div className="mx-2 mt-6 text-light-gray-font dark:text-dark-gray-font">
          <div
            className={`flex cursor-pointer items-center p-2 ${
              walletType !== "" && walletType !== "Unisat" && "opacity-60"
            } my-2 rounded-md border border-transparent bg-light-panel px-6 py-4 transition-all hover:border-primary dark:bg-dark-item`}
            onClick={() => handleConnect("Unisat")}
          >
            <Image
              alt="Unisat"
              src={UnisatWallet}
              width={28}
              className="rounded-lg"
            />
            <div className="ml-2">Unisat</div>
            {walletType === "Unisat" && (
              <Image
                src={TickCircle}
                width={20}
                alt="Selected"
                className="ml-auto"
              />
            )}
          </div>
          <div
            className={`flex items-center p-2 ${
              walletType !== "" && walletType !== "Xverse" && "opacity-60"
            } my-2 cursor-pointer rounded-md border border-transparent bg-light-panel px-6 py-4 transition-all hover:border-primary dark:bg-dark-item`}
            onClick={() => handleConnect("Xverse")}
          >
            <Image
              alt="Xverse"
              src={XverseWallet}
              width={28}
              className="rounded-lg"
            />
            <div className="ml-2">Xverse</div>
            {walletType === "Xverse" && (
              <Image
                src={TickCircle}
                width={20}
                alt="Selected"
                className="ml-auto"
              />
            )}
          </div>
          <div
            className={`flex cursor-not-allowed items-center p-2 ${
              walletType !== "" && walletType !== "Hiro" && "opacity-60"
            } my-2 rounded-md border border-transparent bg-light-panel px-6 py-4 transition-all hover:border-primary dark:bg-dark-item`}
            // onClick={() => handleConnect("Hiro")}
          >
            <Image
              alt="Hiro"
              src={HiroWallet}
              width={28}
              className="rounded-lg"
            />
            <div className="ml-2">Leather</div>
            {walletType === "Hiro" && (
              <Image
                src={TickCircle}
                width={20}
                alt="Selected"
                className="ml-auto"
              />
            )}
          </div>
          <div
            className={`flex items-center p-2 ${
              walletType !== "" && walletType !== "Okx" && "opacity-60"
            } my-2 cursor-pointer rounded-md border border-transparent bg-light-panel px-6 py-4 transition-all hover:border-primary dark:bg-dark-item`}
            onClick={() => handleConnect("Okx")}
          >
            <Image
              alt="Okx"
              src={OkxWallet}
              width={28}
              className="rounded-lg"
            />
            <div className="ml-2">OKX Wallet</div>
            {walletType === "Okx" && (
              <Image
                src={TickCircle}
                width={20}
                alt="Selected"
                className="ml-auto"
              />
            )}
          </div>
        </div>
      </>
    );
  }, [
    walletType,
    // handleSignMessage,
    handleConnect,
    handleClose,
  ]);
  return (
    <>
      <Dialog
        placeholder={undefined}
        open={connectWalletModalOpen}
        className="bg-transparent outline-none"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xs"
        handler={() => {}}
      >
        <DialogBody
          placeholder={undefined}
          className="z-50 rounded-lg bg-light-item p-[20px] backdrop-blur-sm dark:bg-dark-panel"
        >
          <div className="relative h-full w-full text-white">
            <div className="">
              <div className="mx-2 my-4">
                <div className="flex items-center justify-between">
                  {/* <div className="w-[24px] cursor-pointer"></div> */}
                  <p className="text-center text-lg font-bold text-black dark:text-white">
                    Connect Wallet
                  </p>
                  <div className="cursor-pointer" onClick={() => handleClose()}>
                    <XMarkIcon width={24} className="text-light-panel" />
                  </div>
                </div>
              </div>
              {renderConnecting}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ConnectWalletModal;
