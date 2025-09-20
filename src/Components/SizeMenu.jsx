import React from "react";
import "./Menu.css";


export default function SizeMenu({changeSize}){
    return(
        <div className=".menu-container flex flex-col items-center justify-center w-xs">
            <button className={"menu-option"} onClick={()=>changeSize(2)}>2 x 2</button>
            <button className={"menu-option "} onClick={()=>changeSize(3)}>3 x 3</button>
            <button className={"menu-option "} onClick={()=>changeSize(4)}>4 x 4</button>
            <button className={"menu-option "} onClick={()=>changeSize(5)}>5 x 5</button>
            <button className={"menu-option "} onClick={()=>changeSize(6)}>6 x 6</button>
        </div>
    );
}