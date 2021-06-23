import React from "react";
import Styles from "../BorrowerInterface.module.css";
const MinHeightAdjuster = ({ children }) => {
	return <div className={Styles.MinHeightAdjuster}>{children}</div>;
};

export default MinHeightAdjuster;
