import React, { useContext } from "react";
import { ProfilePicture } from "./ProfilePicture/ProfilePicture.js";
import { InputComponentsContainer } from "./Inputs/InputComponentsContainer.js";
import { LocationField } from "./Location/LocationField.js";
import { UserTypeSelector } from "./UserTypeSelector/UserTypeSelector.js";
import { NewVisitor_Choice } from "../../../reducers/SignupReducer.js";
import { FormContext } from "../Signup.js";
const checkForSignupAsBorrowerOrOwner = (Type) => {
	if (Type === NewVisitor_Choice.UNSCPECIFIED) return <UserTypeSelector />;
};

const FormInputs = ({ UserType }) => {
	const { Inputs } = useContext(FormContext);
	return (
		<>
			<ProfilePicture Picture={Inputs.ProfilePicture} />
			<InputComponentsContainer />
			{checkForSignupAsBorrowerOrOwner(UserType)}
			<LocationField />
		</>
	);
};
export default FormInputs;
