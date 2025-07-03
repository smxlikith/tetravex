import React from "react";
import "./BlockElement.css";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

const color = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
	6: "six",
	7: "seven",
	8: "eight",
	9: "nine",
	0: "zero",
};

function BlockElement(props) {
	const { top = 6, right = 6, bottom = 4, left = 9, bid = null, pos = {row: -1, col: -1}, board = "shuffled"} = props;
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: props.id,
		data: {
			bid: bid,
			top: top,
			bottom: bottom,
			left: left,
			right: right,
			pos: pos,
			board: board,
		},
	});
	const style = {
		transform: CSS.Translate.toString(transform),
	};

	return (
		<div
			className="grid-container"
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
		>
			<div className={`triangle top ${color[top]}`}>
				<span className="label" style={{ top: "25%", left: "50%" }}>
					{top}
				</span>
			</div>
			<div className={`triangle right ${color[right]}`}>
				<span className="label" style={{ top: "50%", left: "75%" }}>
					{right}
				</span>
			</div>
			<div className={`triangle bottom ${color[bottom]}`}>
				<span className="label" style={{ top: "75%", left: "50%" }}>
					{bottom}
				</span>
			</div>
			<div className={`triangle left ${color[left]}`}>
				<span className="label" style={{ top: "50%", left: "25%" }}>
					{left}
				</span>
			</div>
		</div>
	);
}

export default BlockElement;
