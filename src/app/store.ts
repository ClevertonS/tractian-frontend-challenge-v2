import { configureStore } from "@reduxjs/toolkit";

import companiesReducer from "../features/companies/companiesSlicer"
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        companies: companiesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch: () => AppDispatch = useDispatch;