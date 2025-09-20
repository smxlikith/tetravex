
export class Block {
	constructor({
		top = this.generateNumber(),
		bottom = this.generateNumber(),
		left = this.generateNumber(),
		right = this.generateNumber(),
	} = {}) {
		this.top = top;
		this.bottom = bottom;
		this.left = left;
		this.right = right;
	}
	generateNumber() {
		return Math.floor(Math.random() * 10);
	}
}

export function generateBlocks(size) {
	const blocks = [];
	for (let i = 0; i < size; i++) {
		const block = [];
		for (let j = 0; j < size; j++) {
			if (i == 0) {
				if (j == 0) {
					block.push(new Block());
				} else {
					block.push(new Block({ left: block[block.length - 1].right }));
				}
			} else {
				if (j == 0) {
					block.push(new Block({ top: blocks[i - 1][j].bottom }));
				} else {
					block.push(
						new Block({
							top: blocks[i - 1][j].bottom,
							left: block[block.length - 1].right,
						})
					);
				}
			}
		}
		blocks.push(block);
	}
	return blocks;
}

export function shuffleBoard(board) {
	const flat = board.flat();
	const size = board.length;

	for (let i = flat.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[flat[i], flat[j]] = [flat[j], flat[i]];
	}

	const n_flat = flat.map((block, idx) => {
		return {
			...block,
			bid: idx,
			pos: { row: Math.floor(idx / size), col: idx % size },
			board: "shuffled",
		};
	});

	const shuffled2D = [];
	for (let i = 0; i < size; i++) {
		shuffled2D.push(n_flat.slice(i * size, (i + 1) * size));
	}

	return shuffled2D;
}

export function deepCopyState(board) {
    return board.map(row =>
        row.map(block => 
            block 
                ? Object.assign(Object.create(Object.getPrototypeOf(block)), block) 
                : null
        )
    );
}