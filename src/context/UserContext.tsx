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
  const [walletType, setWalletType] = useState<WalletTypes>("");
  const [paymentAddress, setPaymentAddress] = useState("");
  const [paymentPublicKey, setPaymentPublicKey] = useState("");
  const [ordinalAddress, setOrdinalAddress] = useState("");
  const [ordinalPublicKey, setOrdinalPublicKey] = useState("");

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletType("");
    setPaymentAddress("");
    setPaymentPublicKey("");
    setOrdinalAddress("");
    setOrdinalPublicKey("");
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      // const { data } = await authApiService.getUserInfo();
      // setWalletType(data.walletType);
      // setPaymentAddress(data.paymentAddress);
      // setPaymentPublicKey(data.paymentPubkey);
      // setOrdinalAddress(data.address);
      // setOrdinalPublicKey(data.pubkey);
      // setIsConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

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
