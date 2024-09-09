import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "../features/assets/assetsSlicer"
import locationsReducer from "../features/assets/assetsSlicer"

export const store = configureStore({
    reducer: {
        assets: assetsReducer,
        locations: locationsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;