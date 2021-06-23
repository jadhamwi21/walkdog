import React, { useRef, useState, useEffect } from "react";
import Styles from "../BorrowerInterface.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LeafletMapPathRouting from "./LeafletMapPathRouting";
import Legend from "./Legend.js";
const LeafletMap = ({ OwnerPosition, BorrowerPosition }) => {
	const [position, setPosition] = useState([
		BorrowerPosition.Latitude,
		BorrowerPosition.Longitude,
	]);
	const FlyToOwnerPosition = () => {
		setPosition([OwnerPosition.Latitude, OwnerPosition.Longitude]);
	};
	const FlyToBorrowerPosition = () => {
		setPosition([BorrowerPosition.Latitude, BorrowerPosition.Longitude]);
	};
	const MapRef = useRef();
	useEffect(() => {
		if (MapRef.current) {
			MapRef.current.flyTo(position, 18);
		}
	}, [position]);
	return (
		<MapContainer
			center={position}
			scrollWheelZoom={true}
			className={Styles.MapWrapper}
			zoom={18}
			style={{ margin: "30px auto" }}
			whenCreated={(map) => (MapRef.current = map)}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker
				position={[BorrowerPosition.Latitude, BorrowerPosition.Longitude]}
			>
				<Popup>This Is Your Location</Popup>
			</Marker>
			<Marker position={[OwnerPosition.Latitude, OwnerPosition.Longitude]}>
				<Popup>This Is The Owner Position</Popup>
			</Marker>
			<LeafletMapPathRouting
				BorrowerLatLng={BorrowerPosition}
				OwnerLatLng={OwnerPosition}
			/>
			<Legend
				FlyToOwner={FlyToOwnerPosition}
				FlyToBorrower={FlyToBorrowerPosition}
			/>
		</MapContainer>
	);
};

export default LeafletMap;
