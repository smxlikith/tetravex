function isNeighbor(bRow, bCol, tRow, tCol, direction) {
	console.log(bRow, bCol, tRow, tCol, direction);
	if (bRow == tRow) {
		console.log("same row")
		if ((bCol == tCol - 1 || bCol == tCol + 1) && direction == "x") {
			console.log("same col up or down")
			return true;
		}
	}
	if (bCol == tCol) {
		console.log("same col")
		if ((bRow == tRow - 1 || bRow == tRow + 1) && direction == "y") {
			console.log("same row left or right")
			return true;
		}
	}
	return false;
}

function getNeighbors(board, { row, col }) {
	const size = board.length;
	return {
		top:
			row - 1 >= 0
				? board[row - 1][col] != null
					? board[row - 1][col].bottom
					: null
				: null,
		bottom:
			row + 1 < size
				? board[row + 1][col] != null
					? board[row + 1][col].top
					: null
				: null,
		left:
			col - 1 >= 0
				? board[row][col - 1] != null
					? board[row][col - 1].right
					: null
				: null,
		right:
			col + 1 < size
				? board[row][col + 1] != null
					? board[row][col + 1].left
					: null
				: null,
	};
}

export function validMove(board, { row, col }, block) {
	if (block == null) return true;
	const target = board[row][col];
	const targetNeighbors = getNeighbors(board, { row, col });
	if (block.board == "game") {
		console.log("this is the game board's logic");
		if (
			(targetNeighbors.top == null || targetNeighbors.top == block.top) &&
			(targetNeighbors.left == null || targetNeighbors.left == block.left) &&
			(targetNeighbors.right == null || targetNeighbors.right == block.right) &&
			(targetNeighbors.bottom == null || targetNeighbors.bottom == block.bottom)
		) {
			console.log("targetNe: ", targetNeighbors);
			console.log("block: ", block);
			return true;
		}
		if (target != null) {
			const blockNeighbors = getNeighbors(board, {
				row: block.pos.row,
				col: block.pos.col,
			});
			console.log("the block", blockNeighbors);
		} else {
			console.log("target is null");
			console.log(targetNeighbors);
			if(targetNeighbors.top != null && !isNeighbor(block.pos.row, block.pos.col, row, col, "y")){
				if(targetNeighbors.top != block.top){
					console.log("the top value rejected it...")
					return false;
				}
			}
			if(targetNeighbors.bottom != null && !isNeighbor(block.pos.row, block.pos.col, row, col, "y")){
				if(targetNeighbors.bottom != block.bottom){
					console.log("the bottom value rejected it...")
					return false;
				}
			}
			if(targetNeighbors.right != null && !isNeighbor(block.pos.row, block.pos.col, row, col, "x")){
				if(targetNeighbors.right != block.right){
					console.log("the right value rejected it...")
					return false;
				}
			}
			if(targetNeighbors.left != null && !isNeighbor(block.pos.row, block.pos.col, row, col, "x")){
				if(targetNeighbors.left!= block.left){
					console.log("the left value rejected it...")
					return false;				
				}
			}
			return true;
		}
	} else {
		if (
			(targetNeighbors.top == null || targetNeighbors.top == block.top) &&
			(targetNeighbors.left == null || targetNeighbors.left == block.left) &&
			(targetNeighbors.right == null || targetNeighbors.right == block.right) &&
			(targetNeighbors.bottom == null || targetNeighbors.bottom == block.bottom)
		) {
			return true;
		}
	}
}
