import React from "react";
import SearchOwnerContainer from "./SearchOwnerContainer";
import SearchOwnerComponentsWrapper from "./SearchOwnerComponentsWrapper";
import Header from "./Header.js";
import SearchComponent from "./SearchComponent";
const SearchForOwner = () => {
	return (
		<SearchOwnerContainer>
			<SearchOwnerComponentsWrapper>
				<Header />
				<SearchComponent />
			</SearchOwnerComponentsWrapper>
		</SearchOwnerContainer>
	);
};

export default SearchForOwner;
