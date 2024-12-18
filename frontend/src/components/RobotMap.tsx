import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { RobotDataType } from '../types';
import 'leaflet/dist/leaflet.css';

import { Bot, Battery, Zap, AlertCircle } from 'lucide-react';

// Custom icon creation using Lucide icons
const createLucideMarkerIcon = (color: string) => {
	return L.divIcon({
		className: 'custom-div-icon',
		html: `<div style="background-color: ${color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M12 8V4H8"/>
               <rect width="16" height="12" x="4" y="8" rx="2"/>
               <path d="M2 14h2"/>
               <path d="M20 14h2"/>
               <path d="M15 11v2"/>
               <path d="M9 11v2"/>
             </svg>
           </div>`,
		iconSize: [40, 40],
		iconAnchor: [20, 20],
	});
};

interface RobotMapProps {
	robots: RobotDataType[];
}

const RobotMap: React.FC<RobotMapProps> = ({ robots }) => {
	const defaultCenter: [number, number] = [40.7128, -74.006];

	// Safely get map center with type assertion
	const mapCenter: [number, number] =
		robots.length > 0 &&
		robots[0]['Location Coordinates'] &&
		robots[0]['Location Coordinates'].length === 2
			? [robots[0]['Location Coordinates'][0], robots[0]['Location Coordinates'][1]]
			: defaultCenter;

	// Function to determine marker color based on robot status
	const getMarkerColor = (robot: RobotDataType) => {
		if (!robot['Online/Offline']) return '#888888'; // Gray for offline
		return robot['Battery Percentage'] < 20 ? '#FF0000' : '#00FF00'; // Red for low battery, green for active
	};

	return (
		<div className="h-[500px] w-full">
			<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
				<Bot /> Robot Locations
			</h2>
			<div className="h-full w-full rounded-lg overflow-hidden">
				<MapContainer
					center={mapCenter}
					zoom={13}
					style={{ height: '100%', width: '100%' }}
					// scrollWheelZoom={false}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>

					{robots.length > 0 ? (
						robots.map((robot) =>
							robot['Location Coordinates'] &&
							robot['Location Coordinates'].length === 2 ? (
								<Marker
									key={robot['Robot ID']}
									position={robot['Location Coordinates'] as [number, number]}
									icon={createLucideMarkerIcon(getMarkerColor(robot))}
								>
									<Popup>
										<div className="text-sm space-y-2">
											<h3 className="font-bold flex items-center gap-2">
												<Bot />
												Robot {robot['Robot ID'].slice(0, 8)}
											</h3>
											<p className="flex items-center gap-2">
												<Battery
													color={
														robot['Battery Percentage'] < 20
															? 'red'
															: 'green'
													}
												/>
												Battery: {robot['Battery Percentage']}%
											</p>
											<p className="flex items-center gap-2">
												{robot['Online/Offline'] ? (
													<Zap className="text-green-500" />
												) : (
													<AlertCircle className="text-red-500" />
												)}
												Status:{' '}
												{robot['Online/Offline'] ? 'Online' : 'Offline'}
											</p>
											<p>
												Location:{' '}
												{robot['Location Coordinates'][0].toFixed(4)},
												{robot['Location Coordinates'][1].toFixed(4)}
											</p>
										</div>
									</Popup>
								</Marker>
							) : null
						)
					) : (
						<p>No robots data available</p>
					)}
				</MapContainer>
			</div>
		</div>
	);
};

export default RobotMap;
