import React from "react";
import Styles from "../BorrowerInterface.module.css";
import ResultList from "./ResultList";
const SearchResult = ({ QueryResult, isSearching, Query }) => {
	return (
		<div className={Styles.SearchResultContainer}>
			{isSearching && <div>Searching..</div>}
			{QueryResult !== "" && Query !== "" && QueryResult.length === 0 && (
				<div>No Match</div>
			)}
			{QueryResult !== "" && QueryResult.length !== 0 && (
				<ResultList Result={QueryResult} />
			)}
		</div>
	);
};

export default SearchResult;
