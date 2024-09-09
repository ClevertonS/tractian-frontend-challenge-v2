import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCompany } from "../../interfaces/iCompany";

const initialState: iCompany[] = [];

export const assetsSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        setCompaniesArray(state, action: PayloadAction<iCompany[]>) {
            return state = action.payload;
        },
        cleanCompaniesArray(state) {
            return state = [];
        }
    }
})

export const {setCompaniesArray, cleanCompaniesArray} = assetsSlice.actions;
export default assetsSlice.reducer;