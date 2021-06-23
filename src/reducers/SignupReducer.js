import { ActionsType } from "../actions/ActionsType.js";
export const NewVisitor_Choice = {
	BORROWER: "borrower",
	OWNER: "owner",
	UNSCPECIFIED: "unspecified",
};
const initialState = {
	Type: NewVisitor_Choice.UNSCPECIFIED,
};
export const SignupReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionsType.BORROWER_SIGNUP:
			return { Type: NewVisitor_Choice.BORROWER };
		case ActionsType.OWNER_SIGNUP:
			return { Type: NewVisitor_Choice.OWNER };
		case ActionsType.UNSPECIFIED_SIGNUP:
			return { Type: NewVisitor_Choice.UNSCPECIFIED };
		default:
			return state;
	}
};
export default SignupReducer;
