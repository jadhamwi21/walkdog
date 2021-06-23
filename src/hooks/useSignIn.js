import { useReducer, useEffect, useState } from "react";
import FirebaseUtilityInstance from "../services/Firebase";
import { ActionsCreator } from "../actions/ActionsCreator.js";
import { useDispatch, useSelector } from "react-redux";
import { NewVisitor_Choice } from "../reducers/SignupReducer";
import { store } from "../store/store.js";
import { useHistory } from "react-router";
const ACTIONS = {
	HANDLE_INPUT: "handle-input",
	TOGGLE_SIGNIN: "toggle-signin",
	SEARCH_USER: "start-search-user",
	SEARCH_ERROR: "search-error",
	AUTHORIZED: "authorized",
};
const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.HANDLE_INPUT:
			return {
				...state,
				Inputs: {
					...state.Inputs,
					[action.payload.name]: action.payload.value,
				},
			};
		case ACTIONS.TOGGLE_SIGNIN:
			return {
				...state,
				StartSigningIn: !state.StartSigningIn,
			};
		case ACTIONS.SEARCH_USER:
			return {
				...state,
				SignInProcess: {
					...state.SignInProcess,
					Searching: true,
				},
			};
		case ACTIONS.SEARCH_ERROR:
			return {
				...state,
				SignInProcess: {
					...state.SignInProcess,
					Searching: false,
					Error: action.payload.errorMsg,
				},
			};
		case ACTIONS.AUTHORIZED:
			return {
				...state,
				SignInProcess: {
					...state.SignInProcess,
					Searching: false,
					Error: "",
					User: action.payload.user,
				},
			};
	}
};
export const Destinations = {
	INBOX: "/inbox",
	MAINPAGE: "/mainpage",
	ACCOUNT: "/myaccount",
};
const useSignIn = () => {
	const [{ Inputs, StartSigningIn, SignInProcess }, dispatch] = useReducer(
		reducer,
		{
			Inputs: {
				Email: "borrower@hotmail.com",
				Password: "123123123",
			},
			SignInProcess: {
				Searching: false,
				User: "",
				Error: "",
			},
			StartSigningIn: false,
		}
	);
	const [destination, setDestination] = useState("");
	const ReduxDispatch = useDispatch();
	const { PreviousPath } = useSelector((state) => ({
		PreviousPath: state.History.previous,
	}));

	const Handlers = {
		inputHandler: (e) => {
			const { name, value } = e.target;

			dispatch({
				type: ACTIONS.HANDLE_INPUT,
				payload: {
					name: name,
					value: value,
				},
			});
		},
		signinHandler: (e) => {
			e.preventDefault();
			dispatch({
				type: ACTIONS.TOGGLE_SIGNIN,
			});
		},
	};
	useEffect(() => {
		if (StartSigningIn === false) return;
		dispatch({ type: ACTIONS.SEARCH_USER });
		const { Email, Password } = Inputs;
		const searchUser = async () => {
			const response = await FirebaseUtilityInstance.SignInUser(
				Email,
				Password
			);
			if (typeof response === "string") {
				dispatch({
					type: ACTIONS.SEARCH_ERROR,
					payload: { errorMsg: response },
				});
				dispatch({ type: ACTIONS.TOGGLE_SIGNIN });
			} else {
				dispatch({ type: ACTIONS.AUTHORIZED, payload: { user: response } });
			}
		};
		searchUser();
	}, [StartSigningIn]);
	useEffect(() => {
		if (SignInProcess.User === "") return;
		const UserLoggingIn = SignInProcess.User;

		if (UserLoggingIn.UserType === NewVisitor_Choice.OWNER) {
			ReduxDispatch(ActionsCreator.ownerLogin(UserLoggingIn));
		} else {
			ReduxDispatch(ActionsCreator.borrowerLogin(UserLoggingIn));
		}
		if (PreviousPath === Destinations.INBOX) {
			setDestination(Destinations.INBOX);
		} else if (PreviousPath === Destinations.ACCOUNT) {
			setDestination(Destinations.ACCOUNT);
		} else {
			setDestination(Destinations.MAINPAGE);
		}
		ReduxDispatch(ActionsCreator.selectLoggingOut());
	}, [SignInProcess.User]);
	return [Inputs, Handlers, SignInProcess, destination];
};
export default useSignIn;
