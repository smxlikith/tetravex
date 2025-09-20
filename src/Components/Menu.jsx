import "./Menu.css";
import SizeMenu from "./SizeMenu";
import React, { useState } from "react";
import Overlay from "../Components/Overlay";

export default function GameMenu({
	toggleMenu,
	restGame,
	newGame,
	changeSize,
	showSolution,
}) {
	const [sizeMenu, setSizeMenu] = useState(false);
	function toggleSizeMenu(){
		setSizeMenu((prev)=>!prev);	
	}
	return (
		<>
			{
				sizeMenu ?
				<Overlay zidx={101}>
					<div className="menu-container flex flex-col items-center justify-center w-xs h-[60%]">
						<SizeMenu changeSize={changeSize}></SizeMenu>
						<button className="menu-option my-2" onClick={toggleSizeMenu}>click to close</button>
					</div>
				</Overlay>
				:null
			}
			<div className="menu-container w-xs h-[65%] sm:w-sm">
				<div className="flex flex-col h-[85%] w-full">
					<div className="flex justify-center items-center">
						<h1>Game Menu</h1>
					</div>
					<div className="flex flex-col justify-center items-center">
						<button className="menu-option mx-14 my-1" onClick={newGame}>
							New Game
						</button>
						<button className="menu-option mx-14 my-1" onClick={toggleSizeMenu}>
							Change Size
						</button>
						<button className="menu-option mx-14 my-1" onClick={restGame}>
							Reset
						</button>
						<button className="menu-option mx-14 my-1" onClick={showSolution}>
							Show Solution	
						</button>
						<button className="menu-option mx-14 my-1" onClick={toggleMenu}>
							Resume
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
