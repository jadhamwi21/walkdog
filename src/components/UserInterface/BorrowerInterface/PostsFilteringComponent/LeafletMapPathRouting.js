import React from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import Styles from "../BorrowerInterface.module.css";
class LeafletMapPathRouting extends React.Component {
	createPathRouting() {
		const BorrowerLatLng = this.props.BorrowerLatLng;
		const OwnerLatLng = this.props.OwnerLatLng;
		const Map = this.props.map;
		L.Routing.control({
			waypoints: [
				L.latLng(BorrowerLatLng.Latitude, BorrowerLatLng.Longitude),
				L.latLng(OwnerLatLng.Latitude, OwnerLatLng.Longitude),
			],
			lineOptions: {
				styles: [
					{
						color: "#2e34cf",
						opacity: 0.7,
						weight: 3,
					},
				],
			},
			itineraryClassName: Styles.RoutingHelpBox,
		}).addTo(Map);
	}
	componentDidMount() {
		this.createPathRouting();
	}
	render() {
		return null;
	}
}
const withMap = (Component) => {
	return function WrappedComponent(props) {
		const map = useMap();
		return <Component {...props} map={map} />;
	};
};

export default withMap(LeafletMapPathRouting);
