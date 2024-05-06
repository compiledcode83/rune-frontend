import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
    setTradeItems,
    setOfferItems,
    setAddBTC,
    setExpireDate,
    setCollectionName,
    setOfferId,
    OfferState,
    setSelectedTrader,
} from "../slices/offerSlice";
import { RootState } from "../types";

// UseTradeItems Hook
export const useTradeItems = () => {
    const dispatch = useAppDispatch();
    const tradeItems = useAppSelector(
        (state: RootState) => state.offer.tradeItems
    );

    const setTradeItemsCallback = useCallback(
        (items: OfferState["tradeItems"]) => {
            dispatch(setTradeItems(items));
        },
        [dispatch]
    );

    return { tradeItems, setTradeItems: setTradeItemsCallback };
};

// UseOfferItems Hook
export const useOfferItems = () => {
    const dispatch = useAppDispatch();
    const offerItems = useAppSelector(
        (state: RootState) => state.offer.offerItems
    );

    const setOfferItemsCallback = useCallback(
        (items: OfferState["offerItems"]) => {
            dispatch(setOfferItems(items));
        },
        [dispatch]
    );

    return { offerItems, setOfferItems: setOfferItemsCallback };
};

// UseAddBTCHook
export const useAddBTC = () => {
    const dispatch = useAppDispatch();
    const addBTC = useAppSelector((state: RootState) => state.offer.addBTC);

    const setAddBTCCallback = useCallback(
        (btcAmount: number) => {
            dispatch(setAddBTC(btcAmount));
        },
        [dispatch]
    );

    return { addBTC, setAddBTC: setAddBTCCallback };
};

// UseExpireDate Hook
export const useExpireDate = () => {
    const dispatch = useAppDispatch();
    const expireDate = useAppSelector(
        (state: RootState) => state.offer.expireDate
    );

    const setExpireDateCallback = useCallback(
        (date: string) => {
            dispatch(setExpireDate(date));
        },
        [dispatch]
    );

    return { expireDate, setExpireDate: setExpireDateCallback };
};

// UseCollectionName Hook
export const useCollectionName = () => {
    const dispatch = useAppDispatch();
    const collectionName = useAppSelector(
        (state: RootState) => state.offer.collectionName
    );

    const setCollectionNameCallback = useCallback(
        (name: string) => {
            dispatch(setCollectionName(name));
        },
        [dispatch]
    );

    return { collectionName, setCollectionName: setCollectionNameCallback };
};

// UseSelectedTrader Hook
export const useSelectedTrader = () => {
    const dispatch = useAppDispatch();
    const selectedTrader = useAppSelector(
        (state: RootState) => state.offer.selectedTrader
    );

    const setSelectedTraderCallback = useCallback(
        (trader: string) => {
            dispatch(setSelectedTrader(trader));
        },
        [dispatch]
    );

    return { selectedTrader, setSelectedTrader: setSelectedTraderCallback };
};

// UseOfferId Hook
export const useOfferId = () => {
    const dispatch = useAppDispatch();
    const offerId = useAppSelector((state: RootState) => state.offer.offerId);

    const setOfferIdCallback = useCallback(
        (offerId: string) => {
            dispatch(setOfferId(offerId));
        },
        [dispatch]
    );

    return { offerId, setOfferId: setOfferIdCallback };
};
