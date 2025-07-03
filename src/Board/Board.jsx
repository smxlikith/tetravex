import "./Board.css";
import React, { useEffect, useState } from "react";
import { validMove } from "../../lib/moveLogic"; 
import BlockElement from "./BlockElement";
import EmptySlot from "./EmptySlot";

import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	closestCenter,
	DragOverlay,
} from "@dnd-kit/core";

class Block {
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

function generateBlocks(size) {
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

function shuffleBoard(board) {
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

function Board({ size }) {
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

	const [gameState, setGameState] = useState([]);
	const [activeElement, setActiveElement] = useState(null);
	const [solution, setSolution] = useState([]);
	const [shuffled, setShuffled] = useState([]);

	useEffect(() => {
		const Empty = Array.from({ length: size }, () =>
			Array.from({ length: size }).fill(null)
		);
		setGameState(Empty);
		const blocks = generateBlocks(size);
		setSolution(blocks);
		setShuffled(shuffleBoard(blocks));
	}, [size]);

	function handleDragStart(event) {
		setActiveElement({
			id: event.active.id,
			data: event.active.data.current,
		});
	}


	function handleDragEnd(event) {
		const { active, over } = event;
		const block = active.data.current;
		const toSlot = over.id.split("_")[0];
		const { row: blockRow, col: blockCol } = block.pos;
		const [slotRow, slotCol] = over.id
			.split("_")[2]
			.split("")
			.map((el) => parseInt(el));

		console.log(block);
		console.log(toSlot, block.board);

		if (!over) return;
		if (block.board == toSlot && slotRow == blockRow && slotCol == blockCol)
			return;

		if (toSlot == "shuffled") {
			if (block.board == "shuffled") {
				console.log("shuffle->shuffle");
				setShuffled((prev) => {
					const updated = [...prev];

					if (updated[slotRow][slotCol])
						updated[slotRow][slotCol].pos = { row: blockRow, col: blockCol };
					if (updated[blockRow][blockCol])
						updated[blockRow][blockCol].pos = { row: slotRow, col: slotCol };

					[updated[slotRow][slotCol], updated[blockRow][blockCol]] = [
						updated[blockRow][blockCol],
						updated[slotRow][slotCol],
					];

					return updated;
				});
			} else {
				// from game to shuffled
				const shuffleBlock = shuffled[slotRow][slotCol];
				const gameBlock = gameState[blockRow][blockCol];
				console.log("game->shuffled");

				if (
					validMove(gameState, { row: slotRow, col: slotCol }, shuffleBlock)
				) {
					if (shuffleBlock) {
						shuffleBlock.board = "game";
						shuffleBlock.pos = { row: blockRow, col: blockCol };
					}
					if (gameBlock) {
						gameBlock.board = "shuffled";
						gameBlock.pos = { row: slotRow, col: slotCol };
					}

					setGameState((prev) => {
						const updated = [...prev];
						updated[blockRow][blockCol] = shuffleBlock;
						console.log("after update, game: ", updated);
						return updated;
					});

					setShuffled((prev) => {
						const updated = [...prev];
						updated[slotRow][slotCol] = gameBlock;
						console.log("shuffled: ", updated);
						return updated;
					});
				}
			}
		} else if (toSlot == "game") {
			if (block.board == "game") {
				console.log("game->game");
				// from game to game
				if (validMove(gameState, { row: slotRow, col: slotCol }, block)) {
					setGameState((prev) => {
						const updated = [...prev];
						if (updated[slotRow][slotCol])
							updated[slotRow][slotCol].pos = { row: blockRow, col: blockCol };
						if (updated[blockRow][blockCol])
							updated[blockRow][blockCol].pos = { row: slotRow, col: slotCol };

						[updated[slotRow][slotCol], updated[blockRow][blockCol]] = [
							updated[blockRow][blockCol],
							updated[slotRow][slotCol],
						];
						console.log(updated);
						return updated;
					});
				}
			} else {
				// from shuffled to game
				console.log("shuffle->game");
				if (validMove(gameState, { row: slotRow, col: slotCol }, block)) {
					const shuffleBlock = shuffled[blockRow][blockCol];
					const gameBlock = gameState[slotRow][slotCol];
					if (shuffleBlock) {
						shuffleBlock.board = "game";
						shuffleBlock.pos = { row: slotRow, col: slotCol };
					}
					if (gameBlock) {
						gameBlock.board = "shuffled";
						gameBlock.pos = { row: blockRow, col: blockCol };
					}
					setGameState((prev) => {
						const updated = [...prev];
						updated[slotRow][slotCol] = shuffleBlock;
						console.log("game: ", updated);
						return updated;
					});

					setShuffled((prev) => {
						const updated = [...prev];
						updated[blockRow][blockCol] = gameBlock;
						console.log("shuffled: ", updated);
						return updated;
					});
				}
			}
		}
		setActiveElement(null);
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="main-container">
				<div className="col-container">
					{gameState.map((blocks, i) => (
						<div className="row-container" id={`game_row_${i}`}>
							{blocks.map((block, j) => (
								<EmptySlot id={`game_slot_${i}${j}`}>
									{block ? <BlockElement id={block.bid} {...block} /> : null}
								</EmptySlot>
							))}
						</div>
					))}
				</div>
				<div id="seperator">◀</div>
				<div className="col-container">
					{shuffled.map((blocks, i) => (
						<div className="row-container" id={`shuffle_row_${i}`}>
							{blocks.map((block, j) => (
								<EmptySlot id={`shuffled_slot_${i}${j}`}>
									{block ? <BlockElement id={block.bid} {...block} /> : null}
								</EmptySlot>
							))}
						</div>
					))}
				</div>
			</div>
			<DragOverlay>
				{activeElement && (
					<BlockElement id={activeElement.id} {...activeElement.data} />
				)}
			</DragOverlay>
		</DndContext>
	);
}

export default Board;
