import type { ReactElement } from "react";

interface itemsProp{
    startIcon: ReactElement;
    title: string;
}

export function SidebarItem(props: itemsProp){
    
    return(
        <div className="flex gap-4 cursor-pointer">
            <span>
                {props.startIcon}
            </span>
            <span>
                {props.title}
            </span>
        </div>
    )
}