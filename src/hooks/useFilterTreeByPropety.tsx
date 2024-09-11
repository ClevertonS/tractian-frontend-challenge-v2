import { useEffect, useState} from "react";
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
    

export default function useFilterTreeByPropety()
{
    const searchTree = useAppSelector((state) => state.companyTree.searchResult)
    const filtre = useAppSelector((state) => state.companyTree.filtredApplied)
    const dispatch = useDispatch();
    const [getTreeSearch] = useTreeSearch();
    const [criteria, setCriteria] = useState<"sensorType" | "status">()
    const [isFilterActive, setIsFilterActive] = useState(false)

    useEffect(() => {
        let filteredNodes = [...searchTree];
        console.log(isFilterActive)
        if (isFilterActive) {
            if (criteria === "status") {
                filteredNodes = findNodesByCriteria(filteredNodes, "status", "alert");
            } else if (criteria === "sensorType") {
                filteredNodes = findNodesByCriteria(filteredNodes, "sensorType", "energy");
            }
            dispatch(pushFiltre(criteria!))
        } else {
            dispatch(removeFiltre(criteria!))
            if(filtre.length == 0)
            {
                console.log(getTreeSearch)
                dispatch(setSearchNode(getTreeSearch))
            } else {
                
                filteredNodes = [...searchTree];
            }
        }
        dispatch(setSearchNode(filteredNodes))
    }, [isFilterActive])


    return [setIsFilterActive ,setCriteria] as const
}