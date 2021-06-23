import { ActionsType } from "../actions/ActionsType.js";
const initialState = {};

export const BorrowerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionsType.BORROWER_LOGIN:
			return { ...action.payload.user };
		case ActionsType.BORROWER_LOGOUT:
			return {};
		case ActionsType.UPDATE_BORROWER_PASSWORD:
			return { ...state, Password: action.payload.updatedPassword };
		case ActionsType.UPDATE_BORROWER_ATTRIBUTE:
			return { ...state, [action.payload.Attribute]: action.payload.Value };
		default:
			return state;
	}
};
export default BorrowerReducer;
