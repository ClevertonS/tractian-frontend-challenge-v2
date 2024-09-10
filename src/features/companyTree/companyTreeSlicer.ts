import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iTreeBranch } from "../../interfaces/iTree";

type TreeState = {
    tree: iTreeBranch[];
    searchResult: iTreeBranch[];
    filtredApplied: string[]
}

const initialState: TreeState = {
    tree: [],
    searchResult: [],
    filtredApplied: []
};



export const companyTreeSlcier = createSlice({
    name: "companyTree",
    initialState,
    reducers: {
        setCompanyTree(state, action: PayloadAction<iTreeBranch[]>)
        {
            state.tree = action.payload;
            state.searchResult = state.tree
        }, 
        setSearchNode(state, action: PayloadAction<iTreeBranch[]>)
        {
            state.searchResult = action.payload
        }, 
        pushFiltre(state, action: PayloadAction<string>)
        {
            state.filtredApplied.push(action.payload)
        },
        removeFiltre(state, action: PayloadAction<string>)
        {
            state.filtredApplied.splice(state.filtredApplied.indexOf(action.payload))
        }
    }
})

export const {setCompanyTree, setSearchNode, pushFiltre, removeFiltre} = companyTreeSlcier.actions;
export default companyTreeSlcier.reducer;