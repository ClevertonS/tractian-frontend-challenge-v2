import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../app/store";
import { iTreeBranch } from "../interfaces/iTree";
import useDebounce from "./useDebounce";
import { useDispatch } from "react-redux";
import { setSearchNode } from "../features/companyTree/companyTreeSlicer";

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
    const searchTree = useAppSelector((state) => state.companyTree.searchResult)
    const initalTree = useAppSelector((state) => state.companyTree.searchResult)
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
                const searchResult = findNodesContainingName(searchTree, localSearchValue) 
                setLocalTree(searchResult)
                dispatch(setSearchNode(searchResult))
            } else {
                setLocalTree(initalTree)
                dispatch(setSearchNode(initalTree))
            }
        }
    }, [timeToSearch])

    return [filteredTree, setTreeSearch] as const;
}

