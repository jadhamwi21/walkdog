import React from "react";
import Styles from "../BorrowerInterface.module.css";
const LocationRow = ({
	countryObject,
	selectedValue,
	locationOnClickHandler,
	handleClose,
}) => {
	return (
		<div
			key={countryObject.name}
			style={
				countryObject.name.toLowerCase() === selectedValue.toLowerCase()
					? { backgroundColor: "rgba(0,165,246,0.8)" }
					: {}
			}
			onClick={() => {
				locationOnClickHandler(countryObject.name);
				handleClose();
			}}
			className={Styles.LocationRow}
		>
			{countryObject.name}
		</div>
	);
};

export default LocationRow;
