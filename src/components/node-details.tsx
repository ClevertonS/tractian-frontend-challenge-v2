import GoLocation from "../assets/icons/GoLocation.svg"
import CubeIcon from "../assets/icons/IoCubeOutline.svg"
import DownArrow from "../assets/icons/Down.svg"
import OpenArrow from "../assets/icons/OpenArrow.svg"
import { useState } from "react";
import ComponentButton from "./component-button";
import { iTreeBranch } from "../interfaces/iTree";
import { useAppSelector } from "../app/store";

export interface iNodeProps {
    node: iTreeBranch
    isSearch?: boolean
}

export default function NodeDetails({ node, isSearch = false }: iNodeProps, ) {
    const [isOpen, setIsOpen] = useState(isSearch);
    const isSearching = useAppSelector((state) => state.companyTree.isSearching)
    const hasChildren = node.children && node.children.length > 0;
    function togleOpen() {
        setIsOpen(!isOpen)
    }
    return (<div>
        <div onClick={togleOpen} className="flex flex-row cursor-pointer text-sm mb-1 gap-1">
            {hasChildren && ((isOpen || isSearching) ? <img className="ml-1" src={DownArrow} /> : <img className="ml-1" src={OpenArrow} />)}
            <SummaryType node={node} />
        </div>
        <div className="ml-8">
            {hasChildren && (isOpen || isSearching) && (
                <div className="relative">
                    <span className="-left-6 absolute border-l-2 border-black border-opacity-5 h-full"/>
                    {node.children!.map((child) => (
                        <NodeDetails key={child.id} node={child} isSearch={isSearch} />
                    ))}
                </div>
            )}
        </div>
    </div>)
}



function SummaryType({ node }: iNodeProps) {
    let iconSrc;

    if (node.type === "Asset" || node.type === "Location") {
        iconSrc = node.type === "Asset" ? CubeIcon : GoLocation;
        return (
            <div className="flex flex-row gap-1">
                <img width={22} height={22} src={iconSrc} alt="" />
                <p className="ml-1 text-sm text-node-font">{node.name}</p>
            </div>
        );
    } else {

        return (    
            <ComponentButton node={node} />
        )
    }
}