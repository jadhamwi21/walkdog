import React from "react";
import DetailInputField from "./DetailInputField";
import Styles from "./MyAccount.module.css";
const EditDetailsFieldsContainer = ({
	FirstName,
	LastName,
	UserType,
	onChange,
}) => {
	return (
		<div className={Styles.FormDetailsContainer}>
			<table>
				<DetailInputField
					label="First Name"
					name="FirstName"
					value={FirstName}
					onChange={onChange}
				/>
				<DetailInputField
					label="Last Name"
					name="LastName"
					value={LastName}
					onChange={onChange}
				/>
				<DetailInputField
					label="Account Type"
					name="UserType"
					select
					onChange={onChange}
					value={UserType}
				/>
			</table>
		</div>
	);
};

export default EditDetailsFieldsContainer;
