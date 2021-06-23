import { useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionsCreator from "../actions/ActionsCreator.js";
import {
	todaysDate,
	DATEFLAGS,
	isEndingDurationGreaterThanStartingDuration,
} from "../helpers/Functions.js";
import FirebaseUtilityInstance from "../services/Firebase.js";
export const postActions = {
	EDIT_POST: "edit-post",
	NEW_POST: "new-post",
};
const ACTIONS = {
	HANDLE_INPUTS: "handle-inputs",
	HANDLE_ERRORS: "handle-errors",
	TOGGLE_VALIDATION: "toggle-validation",
	SUBMIT: "submit",
	RESET_SUBMIT: "reset-submit",
	TOGGLE_MODAL: "toggle-modal",
	RESTORE_POST_DEFAULT_VALUES: "restore-post-default-values",
	START_LOADING: "start-loading",
	STOP_LOADING: "stop-loading",
};
const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.HANDLE_INPUTS:
			return { ...state, Inputs: { ...state.Inputs, ...action.payload } };
		case ACTIONS.HANDLE_ERRORS:
			return { ...state, Errors: { ...state.Errors, ...action.payload } };
		case ACTIONS.TOGGLE_VALIDATION:
			return { ...state, Validation: true };
		case ACTIONS.SUBMIT:
			return { ...state, Submit: true };
		case ACTIONS.RESET_SUBMIT:
			return { ...state, Submit: false };
		case ACTIONS.TOGGLE_MODAL:
			return { ...state, Modal: !state.Modal };
		case ACTIONS.RESTORE_POST_DEFAULT_VALUES:
			return { ...state, Inputs: action.payload };
		case ACTIONS.START_LOADING:
			return { ...state, Loading: true };
		case ACTIONS.STOP_LOADING:
			return { ...state, Loading: false };
		default:
			return state;
	}
};
const usePost = (postAction, Post = undefined) => {
	const ReduxDispatch = useDispatch();
	const { Latitude, Longitude } = useSelector((state) =>
		// This Conditional Return To Handle The Case Where We Are Logging Out The User
		// To Avoid Undefined Error For Empty Object
		state.Owner.Location === undefined
			? {
					Latitude: "",
					Longitude: "",
			  }
			: state.Owner.Location
	);
	const DerivedInputsIfFound = (function () {
		if (Post === undefined) {
			return {
				DogPicture: "",
				DogType: "",
				DayOfBorrow: "",
				DogName: "",
				MonthOfBorrow: "",
				YearOfBorrow: "",
				Cost: "",
				Currency: "dollar",
				StartingDuration: "00:00",
				EndingDuration: "00:00",
				Aggresive: true,
				createdAt: todaysDate(DATEFLAGS.FULL),
			};
		} else {
			return { ...Post };
		}
	})();
	const [{ Inputs, Errors, Validation, Submit, Modal, Loading }, dispatch] =
		useReducer(reducer, {
			Inputs: {
				...DerivedInputsIfFound,
			},
			Errors: {
				DayOfBorrow: "",
				MonthOfBorrow: "",
				YearOfBorrow: "",
				EndingDuration: "",
				StartingDuration: "",
			},
			Validation: false,
			Submit: false,
			Modal: false,
			Loading: false,
		});
	console.log(Inputs, Errors);
	const isFormValidated = () => {
		const UserInputs = Object.values(Inputs);
		const InputsErrors = Object.values(Errors);
		let isValidated = true;
		for (let i = 0; i < UserInputs.length; i++) {
			if (UserInputs[i] === "") {
				isValidated = false;
				break;
			}
		}
		if (isValidated === true) {
			for (let i = 0; i < InputsErrors.length; i++) {
				if (InputsErrors[i] !== "") {
					isValidated = false;
					break;
				}
			}
		}
		return isValidated;
	};
	const validateInput = (name, value) => {
		let response = "";
		switch (name) {
			case "DayOfBorrow":
				response =
					todaysDate(DATEFLAGS.DAY) <= value && value <= 31
						? ""
						: "Invalid Day";
				break;
			case "MonthOfBorrow":
				response =
					todaysDate(DATEFLAGS.MONTH) <= value && value <= 12
						? ""
						: "Invalid Month";
				break;
			case "YearOfBorrow":
				response = todaysDate(DATEFLAGS.YEAR) <= value ? "" : "Invalid Year";
				break;
			case "StartingDuration": {
				response = isEndingDurationGreaterThanStartingDuration(
					value,
					Inputs.EndingDuration
				)
					? ""
					: "Invalid Duration";
				break;
			}
			case "EndingDuration": {
				response = isEndingDurationGreaterThanStartingDuration(
					Inputs.StartingDuration,
					value
				)
					? ""
					: "Invalid Duration";
				break;
			}
			case "StartingDuration": {
				response = isEndingDurationGreaterThanStartingDuration(
					value,
					Inputs.EndingDuration
				)
					? ""
					: "Invalid Duration";
				break;
			}
		}
		return response;
	};

	const Handlers = {
		inputHandler: (e) => {
			let { name, value } = e.target;
			dispatch({
				type: ACTIONS.HANDLE_INPUTS,
				payload: {
					[name]: value,
				},
			});
			const validationResponse = validateInput(name, value);
			name = name === "StartingDuration" ? "EndingDuration" : name;
			if (Errors[name] !== undefined) {
				dispatch({
					type: ACTIONS.HANDLE_ERRORS,
					payload: {
						[name]: validationResponse,
					},
				});
			}
		},
		pictureHandler: (e) => {
			const img = URL.createObjectURL(e.target.files[0]);
			const name = e.target.name;
			dispatch({
				type: ACTIONS.HANDLE_INPUTS,
				payload: {
					[name]: img,
				},
			});
		},
		checkboxHandler: (e) => {
			const CheckStatus = e.target.checked;
			dispatch({
				type: ACTIONS.HANDLE_INPUTS,
				payload: {
					[e.target.name]: CheckStatus,
				},
			});
		},
		submitHandler: (e) => {
			e.preventDefault();

			if (Validation === false) {
				dispatch({ type: ACTIONS.TOGGLE_VALIDATION });
			}
			const isValidated = isFormValidated();
			if (isValidated === false) {
				return;
			}
			dispatch({ type: ACTIONS.SUBMIT });
		},
		toggleModal: () => {
			dispatch({ type: ACTIONS.TOGGLE_MODAL });
		},
	};
	useEffect(() => {
		if (Submit === false) return;
		if (postAction === postActions.NEW_POST) {
			(async () => {
				dispatch({ type: ACTIONS.START_LOADING });
				const PostObject = await FirebaseUtilityInstance.AddPostForLoggedInUser(
					{
						...Inputs,
						Latitude,
						Longitude,
					}
				);
				ReduxDispatch(ActionsCreator.addPostToUser(PostObject));
				dispatch({ type: ACTIONS.TOGGLE_MODAL });
				dispatch({ type: ACTIONS.RESET_SUBMIT });
				dispatch({ type: ACTIONS.STOP_LOADING });
			})();
		}
		if (postAction === postActions.EDIT_POST) {
			dispatch({ type: ACTIONS.START_LOADING });
			(async () => {
				const editedPost =
					await FirebaseUtilityInstance.EditPostForLoggedInUser(Post, Inputs);
				ReduxDispatch(ActionsCreator.editPostToUser(editedPost));
				dispatch({ type: ACTIONS.STOP_LOADING });
				dispatch({ type: ACTIONS.TOGGLE_MODAL });
				dispatch({ type: ACTIONS.RESET_SUBMIT });
			})();
		}
	}, [Submit]);
	useEffect(() => {
		if (postAction === postActions.EDIT_POST) {
			dispatch({ type: ACTIONS.TOGGLE_VALIDATION });
		}
	}, []);
	useEffect(() => {
		if (Modal === false && postAction === postActions.EDIT_POST) {
			dispatch({ type: ACTIONS.RESTORE_POST_DEFAULT_VALUES, payload: Post });
		}
	}, [Modal]);
	return {
		Inputs: Inputs,
		Errors: Errors,
		Handlers: Handlers,
		Validation: Validation,
		Modal: Modal,
		Loading: Loading,
	};
};
export default usePost;
