import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import './index.css';
import { RobotDataType } from './types';
import { backendURL } from './utils/config';

function App() {
	const [robots, setRobots] = useState<RobotDataType[]>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchRobotsData = async () => {
			setLoading(true); // Start loading
			try {
				const res = await fetch(backendURL);
				const data = (await res.json()) as RobotDataType[];
				setRobots(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false); // Stop loading after the request completes
			}
		};

		fetchRobotsData();

		// const intervalId = setInterval(fetchRobotsData, 5000);

		// return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 flex justify-center items-center">
			{loading ? (
				<div className="text-xl font-semibold">Loading...</div>
			) : robots ? (
				<Dashboard robots={robots} />
			) : (
				<div>No Robots Found</div>
			)}
		</div>
	);
}

export default App;
