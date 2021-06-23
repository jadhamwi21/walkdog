import React from "react";
import FilteringHeader from "./FilteringHeader";
import FilterContainer from "./FilterContainer";
import useFilter from "../../../../hooks/useFilter";
import FilteredPosts from "./FilteredPosts.js";
export const FilterContext = React.createContext();
const PostsFilteringComponent = () => {
	const [FilterInputsState, PostsFilteredState, Handlers] = useFilter();
	return (
		<FilterContext.Provider
			value={{
				FilterInputsState: FilterInputsState,
				Handlers: Handlers,
				PostsFilteredState: PostsFilteredState,
			}}
		>
			<FilteringHeader />
			<FilterContainer />
			<FilteredPosts />
		</FilterContext.Provider>
	);
};

export default PostsFilteringComponent;
