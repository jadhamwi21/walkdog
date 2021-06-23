import React, { useEffect } from "react";
import { connect } from "react-redux";
import { SignupHeader } from "./Header/SignupHeader.js";
import FormInputs from "./FormInputs/FormInputs.js";
import Styles from "./Signup.module.css";
import SubmitButton from "./Submit/SubmitButton.js";
import { useSignup } from "../../hooks/useSignup.js";
import { NewVisitor_Choice } from "../../reducers/SignupReducer.js";
import BoxesWrapper from "./MessageComponents/BoxesWrapper.js";
import useScrollToTop from "../../hooks/useScrollToTop.js";
import useTabTitle from "../../hooks/useTabTitle.js";
import { motion } from "framer-motion";
import AnimatedComponentWrapper from "../../router/AnimatedComponentWrapper.js";
export const FormContext = React.createContext();
const myVariant = {
	init: { opacity: 0 },
	in: { opacity: 1 },
	out: { translateX: "100vw" },
};
const Signup = ({ SelectedType, FooterClickedLink }) => {
	useScrollToTop();
	const [Inputs, Handlers, Submit, Validate, Errors, Helper, SignupSuccess] =
		useSignup();
	useEffect(() => {
		// In Case The Visitor Clicked On One Of The Cards
		if (SelectedType !== NewVisitor_Choice.UNSCPECIFIED) {
			Handlers.usertypeHandler(SelectedType);
		}
	}, []);

	const StylesAppliedEmptyFields = (name) => {
		if (Validate === false) return {};
		if (Inputs[name] === "") {
			return { borderColor: "red" };
		}
	};
	return (
		<AnimatedComponentWrapper>
			<FormContext.Provider
				value={{
					Inputs: Inputs,
					Handlers: Handlers,
					StylesForEmptyFields: StylesAppliedEmptyFields,
					Errors: Errors,
					Submit: Submit,
				}}
			>
				{/* Signup Form */}
				<form
					className={Styles.FormContainer}
					onSubmit={Handlers.submitHandler}
					noValidate
				>
					{/* Signup Form Header Text */}
					<SignupHeader type={SelectedType} />
					{/* Signup Form Inputs */}
					<FormInputs UserType={SelectedType} />
					{/* Signup Form Submit Button */}
					<SubmitButton />
				</form>
				{/* Signup Message Boxes */}
				<BoxesWrapper
					Switch={Helper.Switch}
					Success={SignupSuccess}
					Handlers={Handlers}
					HelperMessage={Helper.Message}
				/>
			</FormContext.Provider>
		</AnimatedComponentWrapper>
	);
};
const mapStateToProps = (state) => ({
	SelectedType: state.Signup.Type,
});

export default connect(mapStateToProps)(Signup);
