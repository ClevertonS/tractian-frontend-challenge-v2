import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCompany } from "../../interfaces/iCompany";

type copanies = {
    allCompanys: iCompany[]
}

const initialState: copanies = {
    allCompanys: []
};

export const assetsSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        setCompaniesArray(state, action: PayloadAction<iCompany[]>) {
            state.allCompanys = action.payload;
        }
    }
})

export const {setCompaniesArray} = assetsSlice.actions;
export default assetsSlice.reducer;