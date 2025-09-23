import "./WinScreen.css";
import Confetti from "react-confetti";
import React, { useState } from "react";
import {
	formatTime,
	formatRelativeTime,
	getTopScores,
	saveScore,
	getPrevUserName,
	setPrevUsername,	
} from "../../lib/utils";

export default function WinScreen({ time, size, onClose }) {
	const topScores = getTopScores(size);
	const previousUsername = getPrevUserName();
	const [username, setUsername] = useState(previousUsername);

	const handleSave = () => {
		const trimmed = username.trim();
		if (!trimmed) return;
		saveScore(trimmed, time, size);
		setPrevUsername(trimmed);	
		setUsername(trimmed);
		onClose();
	};

	return (
		<div>
			<Confetti recycle={false} numberOfPieces={400} />

			<div className="flex flex-col justify-center items-center h-[65%] bg-zinc-800 rounded-2xl shadow-2xl p-8 text-center max-w-md w-full animate-scale-in">
				<h1 className="text-4xl font-extrabold text-yellow-400 glow-text mb-4">
					🎉 You Win! 🎉
				</h1>

				<p className="text-xl text-cyan-300 font-semibold mb-4">
					Your Time: <span className="time-glow">{formatTime(time)}</span>
				</p>

				<div className="flex items-center mb-4 w-full justify-center gap-2">
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Your name"
						maxLength={10}
						className="w-[40%] flex bg-transparent border-b-2 border-dotted border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 px-2 py-1 text-center font-bold"
					/>
					<button
						onClick={handleSave}
						className="px-4 py-1 rounded-lg font-bold"
					>
						Save
					</button>
				</div>

				<h3 className="text-yellow-300 text-lg font-semibold mb-2">
					🏆 Top Scores
				</h3>
				<div className="size-max mt-2 text-left overflow-scroll no-scrollbar">
					<ol className="list-decimal list-inside space-y-1 text-gray-200">
						{topScores.map((s, idx) => (
							<li key={idx} className="flex justify-between gap-5">
								<span className="font-bold">{s.name}</span>
								<span className="font-bold">{formatTime(s.time)}</span>
								<span className="">{formatRelativeTime(s.timestamp)}</span>
							</li>
						))}
					</ol>
				</div>

				<button onClick={onClose} className="mt-6 px-6 py-2">
					Play Again
				</button>
			</div>
		</div>
	);
}
