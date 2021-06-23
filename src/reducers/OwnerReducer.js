import { ActionsType } from "../actions/ActionsType.js";
const initialState = {};

export const OwnerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionsType.OWNER_LOGIN:
			return { ...action.payload.user };
		case ActionsType.OWNER_LOGOUT:
			return {};
		case ActionsType.ADD_NEW_POST:
			return { ...state, Posts: { ...state.Posts, ...action.payload.newPost } };
		case ActionsType.UPDATE_OLD_POST:
			return {
				...state,
				Posts: { ...state.Posts, ...action.payload.editedPost },
			};
		case ActionsType.DELETE_POST: {
			const newPostsObject = { ...state.Posts };
			delete newPostsObject[action.payload.deletedPostID];
			return { ...state, Posts: { ...newPostsObject } };
		}
		case ActionsType.UPDATE_OWNER_PASSWORD:
			return { ...state, Password: action.payload.updatedPassword };
		case ActionsType.UPDATE_OWNER_ATTRIBUTE:
			return { ...state, [action.payload.Attribute]: action.payload.Value };
		default:
			return state;
	}
};
export default OwnerReducer;
