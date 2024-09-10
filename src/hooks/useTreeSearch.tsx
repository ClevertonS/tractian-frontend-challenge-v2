import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../app/store";
import { iTreeBranch } from "../interfaces/iTree";
import useDebounce from "./useDebounce";
import { useDispatch } from "react-redux";
import { setIsSearching, setSearchNode } from "../features/companyTree/companyTreeSlicer";

function findNodesContainingName (nodes: iTreeBranch[], nodeName: string): iTreeBranch[] {
    const result: iTreeBranch[] = [];
    
    nodes.forEach((node) => {
        if (node.name.includes(nodeName)) {
            result.push(node)
        }

        if (node.children) {
            result.push(...findNodesContainingName(node.children, nodeName))
        }
    });

    return result;
}

export default function useTreeSearch()
{
    
    const initalTree = useAppSelector((state) => state.companyTree.tree)
    const dispatch = useDispatch();
    const [filteredTree, setLocalTree] = useState<iTreeBranch[]>([])
    const [localSearchValue, setLocalSearchValue] = useState("");
    const timeToSearch = useDebounce(localSearchValue, 500);

    const setTreeSearch = useCallback((searchValue: string) => {
        setLocalSearchValue(searchValue);
    }, []);

    useEffect(() => {
        if (timeToSearch) {
            if (localSearchValue != "") {
                dispatch(setIsSearching(true))
                const searchResult = findNodesContainingName(initalTree, localSearchValue) 
                setLocalTree(searchResult)

                dispatch(setSearchNode(searchResult))
            } else {
                dispatch(setIsSearching(false))
                setLocalTree(initalTree)
                dispatch(setSearchNode(initalTree))
            }
        }
    }, [timeToSearch, localSearchValue])

    useEffect(() => {
        setLocalTree(initalTree)
        dispatch(setSearchNode(initalTree))
    }, [initalTree])

    return [filteredTree, setTreeSearch] as const;
}

