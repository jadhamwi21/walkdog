import { SignupReducer } from "./SignupReducer.js";
import { OwnerReducer } from "./OwnerReducer.js";
import { BorrowerReducer } from "./BorrowerReducer.js";
import { combineReducers } from "redux";
import { HistoryReducer } from "./HistoryReducer.js";
import UnauthenticatedReducer from "./UnauthenticatedReducer.js";
import { RouterReducer } from "./RouterReducer.js";
import { PostReducer } from "./PostReducer.js";
import { ConversationsReducer } from "./ConversationsReducer.js";
import SamplesReducer from "./SamplesReducer.js";

export const rootReducer = combineReducers({
	Signup: SignupReducer,
	Owner: OwnerReducer,
	Borrower: BorrowerReducer,
	Unauthenticated: UnauthenticatedReducer,
	History: HistoryReducer,
	Router: RouterReducer,
	Post: PostReducer,
	Conversations: ConversationsReducer,
	Samples: SamplesReducer,
});
export default rootReducer;
