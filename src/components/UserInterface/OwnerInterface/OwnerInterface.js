import React, { useState } from "react";
import OwnerHeader from "./OwnerHeader";
import Styles from "./OwnerInterface.module.css";
import OwnerSelectedOptionDisplay from "./OwnerSelectedOptionDisplay.js";
export const Options_ENUMS = {
	NEWPOST: "new-post",
	DELETEPOST: "delete-post",
	EDITPOST: "edit-post",
	EMPTY: "EMPTY",
};
export const optionSelectorContext = React.createContext();
const OwnerInterface = () => {
	const [selectedOption, setSelectedOption] = useState("");
	const optionSelectionHandler = (Option) => {
		setSelectedOption(Option);
	};
	return (
		<optionSelectorContext.Provider
			value={{
				select: optionSelectionHandler,
			}}
		>
			<div className={Styles.Container}>
				<OwnerHeader selectOptionHandler={optionSelectionHandler} />
				<OwnerSelectedOptionDisplay selectedOptionByOwner={selectedOption} />
			</div>
		</optionSelectorContext.Provider>
	);
};

export default OwnerInterface;
