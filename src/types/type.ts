export type WalletTypes = "Xverse" | "Unisat" | "Hiro" | "Magic" | "Okx" | "";

export type Context = {
  resolvedUrl: string;
  setHeader: any;
  write: any;
  end: any;
};

export type OkxPsbtInputType = {
  index: number;
  sighashTypes?: number[] | number;
  publicKey?: string;
  address?: string;
  disableTweakSigner?: boolean;
};

export type TokenType = {
  uuid: string;
  name: string;
  imgUrl: string;
  runeId: string;
  spaced: string;
  symbol: string;
  divisibility: number;
};

export type LiquidityType = {
  tokenA: TokenType;
  tokenB: TokenType;
  poolUuid: string;
};

export type PoolType = {
  tokenA: TokenType;
  tokenB: TokenType;
  uuid: string;
};

export type BalanceType = {
  amount: number;
  divisibility: number;
  runeId: string;
  spacedRune: string;
  rune: string;
  symbol: string;
};

declare global {
  interface Window {
    unisat: {
      signPsbt: (psbtHex: string) => Promise<string>;
      getAccounts: () => Promise<[string]>;
      switchNetwork: (network: string) => Promise<void>;
      requestAccounts: () => Promise<string[]>;
      getPublicKey: () => Promise<string>;
      sendBitcoin: (address: string, amount: number) => Promise<string>;
      signMessage: (
        message: string,
        type?: "ecdsa" | "bip322-simple"
      ) => Promise<string>;
    };

    okxwallet: {
      bitcoinTestnet: {
        connect: () => Promise<{ address: string; publicKey: string }>;
        signMessage: (
          msg: string,
          type: "ecdsa" | "bip322-simple"
        ) => Promise<string>;
        signPsbt: (
          psbt: string,
          options?: {
            autoFinalized: boolean;
            toSignInputs?: OkxPsbtInputType[];
          }
        ) => Promise<string>;
      };
      bitcoin: {
        connect: () => Promise<{ address: string; publicKey: string }>;
        signMessage: (
          msg: string,
          type: "ecdsa" | "bip322-simple"
        ) => Promise<string>;
        signPsbt: (
          psbt: string,
          options?: {
            autoFinalized: boolean;
            toSignInputs?: OkxPsbtInputType[];
          }
        ) => Promise<string>;
      };
    };
  }
}
