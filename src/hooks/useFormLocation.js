import { useReducer, useState, useEffect } from "react";
import { API_KEY, ReverseGeocodingAPI_Endpoint } from "../API/LocationAPI.js";
import axios from "axios";
const Actions = {
	REQUEST: "request",
	RETRIEVE: "retrieve",
	ERROR: "error",
};
const reducer = (state, action) => {
	switch (action.type) {
		case Actions.REQUEST:
			return {
				...state,
				error: "",
				loading: true,
				reversegeocodingresult: {},
			};
		case Actions.RETRIEVE:
			return {
				...state,
				loading: false,
				reversegeocodingresult: action.payload.results,
			};
		case Actions.ERROR:
			return { ...state, loading: false, error: action.payload.errorMessage };
	}
};
const importReceivedDataIntoTheFinalObject = (ReceivedData) => {
	const ReceivedDataAddress = ReceivedData.address;
	const { lon, lat } = ReceivedData;
	const { country, state, country_code } = ReceivedDataAddress;
	console.log(ReceivedData);
	const finalObject = {
		Country: country,
		City: state,
		Longitude: lon,
		Latitude: lat,
		CountryCode: country_code,
	};
	return finalObject;
};
export const useFormLocation = () => {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		reversegeocodingresult: {},
		error: "",
	});
	const [clicked, setClicked] = useState(false);
	const onClickHandler = () => {
		setClicked((prevClickStatus) => !prevClickStatus);
	};
	useEffect(() => {
		if (clicked === false) return;
		dispatch({ type: Actions.REQUEST });
		navigator.geolocation.getCurrentPosition(
			(response) => {
				const { longitude, latitude } = response.coords;
				axios
					.get(ReverseGeocodingAPI_Endpoint, {
						params: {
							lat: latitude,
							lon: longitude,
							key: API_KEY,
							format: "json",
						},
					})
					.then(async (result) => {
						const { data } = result;
						const wantedData = importReceivedDataIntoTheFinalObject(data);
						await new Promise((resolve) => setTimeout(resolve, 1000));
						dispatch({
							type: Actions.RETRIEVE,
							payload: { results: wantedData },
						});
					})
					.catch(async (e) => {
						await new Promise((resolve) => setTimeout(resolve, 1000));
						dispatch({
							type: Actions.ERROR,
							payload: { errorMessage: e.message },
						});
					});
			},
			() => {
				dispatch({
					type: Actions.ERROR,
					payload: {
						errorMessage: "Couldn't Fetch Location,Try With Another Browser",
					},
				});
			}
		);
		setClicked((prevClickStatus) => !prevClickStatus);
	}, [clicked]);
	return {
		Loading: state.loading,
		error: state.error,
		Location: state.reversegeocodingresult,
		ClickHandler: onClickHandler,
	};
};

export default useFormLocation;
