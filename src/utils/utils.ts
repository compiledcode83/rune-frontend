import { customToast } from "@/components/toast";
import { TokenType } from "@/types/type";
import { SignTransactionOptions, signTransaction } from "sats-connect";

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * max) + min;
}

export const showWallet = (wallet: string, start: number, end: number) => {
  return wallet === undefined || wallet === null
    ? "..."
    : wallet.substr(0, start) + "..." + wallet.substr(wallet.length - end, end);
};

export function containsSubstring(string: string, substring: string) {
  // Convert both string and substring to lowercase
  const lowerCaseString = string.toLowerCase();
  const lowerCaseSubstring = substring.toLowerCase();

  // Check if the lowercased string contains the lowercased substring
  return lowerCaseString.includes(lowerCaseSubstring);
}

export const getFormattedDateTime = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let minutesPadded = minutes.toString().padStart(2, "0");

  return `${month} ${day}, ${hours}:${minutesPadded}`;
};

export const convertWithDecimal = (amount: number, token: TokenType) => {
  if (token.runeId !== "") {
    return (amount /= 10 ** token.divisibility);
  }
  return 0;
};

export const convertToSats = (amount: number, token: TokenType) => {
  if (token.runeId !== "") {
    return (amount *= 10 ** token.divisibility);
  }
  return 0;
};

export const stringToDisplay = (amount: number) => {
  if (amount === 0) {
    return "0";
  } else if (amount < 0.00001) {
    return "<0.00001";
  } else {
    return amount.toFixed(5);
  }
};

export const signPsbt = async (
  psbt: string,
  walletType: string,
  paymentSignIndexes: number[],
  taprootSignIndexes: number[],
  ordinalAddress: string,
  paymentAddress: string
) => {
  let signedPsbt;
  try {
    if (walletType === "Unisat") {
      signedPsbt = await window.unisat.signPsbt(psbt);
    } else if (walletType === "Xverse") {
      const signPsbtOptions: SignTransactionOptions = {
        payload: {
          network: {
            type:
              process.env.NEXT_PUBLIC_NETWORK === "testnet"
                ? "Testnet"
                : ("Mainnet" as any),
          },
          message: "Sign Transaction",
          psbtBase64: psbt,
          broadcast: false,
          inputsToSign: [
            {
              address: ordinalAddress,
              signingIndexes: taprootSignIndexes,
              sigHash: 1,
            },
            {
              address: paymentAddress,
              signingIndexes: paymentSignIndexes,
              sigHash: 1,
            },
          ],
        },
        onFinish: (response: any) => {
          signedPsbt = response.psbtBase64;
        },
        onCancel: () => {
          throw Error("User cancelled");
        },
      };
      await signTransaction(signPsbtOptions);
      console.log({ signedPsbt });
    } else if (walletType === "Okx") {
      console.log("OKX.....");
      signedPsbt =
        process.env.NEXT_PUBLIC_NETWORK === "testnet"
          ? await window.okxwallet.bitcoinTestnet.signPsbt(psbt)
          : await window.okxwallet.bitcoin.signPsbt(psbt);
    } else if (walletType === "Hiro") {
      const signPsbtParams = {
        hex: psbt,
        signAtIndex: taprootSignIndexes.concat(paymentSignIndexes),
        network: process.env.NEXT_PUBLIC_NETWORK,
        broadcast: false,
      };
      const response = await (window as any).LeatherProvider.request(
        "signPsbt",
        signPsbtParams
      );
      console.log({ response });
      signedPsbt = response;
    }
    return signedPsbt;
  } catch (error) {
    console.error(error);
    customToast({
      toastType: "warn",
      title: "User rejected the wallet transaction",
    });

    throw Error("Error when sign psbt");
  }
};
