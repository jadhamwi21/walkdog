import React, { useEffect } from "react";
import Styles from "../BorrowerInterface.module.css";
const SearchField = ({ onChange, value }) => {
	return (
		<div className={Styles.SearchFieldContainer}>
			<input
				type="text"
				placeholder="Owner Name"
				onChange={onChange}
				value={value}
			/>
		</div>
	);
};

export default SearchField;
