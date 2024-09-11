import { useParams } from "@tanstack/react-router";
import { useAppSelector } from "../app/store"
import NodeDetails from "./node-details"
import { shallowEqual, useDispatch } from "react-redux";
import { useEffect, useTransition } from "react";
import { fetchCompanyById } from "../utils/utils";
import { setCompanyTree, setIsLoading } from "../features/companyTree/companyTreeSlicer";
import Loading from "./loading";

export default function DropdownTree() {
    const { companyId } = useParams({ from: '/company/$companyId' });
    const dispatch = useDispatch();
    const isSearching = useAppSelector((state) => state.companyTree.isSearching)
    const isLoading = useAppSelector((state) => state.companyTree.isLoadingData, shallowEqual)
    const loaderData = useAppSelector((state) => state.companyTree.searchResult, shallowEqual)
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setIsLoading(true))
                await fetchCompanyById(companyId,dispatch, isPending, startTransition)

            } catch (error) {
                console.log(error)
            } finally {
                dispatch(setIsLoading(false))
            }
        };
        fetchData();
    }, [companyId])

    if (isLoading) {
        return (<Loading />)
    }
    return (
        <div className="mx-1 my-2 overflow-auto">
            {loaderData.map((node) =>
                <NodeDetails key={node.id} node={node} isSearch={isSearching} />
            )}
        </div>
    )
}


