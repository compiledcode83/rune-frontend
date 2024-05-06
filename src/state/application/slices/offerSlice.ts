import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemProps } from "@/propsType";

export type OfferState = {
    tradeItems: ItemProps[];
    offerItems: ItemProps[];
    addBTC: number;
    expireDate: string;
    collectionName: string;
    offerId: string;
    psbt: string;
    selectedTrader: string;
    sellerTaprootsignIndexes?: number[];
};

const initialState: OfferState = {
    tradeItems: [],
    offerItems: [],
    addBTC: 0,
    expireDate: "30m",
    collectionName: "",
    offerId: "",
    psbt: "",
    selectedTrader: "",
};

export const offerSlice = createSlice({
    name: "offer",
    initialState,
    reducers: {
        setTradeItems: (state, action: PayloadAction<ItemProps[]>) => {
            state.tradeItems = action.payload;
        },
        setOfferItems: (state, action: PayloadAction<ItemProps[]>) => {
            state.offerItems = action.payload;
        },
        setAddBTC: (state, action: PayloadAction<number>) => {
            state.addBTC = action.payload;
        },
        setExpireDate: (state, action: PayloadAction<string>) => {
            state.expireDate = action.payload;
        },
        setCollectionName: (state, action: PayloadAction<string>) => {
            state.collectionName = action.payload;
        },
        setOfferId: (state, action: PayloadAction<string>) => {
            state.offerId = action.payload;
        },
        setSelectedTrader: (state, action: PayloadAction<string>) => {
            state.selectedTrader = action.payload;
        },
    },
});

export const {
    setTradeItems,
    setOfferItems,
    setAddBTC,
    setExpireDate,
    setCollectionName,
    setOfferId,
    setSelectedTrader,
} = offerSlice.actions;

export default offerSlice.reducer;
