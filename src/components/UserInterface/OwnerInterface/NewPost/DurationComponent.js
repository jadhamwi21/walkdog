import React from "react";
import InputField from "./InputField";
import RightArrow from "../../../../assets/ArrowRight.png";
import Styles from "../OwnerInterface.module.css";
const DurationComponent = () => {
	return (
		<div className={Styles.DurationWrapper}>
			<InputField type="time" name="StartingDuration" width="160px" />
			<img src={RightArrow} className={Styles.ArrowImage} />
			<InputField type="time" name="EndingDuration" withError width="160px" />
		</div>
	);
};

export default DurationComponent;
