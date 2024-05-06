import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OfferState } from "./offerSlice";

export type MyOfferState = {
    sentOffers: OfferState[];
    receivedOffers: OfferState[];
};

const initialState: MyOfferState = {
    sentOffers: [],
    receivedOffers: [],
};

export const myOfferSlice = createSlice({
    name: "myOffer",
    initialState,
    reducers: {
        setSentOffers: (state, action: PayloadAction<OfferState[]>) => {
            state.sentOffers = action.payload;
        },
        setReceivedOffers: (state, action: PayloadAction<OfferState[]>) => {
            state.receivedOffers = action.payload;
        },
        appendSentOffers: (state, action: PayloadAction<OfferState[]>) => {
            state.sentOffers = [...state.sentOffers, ...action.payload];
        },
        appendReceivedOffers: (state, action: PayloadAction<OfferState[]>) => {
            state.receivedOffers = [...state.receivedOffers, ...action.payload];
        },
    },
});

export const {
    setSentOffers,
    setReceivedOffers,
    appendSentOffers,
    appendReceivedOffers,
} = myOfferSlice.actions;

export default myOfferSlice.reducer;
