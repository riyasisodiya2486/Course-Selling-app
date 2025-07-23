import type { ReactElement } from "react";

interface ButtonProps{
    variant: "primary"|"secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?:()=> void;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

const variantClasses = {
    "primary":" bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] hover:via-purple-700 hover:to-blue-700 text-white transition-all duration-300 shadow-md",
    "secondary": "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-black transition-all duration-300 shadow-sm"

}
const defaultStyles = "font-bold px-4 py-2 rounded-2xl  flex items-center justify-center space-x-2";

export function Button(props: ButtonProps){

    return <button onClick={props.onClick} className={`${variantClasses[props.variant]}
     ${defaultStyles} ${props.fullWidth ? " w-full flex justify-center items-center" : ""}
     ${props.loading? "opacity-45": ""}`} disabled={props.loading} >
        <div className="pr-2">
            {props.startIcon}
        </div>
        {props.text}
    </button>
}