import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryOfferProps, SendingOfferProps } from "@/propsType";

export type DiscoverDealState = {
    ongoingOffers: SendingOfferProps[];
    recentOffers: HistoryOfferProps[];
};

const initialState: DiscoverDealState = {
    ongoingOffers: [],
    recentOffers: [],
};

export const discoverDealSlice = createSlice({
    name: "discoverDeal",
    initialState,
    reducers: {
        setOngoingOffers: (
            state,
            action: PayloadAction<SendingOfferProps[]>
        ) => {
            state.ongoingOffers = action.payload;
        },
        setRecentOffers: (
            state,
            action: PayloadAction<HistoryOfferProps[]>
        ) => {
            state.recentOffers = action.payload;
        },
        appendRecentOffers: (
            state,
            action: PayloadAction<HistoryOfferProps[]>
        ) => {
            state.recentOffers = [...state.recentOffers, ...action.payload];
        },
    },
});

export const { setRecentOffers, setOngoingOffers, appendRecentOffers } =
    discoverDealSlice.actions;

export default discoverDealSlice.reducer;
