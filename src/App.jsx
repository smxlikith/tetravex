import "./App.css";
import Art from "./Art/Art"
import Board from "./Board";
import Overlay from "./Components/Overlay";
import { useEffect, useState } from "react";

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(()=>{
		const timer = setTimeout(()=>{
			setLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, [])

	return (
		<>
			{
			
				loading ? (
					<Overlay>
						<Art />
					</Overlay>
				) : (
					<Board />
				)
			}
		</>
	);
}

export default App;
