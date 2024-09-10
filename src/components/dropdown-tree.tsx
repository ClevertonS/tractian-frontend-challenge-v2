import { useParams } from "@tanstack/react-router";
import { useAppSelector } from "../app/store"
import NodeDetails from "./node-details"
import { shallowEqual, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchCompanyById } from "../utils/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { iTreeBranch } from "../interfaces/iTree";

export default function DropdownTree() {
    const { companyId } = useParams({ from: '/company/$companyId' });
    const dispatch = useDispatch();
    const isSearching = useAppSelector((state) => state.companyTree.isSearching)
    
    const loaderData = useAppSelector((state) => state.companyTree.searchResult, shallowEqual)

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchCompanyById(companyId, dispatch)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [companyId])

    
    function RowVirtualizerVariable({ rows }: { rows: Array<iTreeBranch> }) {
        const parentRef = useRef<HTMLDivElement>(null);
        const nodeVirtualize = useVirtualizer({
            count: rows.length,
            getScrollElement: () => parentRef.current,
            estimateSize: () => 22,
            overscan: 5
        })
        return (
            <>
              <div
                ref={parentRef}
                className="w-full"
                style={{
                  height: `200px`,
                  overflow: 'auto',
                }}
              >
                <div
                  style={{
                    height: `${nodeVirtualize.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {nodeVirtualize.getVirtualItems().map((virtualRow) => (
                    <div
                      key={virtualRow.index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${rows[virtualRow.index]}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <NodeDetails key={rows[virtualRow.index].id} node={rows[virtualRow.index]} isSearch={isSearching} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )
        }

    return (
            <RowVirtualizerVariable rows={loaderData}/>
    )
}

