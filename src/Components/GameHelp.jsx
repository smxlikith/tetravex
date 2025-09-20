import React from "react";
import { Block } from "../../lib/Block";
import BlockElement from "./BlockElement";

export default function GameHelp({ onClose }) {
    const num = Math.floor(Math.random()*10);
	return (
		<div className=" h-[80%] bg-gray-900 text-white rounded-2xl shadow-xl p-6 max-w-lg w-full mx-4 animate-scale-in overflow-scroll no-scrollbar">
			<h1 className="text-3xl font-bold text-yellow-400 mb-4 text-center">
				❓ How to Play Tetravex
			</h1>

			<p className="mb-4 text-gray-200">
				<strong>Tetravex</strong> is a classic puzzle game. You are given a
				square grid of tiles, each tile divided into four sides. Every side has
				a number.
			</p>

			<h2 className="text-xl font-semibold text-cyan-300 mb-2">🎯 Goal</h2>
			<p className="mb-4 text-gray-200">
				Place all the tiles on the board so that all touching edges have the
				same numbers.
			</p>

			<h2 className="text-xl font-semibold text-cyan-300 mb-2">📜 Rules</h2>
			<ul className="list-disc list-inside space-y-2 text-gray-200">
				<li>
					The board is a <strong>grid</strong> (e.g. 3×3).
				</li>
				<li>You must place each tile in an empty slot on the board.</li>
				<li>
					<span className="text-yellow-300 font-semibold">Matching rule:</span>{" "}
					Numbers on touching edges must match.
				</li>
				<li>
					Continue swapping and placing tiles until the board is complete and
					all edges match.
				</li>
				<li>
					The puzzle is solved when <strong>all tiles fit correctly</strong>.
				</li>
			</ul>
			<br />
			<h2 className="text-xl font-semibold text-cyan-300 mb-2">🧩 Example</h2>
			<p className="mb-4 text-gray-200">
				In this example, the blocks fit together because the touching numbers
				match:
			</p>
			<div className="w-full flex justify-center items-center">
				<div className="flex w-[30vw] h-[15vw] gap-3">
					<BlockElement id="ex-1" {...new Block({ right: num })} />
					<BlockElement id="ex-2" {...new Block({ left: num })} />
				</div>
			</div>

			<div className="mt-6 text-center">
				<button onClick={onClose} className="px-5 py-2">
					Got it!
				</button>
			</div>
		</div>
	);
}
