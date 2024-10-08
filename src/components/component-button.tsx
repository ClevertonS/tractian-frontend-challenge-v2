import { useEffect, useState } from "react";
import { iTreeBranch } from "../interfaces/iTree";
import Codepen from "./Icons/Codepen";
import SensorType from "./Icons/sensor-type";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";

interface iNodeProps {
    node: iTreeBranch
}

export default function ComponentButton({node}: iNodeProps) {
    const { companyId } = useParams({from: '/company/$companyId'});
    const [isCurrentUrlId, setIsCurrentUrlId] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname == `/company/${companyId}/${node.id}`) {
            setIsCurrentUrlId(true)
        } else {
            setIsCurrentUrlId(false)
        }
    }, [companyId, location.pathname, node.id])
    return(
    <button onClick={() => !isCurrentUrlId && navigate({to: `/company/${companyId}/${node.id}`})} className={`flex flex-row items-center w-full gap-1 px-1 py-[1px] text-sm ${ isCurrentUrlId? "bg-blue-500 text-white" : " text-node-font"}`}>
        <Codepen onFocus={isCurrentUrlId} />
        <p className="ml-1 ">{node.name}</p>
        <SensorType status={node.status!} sensorType={node.sensorType!} />
    </button>
    )
}