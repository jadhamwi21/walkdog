import React from "react";
import { Button } from "@material-ui/core";
import Styles from "./MyAccount.module.css";
const SaveButton = ({ Value }) => {
	return (
		<div>
			<Button className={Styles.SaveButton} type="submit">
				{Value}
			</Button>
		</div>
	);
};

export default SaveButton;
