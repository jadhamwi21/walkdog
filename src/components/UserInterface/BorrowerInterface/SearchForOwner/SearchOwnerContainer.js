import React from "react";
import Styles from "../BorrowerInterface.module.css";
const SearchOwnerContainer = ({ children }) => {
	return <div className={Styles.SearchForOwnerContainer}>{children}</div>;
};

export default SearchOwnerContainer;
