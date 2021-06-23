import ActionsType from "../actions/ActionsType.js";
const initialState = {
	storedPost: {},
};
export const PostReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionsType.STORE_POST_DETAILS:
			return {
				...state,
				storedPost: {
					...action.payload.post,
				},
			};
		case ActionsType.REMOVE_STORED_POST:
			return { ...state, storedPost: {} };
		default:
			return state;
	}
};
