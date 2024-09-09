import { useState } from "react";
import { iTreeBranch, iTreeNodeLocations } from "../interfaces/iTree"
import DownArrow from "../assets/Down.svg"
import OpenArrow from "../assets/OpenArrow.svg"
import GoLocation from "../assets/icons/GoLocation.svg"
import CubeIcon from "../assets/icons/IoCubeOutline.svg"
import Codepen from "../assets/icons/Codepen.png"

interface iDropdownTree {
    node: iTreeBranch
}

export default function DropdownTree({ node }: iDropdownTree) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    function togleOpen() {
        setIsOpen(!isOpen)
    }
    return (
        <div className="ml-4">
            <div onClick={togleOpen} className="flex flex-row cursor-pointer text-sm mb-1">
                {hasChildren && (isOpen ? <img className="ml-1" src={DownArrow} /> : <img className="ml-1" src={OpenArrow} />)}
                {(node.type == "Asset" || node.type == "Location") ?
                    IconNode(node.type, node.name) : ComponentNode(node.sensorType, node.status, false, node.name)
                }
            </div>
            {hasChildren && isOpen && (
                <div>
                    {node.children!.map((child) => (
                        <DropdownTree key={child.id} node={child} />
                    ))}
                </div>
            )}
        </div>
    )
}

function IconNode(type: "Asset" | "Location", NodeText: string) {
    switch (type) {
        case "Asset":
            return (
                <div className="ml-1 flex flex-row gap-1">
                    <img src={CubeIcon} alt="" />
                    <p className="text-sm">{NodeText}</p>
                </div>
            )
        case "Location":
            return (<div className="ml-1 flex flex-row gap-1"><img src={GoLocation} alt="" /><p className="text-sm">{NodeText}</p>
            </div>)
    }
}

function ComponentNode(sensorType: "energy" | "vibration" | null | undefined, status: "operating" | "alert" | null | undefined, isActivated: boolean, NodeText: string) {
    const statusColor = status == "operating" ? "#52C41A" : "#ED3833";
    return (
        <div className="flex flex-row items-center gap-1">
            {isActivated? <img className="ml-1" src={Codepen}/>: <img className="ml-1" src={Codepen}/>}
            <p>{NodeText}</p>
            {sensorType == "vibration" ?
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
                : <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.40167 7.72576H0.593342C0.360008 7.72576 0.187439 7.62125 0.0756332 7.41222C-0.0361724 7.20319 -0.0240196 7.00145 0.112092 6.80701L4.47251 0.536175C4.56973 0.400064 4.69612 0.305273 4.85168 0.2518C5.00723 0.198328 5.16765 0.200759 5.33293 0.259092C5.4982 0.317425 5.61973 0.419509 5.69751 0.565342C5.77529 0.711175 5.80445 0.866731 5.78501 1.03201L5.31834 4.80909H7.57876C7.83154 4.80909 8.00897 4.9209 8.11105 5.14451C8.21313 5.36812 8.18154 5.57715 8.01626 5.77159L3.21834 11.5174C3.1114 11.6438 2.98015 11.7265 2.82459 11.7653C2.66904 11.8042 2.51834 11.7896 2.37251 11.7216C2.22668 11.6535 2.11244 11.549 2.0298 11.4081C1.94716 11.2671 1.91556 11.114 1.93501 10.9487L2.40167 7.72576Z" fill={statusColor} />
                </svg>
            }
        </div>
    )
}