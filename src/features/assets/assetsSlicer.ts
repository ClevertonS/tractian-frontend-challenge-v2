import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iAsset } from "../../interfaces/iAsset";

const initialState: iAsset[] = [];

export const assetsSlice = createSlice({
    name: "assets",
    initialState,
    reducers: {
        setAssetsArray(state, action: PayloadAction<iAsset[]>) {
            return state = action.payload;
        },
        cleanAssetsArray(state) {
            return state = [];
        }
    }
})

export const {setAssetsArray, cleanAssetsArray} = assetsSlice.actions;
export default assetsSlice.reducer;