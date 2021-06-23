import ActionsType from "../actions/ActionsType";

export const selectedDisplayForUnauthenticatedUsers_ENUMS = {
	NOT_LOGGED_IN: "not-logged-in",
	LOGGING_OUT: "logging-out",
};
const initialState = {
	selected: selectedDisplayForUnauthenticatedUsers_ENUMS.NOT_LOGGED_IN,
	logging_out: {
		showMessage: false,
	},
};
const UnauthenticatedReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionsType.SELECT_LOGGING_OUT:
			return {
				selected: selectedDisplayForUnauthenticatedUsers_ENUMS.LOGGING_OUT,
				logging_out: {
					showMessage: false,
				},
			};
		case ActionsType.DONE_LOGGING_OUT:
			return {
				selected: selectedDisplayForUnauthenticatedUsers_ENUMS.LOGGING_OUT,
				logging_out: {
					showMessage: true,
				},
			};
		case ActionsType.RESET_LOGGING_OUT:
			return {
				selected: selectedDisplayForUnauthenticatedUsers_ENUMS.NOT_LOGGED_IN,
				logging_out: {
					showMessage: false,
				},
			};
		default:
			return state;
	}
};
export default UnauthenticatedReducer;
