
function isNeighbor(bRow, bCol, tRow, tCol) {
	if (bRow == tRow) {
		if (bCol == tCol - 1 || bCol == tCol + 1) {
			return true;
		}
	}
	if (bCol == tCol) {
		if (bRow == tRow - 1 || bRow == tRow + 1) {
			return true;
		}
	}
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
    const neighbors = getNeighbors(board, { row, col });
	if (block.board == "game") {
		if (!isNeighbor(block.pos.row, block.pos.col, row, col)) {
			console.log("Not a Neighbor");
			if (target != null) {
				console.log(neighbors);
			} else {
				return true;
			}
		} else {
			const blockNeighbor = getNeighbors(board, { row: block.pos.row, col: block.pos.col, });
			if (block.pos.col == col) {
				if (block.pos.row == row - 1) {
					// the block is top of the target slot
					console.log("to the top");
					const toSlotState =
						(neighbors.bottom == null || block.bottom == neighbors.bottom) &&
						(neighbors.left == null || block.left == neighbors.left) &&
						(neighbors.right == null || block.right == neighbors.right);
					if (target != null) {
						console.log(block);
					}
				} else if (block.pos.row == row + 1) {
					console.log("to the bottom");
					if (
						(neighbors.top == null || block.top == neighbors.bottom) &&
						(neighbors.left == null || block.left == neighbors.left) &&
						(neighbors.right == null || block.right == neighbors.right)
					) {
						return true;
					}
				}
			} else if (block.pos.row == row) {
				if (block.pos.col == col + 1) {
					console.log("to the right");
					if (
						(neighbors.top == null || block.top == neighbors.top) &&
						(neighbors.bottom == null || block.bottom == neighbors.bottom) &&
						(neighbors.left == null || block.left == neighbors.left)
					) {
						return true;
					}
				} else if (block.pos.col == col - 1) {
					console.log("to the left");
					if (
						(neighbors.top == null || block.top == neighbors.top) &&
						(neighbors.bottom == null || block.bottom == neighbors.bottom) &&
						(neighbors.right == null || block.right == neighbors.left)
					) {
						return true;
					}
				}
			}
			return false;
		}
	} else {
        if((neighbors.top == null || neighbors.top == block.top)&&
            (neighbors.left == null || neighbors.left == block.left) &&
            (neighbors.right == null || neighbors.right == block.right) &&
            (neighbors.bottom == null || neighbors.bottom == block.bottom)
        ){
            return true;
        }
	}
}
