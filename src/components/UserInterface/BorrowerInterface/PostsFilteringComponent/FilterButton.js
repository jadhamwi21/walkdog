import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import Styles from "../BorrowerInterface.module.css";
import { FilterContext } from "./PostsFilteringComponent";
const FilterButton = () => {
	const { Handlers } = useContext(FilterContext);
	return (
		<div className={Styles.FilterButtonWrapper}>
			<Button className={Styles.FilterButton} onClick={Handlers.searchHandler}>
				Filter
			</Button>
		</div>
	);
};

export default FilterButton;
