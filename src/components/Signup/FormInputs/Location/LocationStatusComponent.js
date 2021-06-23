import React from "react";
import Styles from "../../Signup.module.css";
import { locationIsFetched } from "./LocationField.js";
import { Loader } from "./Loader.js";
const ContentDecoder = (Location, Loading, error) => {
	if (!locationIsFetched(Location) && error !== "") {
		return error;
	}
	if (!locationIsFetched(Location) && Loading === true) {
		return <Loader />;
	}
	if (error !== "") {
		return error;
	}
	if (locationIsFetched(Location)) {
		return "Location Fetched";
	}
	if (!locationIsFetched(Location)) {
		return "Find Location";
	}
};
export const LocationStatusComponent = ({ Loading, Location, error }) => {
	return (
		<>
			<span>{ContentDecoder(Location, Loading, error)}</span>
		</>
	);
};

export default LocationStatusComponent;
