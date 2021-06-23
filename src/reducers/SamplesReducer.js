import ActionsType from "../actions/ActionsType";

const initialState = {
	SamplesList: [],
};

const SamplesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionsType.UPDATE_SAMPLES_LIST:
			return { ...state, SamplesList: action.payload.newSamplesList };
		default:
			return state;
	}
};

export default SamplesReducer;
