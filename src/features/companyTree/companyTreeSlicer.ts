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
                state.isSearching = true
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
                    state.isSearching = true
                    state.isLoadingData = false
                } else {
                    state.searchResult = state.tree
                    state.isSearching = false
                    state.isLoadingData = false
                }
            }

        },setIsSensorFilter(state, action: PayloadAction<boolean>)
        {
            state.isSensorTypeFilter = action.payload
            state.isLoadingData = true
            if (action.payload){
                state.isSearching = true
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
                    state.isSearching = true
                    state.isLoadingData = false
                } else {
                    state.searchResult = state.tree
                    state.isSearching = false
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

function filterNodeByType(
    node: iTreeBranch,
    filterName: "alert" | "energy" | "both"
  ): iTreeBranch | null{

    let _Match = false;
    if (filterName == "alert") {
        _Match = node.status == filterName
    } else if(filterName == "energy") { 
        _Match = node.sensorType == filterName
    } else {
        _Match = node.status == "alert" && node.sensorType == "energy"
    }
  
    let filteredChildren: iTreeBranch[] = []
  
    if (node.children) {
      filteredChildren = findNodesContainingFilter(node.children, filterName)
    }
  
    if ((_Match) || filteredChildren.length > 0) {
      return {
        ...node,
        children:
          filteredChildren.length > 0 ? filteredChildren : node.children || [],
      }
    }
  
    return null
  }


function findNodesContainingFilter (nodes: iTreeBranch[], filterName: "alert" | "energy" | "both"): iTreeBranch[] {
    const result: iTreeBranch[] = [];
 
    if (filterName == "alert") {
        nodes.forEach((node) => {
            const filteredNode = filterNodeByType(node, filterName)
            if (filteredNode !== null) {
                result.push(filteredNode)
              }
        });
    } else if (filterName == "energy") {
        nodes.forEach((node) => {
            const filteredNode = filterNodeByType(node, filterName)
            if (filteredNode !== null) {
                result.push(filteredNode)
              }
        });
    } else {
        nodes.forEach((node) => {
            const filteredNode = filterNodeByType(node, filterName)
            if (filteredNode !== null) {
                result.push(filteredNode)
              }
        });
    }
    return result;
}

export const {setCompanyTree, setSearchNode, setIsSensorFilter,setIsLoading, setIsSearching,setIsAlertFilter,setComponentById} = companyTreeSlcier.actions;
export default companyTreeSlcier.reducer;