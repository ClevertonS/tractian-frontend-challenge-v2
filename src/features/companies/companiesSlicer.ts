import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCompany } from "../../interfaces/iCompany";

const initialState: iCompany[] = [];

export const assetsSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        setCompaniesArray(state, action: PayloadAction<iCompany[]>) {
            return state = action.payload;
        }
    }
})

export const {setCompaniesArray} = assetsSlice.actions;
export default assetsSlice.reducer;