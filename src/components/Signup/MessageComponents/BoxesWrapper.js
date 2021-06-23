import React from "react";
import HelperBox from "./HelperBox";
import SuccessBox from "./SuccessBox";

export const BoxesWrapper = ({ Switch, Success, Handlers, HelperMessage }) => {
	return (
		<>
			{Switch === false ? null : (
				<HelperBox
					CloseBoxHandler={Handlers.closeboxHandler}
					Message={HelperMessage}
				/>
			)}
			{Success === true && <SuccessBox />}
		</>
	);
};

export default BoxesWrapper;
