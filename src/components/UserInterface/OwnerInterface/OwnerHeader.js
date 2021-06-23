import { Button } from "@material-ui/core";
import React from "react";
import { Options_ENUMS } from "./OwnerInterface";
import Styles from "./OwnerInterface.module.css";
const SelectionHeader = ({ selectOptionHandler }) => {
	return (
		<div className={Styles.SelectionHeader}>
			<Button
				className={Styles.SelectionButton}
				onClick={() => selectOptionHandler(Options_ENUMS.NEWPOST)}
			>
				New
			</Button>
			<Button
				className={Styles.SelectionButton}
				onClick={() => selectOptionHandler(Options_ENUMS.EDITPOST)}
			>
				Edit
			</Button>
			<Button
				className={Styles.SelectionButton}
				onClick={() => selectOptionHandler(Options_ENUMS.DELETEPOST)}
			>
				Delete
			</Button>
		</div>
	);
};

export default SelectionHeader;
