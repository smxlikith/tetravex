import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./EmptySlot.css"

function EmptySlot(props) {
	const { isOver, setNodeRef } = useDroppable({
		id: props.id,
	});

	const style = {
		opacity: isOver || props.children ? 1 : 0.5,
	};

	return (
		<div ref={setNodeRef} style={style} className="slot">
                {props.children}
		</div>
	);
}

export default EmptySlot;