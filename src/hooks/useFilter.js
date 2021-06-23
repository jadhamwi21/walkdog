import { useState, useEffect, useReducer } from "react";
import { FirebaseUtilityInstance } from "../services/Firebase";
const FilteredPostsActions = {
	SEND_REQUEST: "sen-request",
	RESPONSE_RECEIVED: "response-received",
	RESPONSE_ERROR: "response-error",
};
const FilterInputsActions = {
	UPDATE_LOCATION_INPUT: "update-location-input",
	UPDATE_REGULAR_INPUT: "update-regular-input",
	OPEN_LIST: "open-list",
	CLOSE_LIST: "close-list",
};
const FilteredPostsReducer = (state, action) => {
	switch (action.type) {
		case FilteredPostsActions.SEND_REQUEST:
			return {
				...state,
				loading: true,
				data: "init",
				currentStatus: action.type,
			};
		case FilteredPostsActions.RESPONSE_RECEIVED:
			return {
				...state,
				loading: false,
				data: action.payload.posts,
				error: "",
				currentStatus: action.type,
			};
		case FilteredPostsActions.RESPONSE_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload.errorMessage,
				currentStatus: action.type,
			};
		default:
			return state;
	}
};
const FilterInputsReducer = (state, action) => {
	switch (action.type) {
		case FilterInputsActions.UPDATE_LOCATION_INPUT:
			return {
				...state,
				LocationListSelectedValue: action.payload.locationValue,
				Location: action.payload.locationValue,
			};
		case FilterInputsActions.UPDATE_REGULAR_INPUT:
			return { ...state, ...action.payload.keyvalueObject };
		case FilterInputsActions.OPEN_LIST:
			return { ...state, List: true };
		case FilterInputsActions.CLOSE_LIST:
			return { ...state, List: false };
	}
};
const useFilter = () => {
	const [PostsFilteringState, PostsFilteredDispatch] = useReducer(
		FilteredPostsReducer,
		{
			loading: false,
			data: "init",
			error: "",
			currentStatus: "",
		}
	);
	const [FilterInputsState, FilterInputsDispatch] = useReducer(
		FilterInputsReducer,
		{
			List: false,
			Location: "",
			LocationListSelectedValue: "",
			Duration: "",
			Cost: "",
			Date: "",
		}
	);
	useEffect(() => {
		const getFilteredPostsByDateAndTime = async () => {
			PostsFilteredDispatch({ type: FilteredPostsActions.SEND_REQUEST });
			const postsSorted = await FirebaseUtilityInstance.GetAllPostsOrderedByDateAndTime();
			await new Promise((resolve) => setTimeout(resolve, 2000));
			PostsFilteredDispatch({
				type: FilteredPostsActions.RESPONSE_RECEIVED,
				payload: { posts: postsSorted },
			});
		};
		getFilteredPostsByDateAndTime();
	}, []);

	const Handlers = {
		locationInputHandler: (value) => {
			FilterInputsDispatch({
				type: FilterInputsActions.UPDATE_LOCATION_INPUT,
				payload: { locationValue: value },
			});
		},
		searchHandler: () => {
			const getFilteredPostsByInput = async () => {
				PostsFilteredDispatch({ type: FilteredPostsActions.SEND_REQUEST });
				const postsFilteredByInput = await FirebaseUtilityInstance.FilterPostsBy(
					FilterInputsState
				);
				PostsFilteredDispatch({
					type: FilteredPostsActions.RESPONSE_RECEIVED,
					payload: { posts: postsFilteredByInput },
				});
			};
			getFilteredPostsByInput();
		},
		handleClose: () =>
			FilterInputsDispatch({ type: FilterInputsActions.CLOSE_LIST }),
		handleOpen: () =>
			FilterInputsDispatch({ type: FilterInputsActions.OPEN_LIST }),
		clearLocationInputs: () =>
			FilterInputsDispatch({
				type: FilterInputsActions.UPDATE_LOCATION_INPUT,
				payload: { locationValue: "" },
			}),
		inputfieldHandler: (e) =>
			FilterInputsDispatch({
				type: FilterInputsActions.UPDATE_REGULAR_INPUT,
				payload: {
					keyvalueObject: {
						[e.target.name]: e.target.value,
					},
				},
			}),
	};
	console.log(FilterInputsState);
	console.log(PostsFilteringState);
	return [FilterInputsState, PostsFilteringState, Handlers];
};

export default useFilter;
