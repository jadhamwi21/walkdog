import React from "react";
import Styles from "../BorrowerInterface.module.css";
const DetailComponent = ({ leftpart, rightpart }) => {
	return (
		<div className={Styles.DetailComponent}>
			<span>{leftpart} : </span>
			<span style={{ color: "blue" }}>{rightpart}</span>
		</div>
	);
};

export default DetailComponent;
