import { DiscoverDealState } from "./slices/discoverDealSlice";
import { MyOfferState } from "./slices/myOfferSlice";
import { OfferState } from "./slices/offerSlice";
import { SwapState } from "./slices/swapSlice";

export type RootState = {
  offer: OfferState;
  myOffer: MyOfferState;
  discoverDeal: DiscoverDealState;
  swap: SwapState;
};
