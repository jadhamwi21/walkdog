import React from "react";
import MinHeightAdjuster from "./MinHeightAdjuster";
import Styles from "../BorrowerInterface.module.css";
const NoResultsFoundComponent = () => {
	return (
		<MinHeightAdjuster>
			<div className={Styles.NoResultFoundText}>No Results Found</div>
		</MinHeightAdjuster>
	);
};

export default NoResultsFoundComponent;
