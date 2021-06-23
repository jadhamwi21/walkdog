import { Button } from "@material-ui/core";
import React from "react";
import Styles from "./MyAccount.module.css";
const InterfacesSwitchButton = ({ children, SwitchTo, isSelected }) => {
	const Classes = isSelected
		? [
				Styles.InterfacesSwitchButton,
				Styles.InterfacesSwitchButtonSelected,
		  ].join(" ")
		: Styles.InterfacesSwitchButton;
	return (
		<div>
			<Button className={Classes} onClick={SwitchTo} disabled={isSelected}>
				{children}
			</Button>
		</div>
	);
};

export default InterfacesSwitchButton;
