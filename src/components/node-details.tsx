import { iTreeBranch } from "../interfaces/iTree";
import GoLocation from "../assets/icons/GoLocation.svg"
import CubeIcon from "../assets/icons/IoCubeOutline.svg"
import Codepen from "./Icons/Codepen";
import DownArrow from "../assets/icons/Down.svg"
import OpenArrow from "../assets/icons/OpenArrow.svg"
import SensorType from "./Icons/sensor-type";
import { useState } from "react";

interface iNodeDetails {
    node: iTreeBranch
    onFocus: boolean
}



export default function NodedDetails({ node, onFocus = false }: iNodeDetails) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    function togleOpen() {
        setIsOpen(!isOpen)
    }
    return (<div>
        <div onClick={togleOpen} className="flex flex-row cursor-pointer text-sm mb-1 gap-1">
            {hasChildren && (isOpen ? <img className="ml-1" src={DownArrow} /> : <img className="ml-1" src={OpenArrow} />)}
            <SummaryType node={node} onFocus={onFocus} />
        </div>
        <div className="ml-8">
            {hasChildren && isOpen && (
                <div className="relative">
                    <span className="-left-6 absolute border-l-2 border-black border-opacity-5 h-full"/>
                    {node.children!.map((child) => (
                        <NodedDetails key={child.id} node={child} onFocus={false} />
                    ))}
                </div>
            )}
        </div>
    </div>)
}

interface iSummaryType {
    node: iTreeBranch
    onFocus: boolean
}

function SummaryType({ node, onFocus = false }: iSummaryType) {
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
            <div className="flex flex-row items-center gap-1">
                <Codepen onFocus={onFocus} />
                <p className="ml-1 text-sm text-node-font">{node.name}</p>
                <SensorType status={node.status!} sensorType={node.sensorType!} />
            </div>
        )
    }
}