import React from 'react';
import RobotList from './RobotList';
import RobotMap from './RobotMap';
import RobotStats from './RobotStats';
import { RobotDataType } from '../types';

interface DashboardProps {
	robots: RobotDataType[];
}

const Dashboard: React.FC<DashboardProps> = ({ robots }) => {
	// const [error, setError] = useState('');

	// const initializeWebSocket = () => {
	// 	const websocket = new WebSocket('ws://localhost:8000/ws');

	// 	websocket.onopen = () => {
	// 		console.log('WebSocket connection established.');
	// 	};

	// 	websocket.onmessage = (event) => {
	// 		try {
	// 			const updatedData = JSON.parse(event.data);

	// 			setRobots((prevRobots) => {
	// 				if (JSON.stringify(updatedData) !== JSON.stringify(prevRobots)) {
	// 					return updatedData;
	// 				}
	// 				return prevRobots;
	// 			});
	// 		} catch (err) {
	// 			console.error('Error parsing WebSocket message:', err);
	// 		}
	// 	};

	// 	websocket.onerror = (err) => {
	// 		console.error('WebSocket encountered an error:', err);
	// 		setError('WebSocket error occurred. Live updates may not work.');
	// 	};

	// 	websocket.onclose = () => {
	// 		console.log('WebSocket connection closed.');
	// 	};

	// 	return websocket;
	// };

	// useEffect(() => {
	// 	const websocket = initializeWebSocket();

	// 	return () => {
	// 		if (websocket) {
	// 			websocket.close();
	// 			console.log('WebSocket connection terminated.');
	// 		}
	// 	};
	// }, []);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6 text-center mx-auto">
				Robot Fleet Monitoring Dashboard
			</h1>
			{/* {error && <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>} */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Robot List */}
				<div className="bg-white rounded-lg shadow-md">
					<RobotList robots={robots} />
				</div>

				{/* Robot Map */}
				<div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto">
					<RobotMap robots={robots} />
				</div>

				{/* Robot Stats */}
				<div className="bg-white rounded-lg shadow-md p-4 lg:col-span-2">
					<RobotStats />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
