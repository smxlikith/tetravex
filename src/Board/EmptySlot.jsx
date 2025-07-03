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
/*
  		console.log(row, col, board);
		if (block == null) return true;
		//top
		if (
			row - 1 >= 0 &&
			board[row - 1][col] != null &&
			(block.board == "shuffled" || (row - 1 != block.pos.row && col != block.pos.col)) &&
			board[row - 1][col].bottom != block.top
		) {
			console.log("top");
			return false;
		}else if (row - 1 >= 0){
			console.log(board[row - 1][col] != null);
			console.log(block.board == "shuffled" || (row - 1 != block.pos.row && col != block.pos.col))
			console.log(board[row - 1][col] !=null && board[row - 1][col].bottom != block.top);
		}
		// bottom
		if (
			row + 1 < size &&
			board[row + 1][col] != null &&
			(block.board == "shuffled" || (row + 1 != block.pos.row && col != block.pos.col)) &&
			board[row + 1][col].top != block.bottom
		) {
			console.log("bottom");
			return false;
		}
		// right
		if (
			col + 1 < size &&
			board[row][col + 1] != null &&
			(block.board == "shuffled" || (row != block.pos.row && col + 1 != block.pos.col)) &&
			board[row][col + 1].left != block.right
		) {
			console.log("right");
			return false;
		}else if(col + 1)
		// left
		if (
			col - 1 >= 0 &&
			board[row][col - 1] != null &&
			(block.board == "shuffled" || (row != block.pos.row && col - 1 != block.pos.col)) &&
			board[row][col - 1].right != block.left
		) {
			console.log(board[row][col - 1]);
			console.log("left");
			return false;
		}else if(col -1 < size){

			console.log(board[row][col - 1] != null);
			console.log(
				block.board == "shuffled" ||
					(row != block.pos.row && col - 1 != block.pos.col)
			);
			console.log(
				board[row][col - 1] != null && board[row][col - 1].right != block.left
			);
			
		}

		if(board[row][col] != null){
			if(col == block.pos.col){
				if(block.pos.row == row - 1){
					if(block.top != board[row][col].bottom){				
						return false
					}
				} else if (block.pos.row == row + 1){
					if(block.bottom != board[row][col].top){
						return false;
					}
				}
			}
		}
		return true;

*/

export default EmptySlot;