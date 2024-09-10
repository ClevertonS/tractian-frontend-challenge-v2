import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import companiesReducer from "../features/companies/companiesSlicer";
import companyTreeReducer from "../features/companyTree/companyTreeSlicer"

export const store = configureStore({
    reducer: {
        companies: companiesReducer,
        companyTree: companyTreeReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch: () => AppDispatch = useDispatch;