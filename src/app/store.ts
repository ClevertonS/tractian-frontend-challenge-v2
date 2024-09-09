import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "../features/assets/assetsSlicer"
import locationsReducer from "../features/assets/assetsSlicer"
import companiesReducer from "../features/companies/companiesSlicer"
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        assets: assetsReducer,
        locations: locationsReducer,
        companies: companiesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch: () => AppDispatch = useDispatch;