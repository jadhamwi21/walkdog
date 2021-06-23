import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer.js";
export const store = createStore(
	rootReducer,
	undefined,
	applyMiddleware(thunk)
);
store.subscribe(() => console.log(store.getState()));
export default store;
