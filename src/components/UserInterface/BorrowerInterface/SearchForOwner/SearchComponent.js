import React from "react";
import SearchField from "./SearchField";
import Styles from "../BorrowerInterface.module.css";
import SearchResult from "./SearchResult";
import useSearchOwner from "../../../../hooks/useSearchOwner";
const SearchComponent = () => {
	const { Query, onChangeHandler, QueryResult, isSearching } = useSearchOwner();
	return (
		<div className={Styles.SearchWrapper}>
			<SearchField onChange={onChangeHandler} value={Query} />
			<SearchResult
				QueryResult={QueryResult}
				isSearching={isSearching}
				Query={Query}
			/>
		</div>
	);
};

export default SearchComponent;
