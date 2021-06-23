import React from "react";
import SignInButton from "./SignInButton.js";
import { InputComponent } from "./InputComponent.js";
import useSignIn, { Destinations } from "../../../hooks/useSignIn.js";
import Styles from "../Signin.module.css";
import ModifiedLink from "../../../helpers/ModifiedLink.js";
import { connect } from "react-redux";
import { checkforLoggedInUser } from "../../../helpers/Functions.js";
export const Form = ({ BorrowerState, OwnerState }) => {
	const [Inputs, Handlers, SigningInProcess, Destination] = useSignIn();
	return (
		<>
			<form onSubmit={Handlers.signinHandler}>
				<InputComponent
					type="email"
					PlaceHolder="Email"
					inputHandler={Handlers.inputHandler}
					value={Inputs.Email}
				/>
				<InputComponent
					type="password"
					PlaceHolder="Password"
					inputHandler={Handlers.inputHandler}
					value={Inputs.Password}
				/>
				<SignInButton isSearching={SigningInProcess.Searching} />
			</form>
			<div className={Styles.ErrorDiv}>
				{SigningInProcess.Error !== "" && <>{SigningInProcess.Error}</>}
			</div>
			{/*This Piece Of JSX For Redirection To User Mainpage After Signing
			In(With Animation)*/}
			<ModifiedLink
				className={Styles.HiddenLink}
				to="/mainpage"
				ReactTo={Destination === Destinations.MAINPAGE}
			/>
			<ModifiedLink
				className={Styles.HiddenLink}
				to="/inbox"
				ReactTo={Destination === Destinations.INBOX}
			/>
			<ModifiedLink
				className={Styles.HiddenLink}
				to="/myaccount"
				ReactTo={Destination === Destinations.ACCOUNT}
			/>
		</>
	);
};
const mapStateToProps = (state) => ({
	BorrowerState: state.Borrower,
	OwnerState: state.Owner,
});
export default connect(mapStateToProps)(Form);
