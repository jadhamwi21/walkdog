import { useEffect, useReducer } from "react";
import { ImageToBlob } from "../helpers/Functions.js";
import { NewVisitor_Choice } from "../reducers/SignupReducer.js";
import { FirebaseUtilityInstance } from "../services/Firebase.js";
// Get KeyValue Pairs Returns An Input As Key Value
// We Need THis Function Because Of Inputs Diversity We Have In Our Form
const getKeyValuePairs = {
	Location: (Location) => ({ Location: Location }),
	Field: (event) => ({ [event.target.name]: event.target.value }),
	Type: (type) => ({ UserType: type }),
	Image: (event, image) => ({ [event.target.name]: image }),
};
// Regular Expression For Validation Email Address
const emailRegExp = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
// Just Object That Stores Actions To Avoid Spelling Errors
const ACTIONS = {
	STORE_INPUTS: "store-inputs",
	STORE_ERRORS: "store-errors",
	TOGGLE_VALIDATE: "toggle-validate",
	OPEN_HELPER: "open-helper",
	CLOSE_HELPER: "close-helper",
	SIGNUP_SUCCESS: "signup-success",
	SUBMIT: "submit",
};
const reducer = (state, action) => {
	switch (action.type) {
		// Update State With The New Input
		case ACTIONS.STORE_INPUTS: {
			return {
				...state,
				Inputs: { ...state.Inputs, ...action.payload },
			};
		}
		// Update State With The New Errors Caused By Validation
		case ACTIONS.STORE_ERRORS: {
			return {
				...state,
				Errors: { ...state.Errors, ...action.payload.errorKeyValue },
			};
		}
		// Update State To Validation State, Validate On First and Every Submit Click
		case ACTIONS.TOGGLE_VALIDATE:
			return { ...state, Validate: true };
		// Show Helper Box
		case ACTIONS.OPEN_HELPER:
			return {
				...state,
				Helper: { Switch: true, Message: action.payload },
			};
		case ACTIONS.CLOSE_HELPER:
			return {
				...state,
				Helper: { Switch: false, Message: "" },
			};

		case ACTIONS.SIGNUP_SUCCESS:
			return { ...state, SignupSuccess: true };
		// Submit The Form
		case ACTIONS.SUBMIT:
			return { ...state, Submit: !state.Submit };
	}
};
export const useSignup = () => {
	const [
		{ Inputs, Validate, Submit, Errors, Helper, SignupSuccess },
		dispatch,
	] = useReducer(reducer, {
		Inputs: {
			FirstName: "",
			LastName: "",
			Location: "",
			Password: "",
			ConfirmPassword: "",
			Email: "",
			ProfilePicture: "",
			UserType: NewVisitor_Choice.UNSCPECIFIED,
		},

		// Errors For Input Validation
		Errors: {
			Email: "",
			Password: "",
			ConfirmPassword: "",
		},

		// Helper Message Box When Submiting
		Helper: {
			Switch: false,
			Message: "",
		},

		// For Signup Result
		SignupSuccess: false,

		// Toggle Validation
		Validate: false,

		// For Form Submit
		Submit: false,
	});
	// onChange Validator
	const realtimeInputValidation = (e) => {
		const { name, value } = e.target;
		let error = "";
		switch (name) {
			case "Password":
				error =
					value.length <= 8 - 1 //Minus 1 because it's zero indexed
						? "Password Must Contain At Least 8 Characters"
						: "";
				break;
			case "ConfirmPassword":
				error = value === Inputs["Password"] ? "" : "Password Unmatch";
				break;
			case "Email":
				error = emailRegExp.test(value) ? "" : "Invalid Email";
				break;
		}
		if (name === "Password" && Inputs.ConfirmPassword === value) {
			dispatch({
				type: ACTIONS.STORE_ERRORS,
				payload: { errorKeyValue: { [name]: error, ["ConfirmPassword"]: "" } },
			});
			return;
		}
		dispatch({
			type: ACTIONS.STORE_ERRORS,
			payload: { errorKeyValue: { [name]: error } },
		});
	};
	// On Submit Validator
	const entireFormValidation = () => {
		const InputsArray = Object.keys(Inputs);
		for (const InputValue of InputsArray) {
			if (Inputs[InputValue] === "" && InputValue !== "ProfilePicture")
				return "Some Inputs Are Missing";
		}
		if (Inputs.Password !== Inputs.ConfirmPassword) {
			return "Password Doesn't Match";
		}
		if (!emailRegExp.test(Inputs.Email)) {
			return "Email Address Is Not Valid";
		}
		return true;
	};
	// Handlers For All Inputs We Have In Our Form
	const Handlers = {
		// For Picture Upload
		pictureHandler: async (e) => {
			const img = URL.createObjectURL(e.target.files[0]);
			const ImageKeyValue = getKeyValuePairs.Image(e, img);
			dispatch({ type: ACTIONS.STORE_INPUTS, payload: { ...ImageKeyValue } });
		},
		// For Regular Input
		fieldHandler: (e) => {
			dispatch({
				type: ACTIONS.STORE_INPUTS,
				payload: { [e.target.name]: e.target.value },
			});
			realtimeInputValidation(e);
		},
		// For Location Finder
		locationHandler: (location) => {
			const LocationKeyValue = getKeyValuePairs.Location(location);
			dispatch({
				type: ACTIONS.STORE_INPUTS,
				payload: { ...LocationKeyValue },
			});
		},
		closeboxHandler: () => {
			setTimeout(() => {
				dispatch({ type: ACTIONS.CLOSE_HELPER });
			}, 800);
		},
		// For Type Selector
		usertypeHandler: (type) => {
			const UserKeyValue = getKeyValuePairs.Type(type);
			dispatch({ type: ACTIONS.STORE_INPUTS, payload: { ...UserKeyValue } });
		},
		// For Submit
		submitHandler: (e) => {
			e.preventDefault();
			if (Validate === false) {
				dispatch({ type: ACTIONS.TOGGLE_VALIDATE });
			}
			const isFormValidated = entireFormValidation();
			if (isFormValidated === true) {
				dispatch({ type: ACTIONS.SUBMIT });
			} else {
				// isFormValidated Will Return The Message If It Didn't Return True
				const helperMessage = isFormValidated;
				dispatch({ type: ACTIONS.OPEN_HELPER, payload: helperMessage });
			}
		},
	};
	useEffect(() => {
		if (Submit === false) return;
		const SaveToDatabase = async () => {
			const isSUCCESS = await FirebaseUtilityInstance.CreateNewUser(Inputs);
			if (isSUCCESS === true) {
				dispatch({ type: ACTIONS.SIGNUP_SUCCESS });
				dispatch({ type: ACTIONS.SUBMIT });
			} else {
				dispatch({ type: ACTIONS.OPEN_HELPER, payload: isSUCCESS });
				dispatch({ type: ACTIONS.SUBMIT });
			}
		};
		SaveToDatabase();
	}, [Submit]);
	return [Inputs, Handlers, Submit, Validate, Errors, Helper, SignupSuccess];
};

export default useSignup;
