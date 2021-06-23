import { useEffect, useReducer } from "react";
import FirebaseUtilityInstance from "../services/Firebase";
import useFormLocation from "./useFormLocation";
const ACTIONS = {
	STORE_INPUT: "store-input",
	TOGGLE_MODAL: "toggle-modal",
	SAVE_ON: "save-on",
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
		case ACTIONS.TOGGLE_MODAL:
			return { ...state, modalShouldShow: !state.modalShouldShow };
		case ACTIONS.SAVE_TOGGLE:
			return { ...state, savePressed: !state.savePressed };
		default:
			return state;
	}
};
const useEditAccountDetails = (UserAccount) => {
	const { Loading, error, Location, ClickHandler } = useFormLocation();
	const [state, dispatch] = useReducer(reducer, {
		Inputs: {
			Avatar: UserAccount.ProfilePicture,
			FirstName: UserAccount.FirstName,
			LastName: UserAccount.LastName,
			UserType: UserAccount.UserType,
			Location: UserAccount.Location,
		},
		modalShouldShow: false,
		savePressed: false,
	});
	useEffect(() => {
		if (Object.entries(Location).length !== 0) {
			dispatch({
				type: ACTIONS.STORE_INPUT,
				payload: {
					name: "Location",
					value: Location,
				},
			});
		}
	}, [Location]);
	const handleChange = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		dispatch({
			type: ACTIONS.STORE_INPUT,
			payload: {
				name: inputName,
				value: inputValue,
			},
		});
	};
	const handleAvatar = (e) => {
		const AvatarImage = URL.createObjectURL(e.target.files[0]);
		dispatch({
			type: ACTIONS.STORE_INPUT,
			payload: {
				name: "Avatar",
				value: AvatarImage,
			},
		});
	};
	const ModalToggler = () => {
		dispatch({ type: ACTIONS.TOGGLE_MODAL });
	};
	useEffect(() => {
		const isPressed = state.savePressed;
		if (isPressed) {
			const SaveAccountDetails = async () => {
				const oldFullName = UserAccount.FirstName + " " + UserAccount.LastName;
				await FirebaseUtilityInstance.EditUserDetails(
					oldFullName,
					state.Inputs
				);
				ModalToggler();
				dispatch({ type: ACTIONS.SAVE_TOGGLE });
			};
			SaveAccountDetails();
		}
	}, [state.savePressed]);
	const SaveHandler = async (e) => {
		e.preventDefault();
		dispatch({ type: ACTIONS.SAVE_TOGGLE });
	};
	return {
		...state.Inputs,
		onChange: handleChange,
		AvatarHandler: handleAvatar,
		LocationClickHandler: ClickHandler,
		LocationLoading: Loading,
		LocationError: error,
		onSave: SaveHandler,
		LocationGeo: Location,
		ModalToggle: ModalToggler,
		ModalShouldShow: state.modalShouldShow,
		IsSavePressed: state.savePressed,
	};
};

export default useEditAccountDetails;
