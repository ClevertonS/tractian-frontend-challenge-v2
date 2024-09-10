import { Link, useLocation} from "@tanstack/react-router";
import GoldenIcon from "../assets/icons/Gold.svg";
import { useEffect, useState } from "react";

interface iHeaderLink{
    to: string,
    companyName: string
}

export default function HeaderLink({companyName, to}: iHeaderLink){
    const location = useLocation();
    const [sameUrl, setSameUrl] = useState<boolean>(false)
    useEffect(() => {
        if (location.pathname.includes(to))
        {
            setSameUrl(true);
        } else {
            setSameUrl(false);
        }
    }, [location.pathname])

    if (sameUrl) 
    {
        return (
            <div className="flex flex-row items-center gap-2 rounded-sm py-[3px] px-[7px] border-solid  border-blue-500 border-[1px] bg-blue-500 text-white md:py-[5px] md:px-[15px] lg:py-[7px] lg:px-[15px]">
                <img src={GoldenIcon} alt="" className="object-contain md:w-4 md:h-4 lg:w-5 lg:h-5"/>
                <p className="font-semibold text-xs md:text-sm lg:text-base">{companyName}</p>
            </div>
        )
    } else {
        return (
            <Link to={to} className="flex flex-row items-center gap-2 rounded-sm py-[3px] px-[7px] border-solid  border-blue-900 border-[1px] bg-blue-900 text-white  transition-colors hover:border-blue-500 hover:text-blue-500 md:py-[5px] md:px-[15px] lg:py-[7px] lg:px-[15px]">
                <img src={GoldenIcon} alt="" className="object-contain md:w-4 md:h-4 lg:w-5 lg:h-5"/>
                <p className="font-semibold text-xs md:text-sm lg:text-base">{companyName}</p>
            </Link>
    )
    }
    
}