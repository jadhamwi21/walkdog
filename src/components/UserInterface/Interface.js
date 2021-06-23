import React from "react";
import { NewVisitor_Choice } from "../../reducers/SignupReducer.js";
import BorrowerInterface from "./BorrowerInterface/BorrowerInterface.js";
import OwnerInterface from "./OwnerInterface/OwnerInterface.js";
const Interface = ({ Type }) => {
	return (
		<>
			{Type === NewVisitor_Choice.OWNER ? (
				<OwnerInterface />
			) : (
				<BorrowerInterface />
			)}
		</>
	);
};

export default Interface;
