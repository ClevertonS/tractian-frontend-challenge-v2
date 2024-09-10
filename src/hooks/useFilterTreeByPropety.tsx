import { useCallback, useState } from "react";
import { useAppSelector } from "../app/store";
import { iTreeBranch } from "../interfaces/iTree";
import { useDispatch } from "react-redux";
import { pushFiltre, removeFiltre, setSearchNode } from "../features/companyTree/companyTreeSlicer";
import useTreeSearch from "./useTreeSearch";


function findNodesByCriteria(nodes: iTreeBranch[], criteria: "sensorType" | "status", value: string): iTreeBranch[] {
    const result: iTreeBranch[] = [];
    
    nodes.forEach((node) => {
      if (node[criteria] === value) {
        result.push(node);
      }
      
      if (node.children) {
        result.push(...findNodesByCriteria(node.children, criteria, value));
      }
    });

    return result;
}
    

export default function useFilterTreeByPropety(isFilterActive: boolean, criteria: "sensorType" | "status")
{
    const searchTree = useAppSelector((state) => state.companyTree.searchResult)
    const filtre = useAppSelector((state) => state.companyTree.filtredApplied)
    const dispatch = useDispatch();
    const [getTreeSearch] = useTreeSearch();

    useCallback(() => {
        let filteredNodes = [...searchTree];

        if (isFilterActive) {
            if (criteria === "status") {
                filteredNodes = findNodesByCriteria(filteredNodes, "status", "alert");
            } else if (criteria === "sensorType") {
                filteredNodes = findNodesByCriteria(filteredNodes, "sensorType", "energy");
            }
            dispatch(pushFiltre(criteria))
        } else {
            dispatch(removeFiltre(criteria))
            if(filtre.length == 0)
            {
                dispatch(setSearchNode(getTreeSearch))
            } else {
                filteredNodes = findNodesByCriteria(filteredNodes, criteria, criteria == "status" ? "energy" : "alert");
            }
        }
        dispatch(setSearchNode(filteredNodes))
    }, [isFilterActive, criteria, searchTree, filtre, dispatch, getTreeSearch])
    
}