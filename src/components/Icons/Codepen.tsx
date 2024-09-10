interface iCodepen {
    onFocus: boolean;
}

export default function Codepen({ onFocus }: iCodepen) {
    return (
        <svg fill={onFocus ? "white" : "#2188FF"} width="22px" height="22px" viewBox="0 5 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>codepen</title> <path d="M15.96 17.040l-1.68-1.16 1.68-1.28v2.44zM12.88 14.84l-3.2-2.28v-3.72l5.72 4.040-2.52 1.96zM8.8 17.92l-2.64-2.040 2.64-1.88 2.64 1.88-2.64 2.040zM7.96 12.56l-3.2 2.28-2.52-1.92 5.72-4.040v3.68zM1.68 14.6l1.68 1.28-1.68 1.16v-2.44zM4.72 16.92l3.24 2.48v3.64l-5.72-4.36 2.48-1.76zM9.64 19.4l3.24-2.48 2.48 1.76-5.72 4.36v-3.64zM8.16 6.56l-7.68 5.56c-0.28 0.2-0.48 0.56-0.48 0.92v5.6c0 0.36 0.16 0.68 0.44 0.92l7.68 5.88c0.4 0.32 0.96 0.32 1.4 0l7.68-5.88c0.28-0.2 0.44-0.56 0.44-0.92v-5.6c0-0.36-0.16-0.72-0.48-0.92l-7.68-5.56c-0.4-0.28-0.92-0.28-1.32 0z"></path> </g></svg>
    )
}