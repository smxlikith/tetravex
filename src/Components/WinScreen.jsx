import "./WinScreen.css";
import Confetti from "react-confetti";
import React, { useEffect, useState } from "react";

export default function WinScreen({ time, topScores, onClose }) {
	return (
		<div>
			<Confetti recycle={false} numberOfPieces={400} />

			<div className="flex  flex-col justify-center items-center h-[65%] bg-zinc-800 rounded-2xl shadow-2xl p-8 text-center max-w-md w-full animate-scale-in">
				<h1 className="text-4xl font-extrabold text-yellow-400 glow-text mb-4">
					🎉 You Win! 🎉
				</h1>

				<p className="text-xl text-cyan-300 font-semibold mb-2">
					Your Time: <span className="time-glow">{time}s</span>
				</p>
				<h3 className="text-yellow-300 text-lg font-semibold mb-2">
					🏆 Top Scores
				</h3>
				<div className="w-[60%] mt-2 text-left overflow-scroll">
					<ol className="list-decimal list-inside space-y-1 text-gray-200">
						{
							topScores.map((s, idx) => (
								<li key={idx} className="flex justify-between">
									<span>{s.name}</span>
									<span className="font-bold">{s.value}</span>
								</li>
							))
						}
					</ol>
				</div>

				<button onClick={onClose} className="mt-6 px-6 py-2">
					Play Again
				</button>
			</div>
		</div>
	);
}
