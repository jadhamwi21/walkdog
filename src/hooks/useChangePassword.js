import {
	useEffect,
	useLayoutEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import ActionsCreator from "../actions/ActionsCreator.js";
import { FirebaseUtilityInstance } from "../services/Firebase.js";
import store from "../store/store.js";
const ACTIONS = {
	STORE_INPUT: "store-input",
	STORE_ERROR: "store-error",
	TOGGLE_MODAL: "toggle-modal",
	CHANGE_SAVE_BUTTON_TEXT: "change-save-toggle-text",
};
export const FIELDS = {
	OLD: "old",
	NEW: "new",
	CONFIRM: "confirm",
};
const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.STORE_INPUT:
			return {
				...state,
				Inputs: {
					...state.Inputs,
					[action.payload.name]: action.payload.value,
				},
			};
		case ACTIONS.STORE_ERROR:
			return {
				...state,
				Errors: {
					...state.Errors,
					[action.payload.name]: action.payload.errorMessage,
				},
			};
		case ACTIONS.TOGGLE_MODAL:
			return { ...state, showModal: !state.showModal };
		case ACTIONS.CHANGE_SAVE_BUTTON_TEXT:
			return { ...state, SaveButtonText: action.payload.buttonText };
	}
};
const useChangePassword = (UserAccount) => {
	const [state, dispatch] = useReducer(reducer, {
		Inputs: {
			old: "",
			new: "",
			confirm: "",
		},
		Errors: {
			old: "",
			confirm: "",
			new: "",
		},
		showModal: false,
		SaveButtonText: "Save Password",
	});
	const InputsVerification = () => {
		if (state.Inputs.old.toString() !== UserAccount.Password.toString()) {
			return false;
		} else if (
			state.Inputs.new.toString() !== state.Inputs.confirm.toString()
		) {
			return false;
		} else {
			return true;
		}
	};
	const [AccountPassword, setAccountPassword] = useState(null);
	useLayoutEffect(() => {
		const getAccountPassword = async () => {
			const Password = await FirebaseUtilityInstance.GetAccountPassword(
				UserAccount.Email
			);
			setAccountPassword(Password);
		};
		getAccountPassword();
	}, []);
	const changeHandler = (e) => {
		const name = e.target.name;
		const inputValue = e.target.value;
		if (name === FIELDS.OLD) {
			if (AccountPassword === null) return;
			if (inputValue !== AccountPassword.toString()) {
				dispatch({
					type: ACTIONS.STORE_ERROR,
					payload: {
						name: FIELDS.OLD,
						errorMessage: "Your Input Doesn't Match Your Password",
					},
				});
			} else {
				dispatch({
					type: ACTIONS.STORE_ERROR,
					payload: {
						name: FIELDS.OLD,
						errorMessage: "",
					},
				});
			}
		} else if (name === FIELDS.NEW) {
			if (inputValue.length < 8) {
				dispatch({
					type: ACTIONS.STORE_ERROR,
					payload: {
						name: FIELDS.NEW,
						errorMessage: "Password Must Be 8 Characters At Least",
					},
				});
			} else {
				dispatch({
					type: ACTIONS.STORE_ERROR,
					payload: {
						name: FIELDS.NEW,
						errorMessage: "",
					},
				});
			}
			if (inputValue === state.Inputs.confirm.toString()) {
				dispatch({
					type: ACTIONS.STORE_ERROR,
					payload: {
						name: FIELDS.CONFIRM,
						errorMessage: "",
					},
				});
			}
		} else {
			if (inputValue !== state.Inputs.new) {
				dispatch({
					type: ACTIONS.STORE_ERROR,
					payload: {
						name: FIELDS.CONFIRM,
						errorMessage: "Password Mismatch",
					},
				});
			} else {
				dispatch({
					type: ACTIONS.STORE_ERROR,
					payload: {
						name: FIELDS.CONFIRM,
						errorMessage: "",
					},
				});
			}
		}
		dispatch({
			type: ACTIONS.STORE_INPUT,
			payload: {
				name: name,
				value: inputValue,
			},
		});
	};
	const handleSave = async (e) => {
		e.preventDefault();
		dispatch({
			type: ACTIONS.CHANGE_SAVE_BUTTON_TEXT,
			payload: { buttonText: "Saving.." },
		});
		const isVerified = InputsVerification();
		console.log(isVerified);
		if (isVerified) {
			const NewPassword = state.Inputs.new;
			await FirebaseUtilityInstance.ChangePassword(
				UserAccount.Email,
				NewPassword
			);
			store.dispatch(ActionsCreator.updatePassword(NewPassword));
			dispatch({ type: ACTIONS.TOGGLE_MODAL });
			dispatch({
				type: ACTIONS.CHANGE_SAVE_BUTTON_TEXT,
				payload: { buttonText: "Save Password" },
			});
		} else {
			dispatch({
				type: ACTIONS.CHANGE_SAVE_BUTTON_TEXT,
				payload: { buttonText: "Something Is Missing.." },
			});
		}
	};
	const modalHandler = () => {
		dispatch({ type: ACTIONS.TOGGLE_MODAL });
	};
	return {
		OldPassword: state.Inputs.old,
		NewPassword: state.Inputs.new,
		ConfirmNewPassword: state.Inputs.confirm,
		onChange: changeHandler,
		Errors: state.Errors,
		onSave: handleSave,
		shouldShowModal: state.showModal,
		toggleModal: modalHandler,
		ButtonText: state.SaveButtonText,
	};
};

export default useChangePassword;
