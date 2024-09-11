import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iTreeBranch } from "../../interfaces/iTree";

type TreeState = {
    isLoadingData: boolean,
    isSearching: boolean,
    tree: iTreeBranch[];
    searchResult: iTreeBranch[];
    filtredApplied: string[];
    componentById: iTreeBranch | null;
}

const initialState: TreeState = {
    tree: [],
    searchResult: [],
    filtredApplied: [],
    isLoadingData: true,
    isSearching: false,
    componentById: null
};



export const companyTreeSlcier = createSlice({
    name: "companyTree",
    initialState,
    reducers: {
        setCompanyTree(state, action: PayloadAction<iTreeBranch[] | []>)
        {
            state.tree = action.payload;
            state.searchResult = state.tree
        },
        setSearchNode(state, action: PayloadAction<iTreeBranch[] | []>)
        {
            state.searchResult = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>)
        {
            state.isLoadingData = action.payload
        },setIsSearching(state, action: PayloadAction<boolean>)
        {
            state.isSearching = action.payload
        }, 
        pushFiltre(state, action: PayloadAction<string>)
        {
            state.filtredApplied.push(action.payload)
        },
        removeFiltre(state, action: PayloadAction<string>)
        {
            state.filtredApplied.splice(state.filtredApplied.indexOf(action.payload), 1)
        },setComponentById(state, action: PayloadAction<string>)
        {
            state.componentById = state.searchResult.filter((component) => component.id == action.payload)[0]
        }
    }
})

export const {setCompanyTree, setSearchNode, setIsLoading, setIsSearching,pushFiltre, removeFiltre,setComponentById} = companyTreeSlcier.actions;
export default companyTreeSlcier.reducer;