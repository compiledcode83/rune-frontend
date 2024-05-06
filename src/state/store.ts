import { configureStore } from "@reduxjs/toolkit";
import offerReducer from "./application/slices/offerSlice";
import myOfferReducer from "./application/slices/myOfferSlice";
import discoverDealReducer from "./application/slices/discoverDealSlice";

const store = configureStore({
    reducer: {
        offer: offerReducer,
        myOffer: myOfferReducer,
        discoverDeal: discoverDealReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
