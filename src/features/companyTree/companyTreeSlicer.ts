import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iTreeBranch } from "../../interfaces/iTree";

type TreeState = {
    isLoadingData: boolean,
    isSearching: boolean,
    tree: iTreeBranch[];
    searchResult: iTreeBranch[];
    isAlertFilter: boolean;
    isSensorTypeFilter: boolean;
    componentById: iTreeBranch | null;
}

const initialState: TreeState = {
    tree: [],
    searchResult: [],
    isAlertFilter: false,
    isSensorTypeFilter: false,
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
            console.log(state.tree)
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
        setIsAlertFilter(state, action: PayloadAction<boolean>)
        {
            state.isAlertFilter = action.payload
            state.isLoadingData = true
            if (state.isAlertFilter){
                if(state.isSensorTypeFilter) {
                state.searchResult = findNodesContainingFilter(state.searchResult, "both")
                state.isLoadingData = false
                } else {
                    state.searchResult = findNodesContainingFilter(state.searchResult, "alert")
                    state.isLoadingData = false
                }
            } else {
                if(state.isSensorTypeFilter) {
                    state.searchResult = state.tree
                    state.searchResult = findNodesContainingFilter(state.searchResult, "energy")
                    state.isLoadingData = false
                } else {
                    console.log(1)
                    state.searchResult = state.tree
                    state.isLoadingData = false
                }
            }

        },setIsSensorFilter(state, action: PayloadAction<boolean>)
        {
            state.isSensorTypeFilter = action.payload
            state.isLoadingData = true
            if (action.payload){
                if(state.isAlertFilter) {
                state.searchResult = findNodesContainingFilter(state.searchResult, "both")
                state.isLoadingData = false
                } else {
                    state.searchResult = findNodesContainingFilter(state.searchResult, "energy")
                    state.isLoadingData = false
                }
            } else {
                if(state.isAlertFilter) {
                    state.searchResult = state.tree
                    state.searchResult = findNodesContainingFilter(state.searchResult, "alert")
                    state.isLoadingData = false
                } else {
                    state.searchResult = state.tree
                    state.isLoadingData = false
                }
            }
        },
        setComponentById(state, action: PayloadAction<string>)
        {
            state.componentById = findComponentById(state.searchResult, action.payload)
        }
    }
})

function findComponentById(tree: iTreeBranch[], componentId: string): iTreeBranch | null {
    for (const node of tree) {
        if (node.id === componentId) {
            return node;
        }
        if (node.children) {
            const found = findComponentById(node.children, componentId);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

function findNodesContainingFilter (nodes: iTreeBranch[], filterName: "alert" | "energy" | "both"): iTreeBranch[] {
    const result: iTreeBranch[] = [];
 
    if (filterName == "alert") {
        nodes.forEach((node) => {
            if (node.status == "alert") {
                result.push(node)
            }
    
            if (node.children) {
                result.push(...findNodesContainingFilter(node.children, filterName))
            }
        });
    } else if (filterName == "energy") {
        nodes.forEach((node) => {
            if (node.sensorType == "energy") {
                result.push(node)
            }
    
            if (node.children) {
                result.push(...findNodesContainingFilter(node.children, filterName))
            }
        });
    } else {
        nodes.forEach((node) => {
            if ((node.sensorType == "energy") && (node.status == "alert")) {
                result.push(node)
            }
    
            if (node.children) {
                result.push(...findNodesContainingFilter(node.children, filterName))
            }
        });
    }
    return result;
}

export const {setCompanyTree, setSearchNode, setIsSensorFilter,setIsLoading, setIsSearching,setIsAlertFilter,setComponentById} = companyTreeSlcier.actions;
export default companyTreeSlcier.reducer;