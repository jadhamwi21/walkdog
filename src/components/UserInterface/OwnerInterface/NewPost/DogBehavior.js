import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Styles from "../OwnerInterface.module.css";
import { FormContext } from "./NewPost";
const DogBehavior = () => {
	const { Inputs, Handlers } = useContext(FormContext);
	return (
		<div className={Styles.DogBehaviorWrapper}>
			<Typography variant="subtitle1" className={Styles.AggresiveText}>
				Aggressive
			</Typography>
			<input
				type="checkbox"
				style={{ margin: "0px" }}
				name="Aggresive"
				checked={Inputs.Aggresive}
				onClick={Handlers.checkboxHandler}
			/>
		</div>
	);
};

export default DogBehavior;
