import React, { useContext } from "react";
import Styles from "../../Signup.module.css";
import { TypeButton } from "./TypeButton.js";
import { NewVisitor_Choice } from "../../../../reducers/SignupReducer.js";
import { FormContext } from "../../Signup";

export const UserTypeSelector = () => {
	const { StylesForEmptyFields } = useContext(FormContext);
	return (
		<div
			className={Styles.TypeSelectorContainer}
			style={StylesForEmptyFields("UserType")}
		>
			<TypeButton label="Owner" type={NewVisitor_Choice.OWNER} />
			<TypeButton label="Borrower" type={NewVisitor_Choice.BORROWER} />
		</div>
	);
};

export default UserTypeSelector;
