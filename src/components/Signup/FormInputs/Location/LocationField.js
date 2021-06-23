import React, { useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useFormLocation } from "../../../../hooks/useFormLocation.js";
import Styles from "../../Signup.module.css";
import { FormContext } from "../../Signup.js";
import { LocationStatusComponent } from "./LocationStatusComponent.js";
export const locationIsFetched = (location) => {
	return Object.keys(location).length !== 0;
};
export const LocationField = () => {
	const { Loading, error, Location, ClickHandler } = useFormLocation();
	const { StylesForEmptyFields, Handlers } = useContext(FormContext);
	useEffect(() => {
		if (!locationIsFetched(Location)) return;
		Handlers.locationHandler(Location);
	}, [Location]);
	return (
		<>
			<Button
				className={Styles.FindLocationField}
				onClick={ClickHandler}
				disabled={locationIsFetched(Location) ? true : false}
				style={
					locationIsFetched(Location)
						? {
								backgroundColor: "#2e34cf",
								color: "white",
						  }
						: {
								backgroundColor: "grey",
								color: "black",
								...StylesForEmptyFields("Location"),
						  }
				}
			>
				<LocationStatusComponent
					Location={Location}
					Loading={Loading}
					error={error}
				/>
			</Button>
		</>
	);
};

export default LocationField;
