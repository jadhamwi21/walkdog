import React from "react";
import Styles from "../OwnerInterface.module.css";
const LoadingIndicator = () => {
	return (
		<div className={Styles.IndicatorContainer}>
			<div>
				<div className={Styles.IndicatorWrapper}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default LoadingIndicator;
