import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { RobotDataType } from '../types';
import React from 'react';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Properly reset icon URLs
L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

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

	return (
		<div className="h-[500px] w-full">
			<h2 className="text-xl font-semibold mb-4">Robot Locations</h2>
			<div className="h-full w-full rounded-lg overflow-hidden">
				<MapContainer
					center={mapCenter}
					zoom={13}
					style={{ height: '100%', width: '100%' }}
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
								>
									<Popup>
										<div className="text-sm">
											<h3 className="font-bold">
												Robot {robot['Robot ID'].slice(0, 8)}
											</h3>
											<p>Battery: {robot['Battery Percentage']}%</p>
											<p>
												Status:{' '}
												{robot['Online/Offline'] ? 'Online' : 'Offline'}
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
