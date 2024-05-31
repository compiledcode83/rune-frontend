import { createContext, useContext, useEffect, useState } from "react";
import { UserSessionProps } from "@/propsType";
import { WalletTypes } from "@/types/type";
import { useRouter } from "next/router";

export const UserContext = createContext<UserSessionProps>({
  isConnected: false,
  setIsConnected: () => {},
  walletType: "",
  setWalletType: () => {},
  paymentAddress: "",
  setPaymentAddress: () => {},
  paymentPublicKey: "",
  setPaymentPublicKey: () => {},
  ordinalAddress: "",
  setOrdinalAddress: () => {},
  ordinalPublicKey: "",
  setOrdinalPublicKey: () => {},
  handleDisconnect: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ ...props }) => {
  const { children } = props;
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletTypeVar] = useState<WalletTypes>("");
  const [paymentAddress, setPaymentAddressVar] = useState("");
  const [paymentPublicKey, setPaymentPublicKeyVar] = useState("");
  const [ordinalAddress, setOrdinalAddressVar] = useState("");
  const [ordinalPublicKey, setOrdinalPublicKeyVar] = useState("");

  const setWalletType = (walletType: WalletTypes) => {
    localStorage.setItem("walletType", walletType);
    setWalletTypeVar(walletType);
  };

  const setOrdinalAddress = (ordinalAddress: string) => {
    localStorage.setItem("ordinalAddress", ordinalAddress);
    setOrdinalAddressVar(ordinalAddress);
  };

  const setOrdinalPublicKey = (ordinalPublicKey: string) => {
    localStorage.setItem("ordinalPublicKey", ordinalPublicKey);
    setOrdinalPublicKeyVar(ordinalPublicKey);
  };

  const setPaymentAddress = (paymentAddress: string) => {
    localStorage.setItem("paymentAddress", paymentAddress);
    setPaymentAddressVar(paymentAddress);
  };

  const setPaymentPublicKey = (paymentPublicKey: string) => {
    localStorage.setItem("paymentPublicKey", paymentPublicKey);
    setPaymentPublicKeyVar(paymentPublicKey);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletType("");
    setPaymentAddress("");
    setPaymentPublicKey("");
    setOrdinalAddress("");
    setOrdinalPublicKey("");
  };

  useEffect(() => {
    const walletType = localStorage.getItem("walletType");
    if (walletType !== "null" && walletType) {
      setIsConnected(true);
      setWalletTypeVar(localStorage.getItem("walletType") as WalletTypes);
      setOrdinalAddressVar(localStorage.getItem("ordinalAddress") as string);
      setOrdinalPublicKeyVar(
        localStorage.getItem("ordinalPublicKey") as string
      );
      setPaymentAddressVar(localStorage.getItem("paymentAddress") as string);
      setPaymentPublicKeyVar(
        localStorage.getItem("paymentPublicKey") as string
      );
    }
  }, []);

  // const getUser = async () => {
  //   try {
  //     // const { data } = await authApiService.getUserInfo();
  //     // setWalletType(data.walletType);
  //     // setPaymentAddress(data.paymentAddress);
  //     // setPaymentPublicKey(data.paymentPubkey);
  //     // setOrdinalAddress(data.address);
  //     // setOrdinalPublicKey(data.pubkey);
  //     // setIsConnected(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <UserContext.Provider
      value={{
        isConnected,
        setIsConnected,
        walletType,
        setWalletType,
        paymentAddress,
        setPaymentAddress,
        paymentPublicKey,
        setPaymentPublicKey,
        ordinalAddress,
        setOrdinalAddress,
        ordinalPublicKey,
        setOrdinalPublicKey,
        handleDisconnect,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
