import { ReactNode } from "@tanstack/react-router";

interface iSecundaryButton {
    isActivated: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    children: ReactNode;
    criteria: "sensorType" | "status"
}

export default function SecundaryButton({ isActivated = false, children, onClick , criteria }: iSecundaryButton) {
    return (
        <button onClick={onClick} className={"border border-solid font-semibold text-sm px-[15px] py=[5px] flex flex-row items-center gap-[6px] md:py-[5px] md:px-[15px] lg:py-[7px] lg:px-[15px] " + (isActivated ? "border-blue-500 bg-blue-500 text-white hover:bg-opacity-70" : " bg-white border-gray-200 text-gray-600 hover:border-blue-500")} >
            { criteria == "sensorType" ? 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9999 5.27216H10.0659L13.6034 0.802516C13.6767 0.707874 13.6106 0.570374 13.4909 0.570374H6.64273C6.59273 0.570374 6.54451 0.597159 6.51951 0.641802L1.89273 8.63287C1.83737 8.72752 1.90523 8.84716 2.01594 8.84716H5.13023L3.5338 15.2329C3.49987 15.3722 3.66773 15.4704 3.7713 15.3704L14.0981 5.5168C14.1909 5.4293 14.1284 5.27216 13.9999 5.27216ZM5.61059 11.9364L6.68737 7.63287H3.87666L7.26237 1.78645H11.2731L7.55344 6.48823H11.3213L5.61059 11.9364Z" fill={isActivated ? "#ffffff" : "#2188FF"} />
                </svg> 
                    : 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1C4.13437 1 1 4.13437 1 8C1 11.8656 4.13437 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13437 11.8656 1 8 1ZM8 13.8125C4.79063 13.8125 2.1875 11.2094 2.1875 8C2.1875 4.79063 4.79063 2.1875 8 2.1875C11.2094 2.1875 13.8125 4.79063 13.8125 8C13.8125 11.2094 11.2094 13.8125 8 13.8125Z" fill={isActivated ? "#ffffff" : "#2188FF"} />
                    <path d="M7.24976 10.75C7.24976 10.9489 7.32877 11.1397 7.46943 11.2803C7.61008 11.421 7.80084 11.5 7.99976 11.5C8.19867 11.5 8.38943 11.421 8.53009 11.2803C8.67074 11.1397 8.74976 10.9489 8.74976 10.75C8.74976 10.5511 8.67074 10.3603 8.53009 10.2197C8.38943 10.079 8.19867 10 7.99976 10C7.80084 10 7.61008 10.079 7.46943 10.2197C7.32877 10.3603 7.24976 10.5511 7.24976 10.75ZM7.62476 9H8.37476C8.44351 9 8.49976 8.94375 8.49976 8.875V4.625C8.49976 4.55625 8.44351 4.5 8.37476 4.5H7.62476C7.55601 4.5 7.49976 4.55625 7.49976 4.625V8.875C7.49976 8.94375 7.55601 9 7.62476 9Z" fill={isActivated ? "#ffffff" : "#2188FF"} />
                </svg>
            }
            {children}
        </button>
    )
}

