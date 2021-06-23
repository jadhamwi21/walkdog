import ActionsType from "../actions/ActionsType.js";
import { history } from "../index.js";
const initialState = {
	previous: "",
	current: "",
};
export const HistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionsType.UPDATE_HISTORY:
			return {
				previous: action.payload.previous,
				current: action.payload.current,
			};
		case ActionsType.INIT_HISTORY:
			return {
				previous: history.location.pathname,
				current: history.location.pathname,
			};
		default:
			return state;
	}
};
export default HistoryReducer;
