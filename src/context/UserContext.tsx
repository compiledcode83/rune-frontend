import { createContext, useContext, useEffect, useState } from "react";
import { UserSessionProps } from "@/propsType";
import { WalletTypes } from "@/types/type";
import { useRouter } from "next/router";

export const UserContext = createContext<UserSessionProps>({
  isLogged: false,
  setIsLogged: () => {},
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
  handleLogout: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ ...props }) => {
  const { children } = props;
  const router = useRouter();

  const [isLogged, setIsLogged] = useState(false);
  const [walletType, setWalletType] = useState<WalletTypes>("");
  const [paymentAddress, setPaymentAddress] = useState("");
  const [paymentPublicKey, setPaymentPublicKey] = useState("");
  const [ordinalAddress, setOrdinalAddress] = useState("");
  const [ordinalPublicKey, setOrdinalPublicKey] = useState("");

  const handleLogout = () => {
    setIsLogged(false);
    setWalletType("");
    setPaymentAddress("");
    setPaymentPublicKey("");
    setOrdinalAddress("");
    setOrdinalPublicKey("");
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
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
      // setIsLogged(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLogged,
        setIsLogged,
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
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
