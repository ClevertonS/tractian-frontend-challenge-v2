import { useParams } from "@tanstack/react-router";
import { useAppSelector } from "../app/store"
import Loading from "./loading";
import NodedDetails from "./node-details"
import { shallowEqual, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCompanyTree, setIsLoading } from "../features/companyTree/companyTreeSlicer";
import { fetchCompanyById } from "../utils/utils";

export default function DropdownTree() {
    const { companyId } = useParams({ from: '/company/$companyId' });
    const dispatch = useDispatch();
    const loaderData = useAppSelector((state) => state.companyTree.searchResult, shallowEqual)
    const isSearching = useAppSelector((state) => state.companyTree.isSearching)
    const isLoading = useAppSelector((state) => state.companyTree.isLoadingData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setIsLoading(true))
                const result = await fetchCompanyById(companyId)
                dispatch(setCompanyTree(result))
                dispatch(setIsLoading(false))
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [companyId])
        return (
            <div className="py-2 px-1">
                {loaderData.map((node) => (
                    <NodedDetails key={node.id} node={node} isSearch={isSearching} />
                ))}
            </div>
        )
    }
