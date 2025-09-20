import React, { useState, useEffect} from "react";
import "./Overlay.css"

export default function Overlay({zidx=100, delay=0, blur=10, children}){
	const [show, setShow] = useState(false);

	useEffect(()=>{
		const timer = setTimeout(() => setShow(true), delay);
		return () => clearTimeout(timer);
	}, [delay])
	
	if(!show) return null
    return(
        <div className={`overlay-container`} style={{zIndex:zidx, backdropFilter:`blur(${blur}px)`}}>
           {children} 
        </div>
    ) ;
}