function isNeighbor(bRow, bCol, tRow, tCol) {
	const rowDiff = tRow - bRow;
	const colDiff = tCol - bCol;
	if ((rowDiff == 0 || colDiff == 0) && rowDiff <= 1 && colDiff <= 1) {
		if (rowDiff == 0) {
			if (colDiff == 1) {
				return 1;
			}
			if (colDiff == -1) {
				return 3;
			}
		} else {
			if (rowDiff == 1) {
				return 2;
			}
			if (rowDiff == -1) {
				return 4;
			}
		}
	}
	return -1;
}

function getNeighbors(board, { row, col }, block) {
	const size = board.length;
	const neighbor = block.board == "shuffled" ? -1 : isNeighbor(block.pos.row, block.pos.col, row, col);
	const neighbors = { top: null, bottom: null, left: null, right: null };
	// top
	if (row - 1 >= 0) {
		if (neighbor == 2) {
			if (board[row][col] != null) {
				neighbors.top = board[row][col].bottom;
			}
		} else {
			if (board[row - 1][col] != null) {
				neighbors.top = board[row - 1][col].bottom;
			}
		}
	}
	// bottom
	if (row + 1 < size) {
		if (neighbor == 4) {
			if (board[row][col] != null) {
				neighbors.bottom = board[row][col].top;
			}
		} else {
			if (board[row + 1][col] != null) {
				neighbors.bottom = board[row + 1][col].top;
			}
		}
	}
	// left
	if (col - 1 >= 0) {
		if (neighbor == 1) {
			if (board[row][col] != null) {
				neighbors.left = board[row][col].right;
			}
		} else {
			if (board[row][col - 1] != null) {
				neighbors.left = board[row][col - 1].right;
			}
		}
	}
	// right
	if (col + 1 < size) {
		if (neighbor == 3) {
			if (board[row][col] != null) {
				neighbors.right = board[row][col].left;
			}
		} else {
			if (board[row][col + 1] != null) {
				neighbors.right = board[row][col + 1].left;
			}
		}
	}
	return neighbors;
}

function validNeighbors(neighbors, block) {
	for (let key of Object.keys(neighbors)) {
		if (neighbors[key] != null && neighbors[key] != block[key]) {
			return false;
		}
	}
	return true;
}

export function validMove(board, { row, col }, block) {
	if (board[row][col] == null) {
		return validNeighbors(getNeighbors(board, { row, col }, block), block);
	} else {
		const fromBlock = block;
		const toBlock = board[row][col];
		const toBlockNeighbours = getNeighbors(board, toBlock.pos, fromBlock);
		if (fromBlock.board == toBlock.board) {
			const fromBlockNeighbours = getNeighbors(board, fromBlock.pos, toBlock);
			return (
				validNeighbors(toBlockNeighbours, fromBlock) &&
				validNeighbors(fromBlockNeighbours, toBlock)
			);
		} else {
			return validNeighbors(toBlockNeighbours, fromBlock);
		}
	}
}