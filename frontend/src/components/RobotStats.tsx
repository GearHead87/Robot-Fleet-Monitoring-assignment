import { useEffect, useState } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { RobotDataType } from '../types';
import { backendURL } from '../utils/config';

const RobotStats = () => {
	const [robots, setRobots] = useState<RobotDataType[]>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(backendURL);
				const data = (await res.json()) as RobotDataType[];
				if (Array.isArray(data)) {
					setRobots(data);
				} else {
					console.error('Invalid data format', data);
				}
			} catch (error) {
				console.error('Error fetching robots data:', error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="p-4">
			<h2 className="text-xl font-semibold mb-4">System Statistics</h2>
			<div className="w-full h-[400px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={robots} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="Robot ID" tickFormatter={(value) => value.slice(0, 8)} />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Battery Percentage" fill="#82ca9d" name="Battery %" />
						<Bar dataKey="CPU Usage" fill="#8884d8" name="CPU Usage %" />
						<Bar dataKey="RAM Consumption" fill="#ffc658" name="RAM (MB)" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default RobotStats;
