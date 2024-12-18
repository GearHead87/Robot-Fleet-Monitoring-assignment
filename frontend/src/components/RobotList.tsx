import React, { useState } from 'react';
import { Battery, Cpu, MemoryStick } from 'lucide-react';
import { RobotDataType } from '../types';

interface RobotListProps {
	robots: RobotDataType[];
}

const RobotList: React.FC<RobotListProps> = ({ robots }) => {
	const [filter, setFilter] = useState('All');

	const getFilteredRobots = () => {
		switch (filter) {
			case 'Active':
				return robots.filter((robot) => robot['Online/Offline']);
			case 'Offline':
				return robots.filter((robot) => !robot['Online/Offline']);
			case 'Low Battery':
				return robots.filter((robot) => robot['Battery Percentage'] < 20);
			default:
				return robots;
		}
	};

	const filteredRobots = getFilteredRobots();

	return (
		<div className='p-4'>
			<h2 className="text-xl font-semibold mb-4">Robot Status</h2>

			{/* Filter Dropdown */}
			<div className="mb-4">
				<label htmlFor="filter" className="mr-2 font-medium">
					Filter by:
				</label>
				<select
					id="filter"
					className="border rounded px-3 py-1"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					aria-label="Filter Robots"
				>
					<option value="All">All</option>
					<option value="Active">Active</option>
					<option value="Offline">Offline</option>
					<option value="Low Battery">Low Battery</option>
				</select>
			</div>

			{/* Robot Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Robot ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Battery
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								CPU
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								RAM
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Last Updated
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredRobots.map((robot) => (
							<tr
								key={robot['Robot ID']}
								className={`${
									robot['Battery Percentage'] < 20
										? 'bg-red-50'
										: !robot['Online/Offline']
										? 'bg-gray-50'
										: ''
								}`}
							>
								{/* Robot ID */}
								<td className="px-6 py-4 font-mono text-sm">
									{robot['Robot ID'].slice(0, 8)}...
								</td>

								{/* Online/Offline Status */}
								<td className="px-6 py-4">
									<span
										className={`px-2 py-1 text-sm rounded-full ${
											robot['Online/Offline']
												? 'bg-green-100 text-green-800'
												: 'bg-red-100 text-red-800'
										}`}
									>
										{robot['Online/Offline'] ? 'Online' : 'Offline'}
									</span>
								</td>

								{/* Battery Status */}
								<td className="px-6 py-4">
									<div className="flex items-center gap-2">
										<Battery
											className={
												robot['Battery Percentage'] < 20
													? 'text-red-500'
													: 'text-green-500'
											}
										/>
										{robot['Battery Percentage']}%
									</div>
								</td>

								{/* CPU Usage */}
								<td className="px-6 py-4">
									<div className="flex items-center gap-2">
										<Cpu />
										{robot['CPU Usage']}%
									</div>
								</td>

								{/* RAM Consumption */}
								<td className="px-6 py-4">
									<div className="flex items-center gap-2">
										<MemoryStick />
										{robot['RAM Consumption']} MB
									</div>
								</td>

								{/* Last Updated */}
								<td className="px-6 py-4 text-sm text-gray-500">
									{robot['Last Updated']}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{filteredRobots.length === 0 && (
					<p className="text-center text-gray-500 mt-4">
						No robots match the selected filter.
					</p>
				)}
			</div>
		</div>
	);
};

export default RobotList;
