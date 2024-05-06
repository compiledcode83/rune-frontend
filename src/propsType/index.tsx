import { OfferState } from "@/state/application/slices/offerSlice";
import { WalletTypes } from "@/types/type";

export const HTMLContentTypes = [
  "text/html",
  "text/html;charset=utf-8",
  "image/svg+xml",
];
export const IMGContentTypes = [
  "image/apng",
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export type UserSessionProps = {
  walletType: WalletTypes;
  setWalletType: (c: WalletTypes) => void;
  paymentAddress: string;
  setPaymentAddress: (c: string) => void;
  paymentPublicKey: string;
  setPaymentPublicKey: (c: string) => void;
  ordinalAddress: string;
  setOrdinalAddress: (c: string) => void;
  ordinalPublicKey: string;
  setOrdinalPublicKey: (c: string) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  handleLogout: () => void;
};

export type ItemProps = {
  address: string;
  url: string;
  price: number;
  collection: string;
  number: number;
  inscriptionId: string;
  contentType: string;
  isVerified?: boolean;
};

export type UserOfferProps = {
  tradeItems: ItemProps[];
  setTradeItems: (c: ItemProps[]) => void;
  offerItems: ItemProps[];
  setOfferItems: (c: ItemProps[]) => void;
  addBTC: number;
  setAddBTC: (c: number) => void;
  expireDate: string;
  setExpireDate: (c: string) => void;
  collectionName: string;
  setCollectionName: (c: string) => void;
};

export type StatusContextProps = {
  connectWalletModalOpen: boolean;
  setConnectWalletModalOpen: (open: boolean) => void;
  selectTokenModalOpen: boolean;
  setSelectTokenModalOpen: (open: boolean) => void;
  confirmSwapModalOpen: boolean;
  setConfirmSwapModalOpen: (open: boolean) => void;
  txSubmittedModalOpen: boolean;
  setTxSubmittedModalOpen: (open: boolean) => void;
};

export type Participant = {
  address: string;
};

export type InscriptionWithAddress = InscriptionItem & {
  address: string;
};

export type DealProps = {
  uuid: string;
  psbt: string;
  buyer: Participant;
  seller: Participant;
  expiredAt: string;
  price: number;
  buyerSwapInscription: Array<{ inscription: InscriptionItem }>;
  sellerSwapInscription: Array<{ inscription: InscriptionItem }>;
};

export type Collection = {
  name: string | null;
  imgUrl: string | null;
  description: string | null;
  discord: string | null;
  website: string | null;
  twitter: string | null;
};

export type Inscription = {
  inscriptionId: string;
  collection: Collection;
};

export type InscriptionItem = {
  inscription: Inscription;
};

export type SendingOfferProps = {
  uuid: string;
  price: number;
  buyerInscription: ItemProps[];
  sellerInscription: ItemProps[];
  buyer: Participant;
  seller: Participant;
  expiredAt: string;
  status: string;
};

export type HistoryOfferProps = {
  uuid: string;
  price: number;
  buyerInscription: ItemProps[];
  sellerInscription: ItemProps[];
  buyer: Participant;
  seller: Participant;
  pushedAt: string;
  status: string;
  txId?: string;
};

export type UserHistoryOfferProps = {
  uuid: string;
  price: number;
  buyerInscription: ItemProps[];
  sellerInscription: ItemProps[];
  buyer: Participant;
  seller: Participant;
  expiredAt: string;
  status: string;
  txId?: string;
};

export type Meta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type SendingOfferResponse = {
  data: SendingOfferProps[];
  meta: Meta;
};

export type HistoryOfferResponse = {
  data: HistoryOfferProps[];
  meta: Meta;
};

export type UserHistoryOfferResponse = {
  data: UserHistoryOfferProps[];
  meta: Meta;
};

export type OfferStateResponse = {
  data: OfferState[];
  meta: Meta;
};
