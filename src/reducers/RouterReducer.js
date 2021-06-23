import { ActionsType } from "../actions/ActionsType.js";
const initialState = {
	keyframe: "FadeIn",
};
export const RouterReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionsType.ANIMATE_IN:
			return { keyframe: "FadeIn" };
		case ActionsType.ANIMATE_OUT:
			return { keyframe: "FadeOut" };
		default:
			return state;
	}
};

export default RouterReducer;
