import "./Board.css";
import Grid from "./Components/Grid";
import Timer from "./Components/Timer";
import GameMenu from "./Components/Menu";
import Overlay from "./Components/Overlay";
import GameHelp from "./Components/GameHelp";
import { validMove } from "../lib/moveLogic";
import WinScreen from "./Components/WinScreen";
import React, { useEffect, useState } from "react";
import BlockElement from "./Components/BlockElement";
import { Pause, Play, Menu, HelpCircle } from "lucide-react";
import { generateBlocks, shuffleBoard, deepCopyState } from "../lib/Block";

import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	closestCenter,
	DragOverlay,
} from "@dnd-kit/core";

function Board() {
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

	const [size, setSize] = useState(3);
	const [hasWon, setHasWon] = useState(false);

	const [running, setRunning] = useState(true);
	const [resetSignal, setResetSignal] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [showMenu, setShowMenu] = useState(false);
	const [showHelp, setShowHelp] = useState(false);

	const [gameState, setGameState] = useState([]);
	const [solution, setSolution] = useState([]);
	const [shuffled, setShuffled] = useState([]);
	const [startState, setStartState] = useState([]);

	const [activeElement, setActiveElement] = useState(null);
	const [showSolution, setShowSolution] = useState(false);
	const [disableDrag, setDisableDrag] = useState(false);

	const Empty = Array.from({ length: size }, () =>
		Array.from({ length: size }).fill(null)
	);

	useEffect(() => {
		startNewGame();
	}, [size]);

	function startNewGame() {
		setGameState(Empty);
		const blocks = generateBlocks(size);
		const shuffledBlocks = shuffleBoard(blocks);
		setSolution(blocks);
		setShuffled(shuffledBlocks);
		setStartState(deepCopyState(shuffledBlocks));
		setResetSignal((r) => r + 1);
		setShowMenu(false);
		setRunning(true);
		setDisableDrag(false);
		setHasWon(false);
		setShowSolution(false);
	}

	function checkGameWin() {
		let currBlocks = gameState.flat().reduce((prev, curr) => {
			if (curr != null) {
				prev += 1;
			}
			return prev;
		}, 0);
		if (currBlocks / size == size && !hasWon) {
			setRunning(false);
			setDisableDrag(true);
			setHasWon(true);
		}
	}

	function toggleTimer() {
		if (!hasWon && !showSolution) {
			setRunning((prev) => !prev);
		}
	}

	function toggleGameHelp() {
		toggleTimer();
		setShowHelp((prev) => !prev);
	}

	function toggleGameMenu() {
		toggleTimer();
		setShowMenu((prev) => !prev);
	}

	function resetBoard() {
		setGameState(Empty);
		setShuffled(deepCopyState(startState));
		toggleGameMenu();
	}

	function handleShowSolution() {
		setShowSolution(true);
		setRunning(false);
		setDisableDrag(true);
		setShowMenu(false);
	}

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

		if (!over) return;
		if (block.board == toSlot && slotRow == blockRow && slotCol == blockCol) return;

		if (toSlot == "shuffled") {
			if (block.board == "shuffled") {
				setShuffled((prev) => {
					const updated = deepCopyState(prev);

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
				if ( shuffleBlock == null || validMove(gameState, { row: slotRow, col: slotCol }, shuffleBlock)) {
					if (shuffleBlock) {
						shuffleBlock.board = "game";
						shuffleBlock.pos = { row: blockRow, col: blockCol };
					}
					if (gameBlock) {
						gameBlock.board = "shuffled";
						gameBlock.pos = { row: slotRow, col: slotCol };
					}

					setGameState((prev) => {
						const updated = deepCopyState(prev);
						updated[blockRow][blockCol] = shuffleBlock;
						return updated;
					});

					setShuffled((prev) => {
						const updated = deepCopyState(prev);
						updated[slotRow][slotCol] = gameBlock;
						return updated;
					});
				}
			}
		} else if (toSlot == "game") {
			if (block.board == "game") {
				// from game to game
				if (validMove(gameState, { row: slotRow, col: slotCol }, block)) {
					setGameState((prev) => {
						const updated = deepCopyState(prev);
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
				}
			} else {
				// from shuffled to game
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
						const updated = deepCopyState(prev);
						updated[slotRow][slotCol] = shuffleBlock;
						return updated;
					});

					setShuffled((prev) => {
						const updated = deepCopyState(prev);
						updated[blockRow][blockCol] = gameBlock;
						return updated;
					});
				}
			}
		}
		setActiveElement(null);
	}

	checkGameWin();

	return (
		<div className="board-container">
			{showHelp ? (
				<Overlay zidx={100}>
					<GameHelp onClose={toggleGameHelp} />
				</Overlay>
			) : null}
			{hasWon ? (
				<Overlay zidx={101} blur={2} delay={500}>
					<WinScreen time={seconds} size={size} onClose={startNewGame} />
				</Overlay>
			) : null}
			{!running && !showMenu && !hasWon && !showSolution && !showHelp ? (
				<Overlay>
					<div className="flex items-center justify-center">
						<button className="mx-2" onClick={toggleTimer}>
							<Play size={26} />
						</button>
						<button
							className="mx-2"
							onClick={() => {
								setShowMenu((prev) => !prev);
							}}
						>
							<Menu size={26} />
						</button>
					</div>
				</Overlay>
			) : null}
			{showMenu ? (
				<Overlay>
					<GameMenu
						showSolution={handleShowSolution}
						toggleMenu={toggleGameMenu}
						restGame={resetBoard}
						changeSize={setSize}
						newGame={startNewGame}
					/>
				</Overlay>
			) : null}
			<Timer
				running={running}
				resetSignal={resetSignal}
				seconds={seconds}
				setSeconds={setSeconds}
			/>
			<div className="flex justify-between">
				<button className="p-2" onClick={toggleTimer}>
					<Pause />
				</button>
				<button className="p-2 mx-2" onClick={toggleGameMenu}>
					<Menu />
				</button>
				<button className="p-2 text-lg font-bold" onClick={toggleGameHelp}>
					<HelpCircle />
				</button>
			</div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className="flex flex-col sm:flex-row justify-center content-center">
					<Grid
						state={showSolution ? solution : gameState}
						grid_name={"game"}
						disabled={disableDrag}
					/>
					<div id="seperator"></div>
					<Grid
						state={showSolution ? Empty : shuffled}
						grid_name={"shuffled"}
						disabled={disableDrag}
					/>
				</div>
				<DragOverlay>
					{activeElement && (
						<div className="w-full h-full aspect-square">
							<BlockElement id={activeElement.id} {...activeElement.data} />
						</div>
					)}
				</DragOverlay>
			</DndContext>
		</div>
	);
}

export default Board;
