import { useReducer, useEffect, useRef } from "react";
import FirebaseUtilityInstance from "../services/Firebase";
const ACTIONS = {
	UPDATE_SEARCH_VALUE: "update-search-value",
	UPDATE_SEARCH_RESULT: "update-search-result",
	START_SEARCHING: "start-searching",
	STOP_SEARCHING: "stop-searching",
};
const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.UPDATE_SEARCH_VALUE:
			return { ...state, SearchValue: action.payload.searchValue };
		case ACTIONS.UPDATE_SEARCH_RESULT:
			return { ...state, SearchResult: action.payload.searchResult };
		case ACTIONS.START_SEARCHING:
			return { ...state, Search: true, SearchResult: "" };
		case ACTIONS.STOP_SEARCHING:
			return { ...state, Search: false };
		default:
			return state;
	}
};
const useSearchOwner = () => {
	const [{ SearchValue, SearchResult, Search }, dispatch] = useReducer(
		reducer,
		{
			SearchValue: "",
			SearchResult: "",
			Search: false,
		}
	);
	const isFirstRender = useRef(true);
	const onChangeHandler = (e) =>
		dispatch({
			type: ACTIONS.UPDATE_SEARCH_VALUE,
			payload: { searchValue: e.target.value },
		});
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		dispatch({ type: ACTIONS.START_SEARCHING });
		const DispatchQueryByResult = async () => {
			const ArrayOfOwners = await FirebaseUtilityInstance.SearchOwnerResult(
				SearchValue
			);

			dispatch({
				type: ACTIONS.UPDATE_SEARCH_RESULT,
				payload: { searchResult: ArrayOfOwners },
			});
			dispatch({ type: ACTIONS.STOP_SEARCHING });
			return () => {
				FirebaseUtilityInstance.SearchOwnerCleanup();
			};
		};
		const cleanupToken = setTimeout(DispatchQueryByResult, 1000);
		return () => {
			clearTimeout(cleanupToken);
		};
	}, [SearchValue]);
	return {
		onChangeHandler: onChangeHandler,
		Query: SearchValue,
		QueryResult: SearchResult,
		isSearching: Search,
	};
};

export default useSearchOwner;
