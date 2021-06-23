import React, { useContext, useRef, useEffect } from "react";
import Styles from "../BorrowerInterface.module.css";
import countries from "../../../../countries.json";
import { FilterContext } from "./PostsFilteringComponent";
import LocationRow from "./LocationRow";
export const InputTypes = {
	Regular: "regular",
	Location: "location",
};
const RegularInput = ({ name, placeholder }) => {
	const { FilterInputsState, Handlers } = useContext(FilterContext);
	return (
		<input
			type="text"
			name={name}
			className={Styles.FilterInput}
			placeholder={placeholder}
			value={FilterInputsState[name]}
			autoComplete="off"
			autoCorrect="off"
			onChange={Handlers.inputfieldHandler}
		/>
	);
};
export const matchStrings = (str1, str2) => {
	return str1.toLowerCase().includes(str2.toLowerCase());
};
const LocationInput = ({ name, placeholder }) => {
	const wrapperRef = useRef();
	const inputRef = useRef();
	const { PostsFilteredState, FilterInputsState, Handlers } = useContext(
		FilterContext
	);
	const filteredCountries =
		FilterInputsState[name] !== ""
			? countries.filter((countryObject) =>
					matchStrings(countryObject.name, FilterInputsState[name])
			  )
			: countries;
	useEffect(() => {
		const DropdownHandler = (e) => {
			if (
				!wrapperRef.current.contains(e.target) &&
				FilterInputsState.List === true
			) {
				Handlers.handleClose();
			}
		};
		document.addEventListener("mousedown", DropdownHandler);
		return () => {
			document.removeEventListener("mousedown", DropdownHandler);
		};
	}, [FilterInputsState]);
	return (
		<div className={Styles.LocationInputContainer} ref={wrapperRef}>
			<input
				type="text"
				name={name}
				className={Styles.FilterInput}
				placeholder={placeholder}
				value={FilterInputsState[name]}
				onChange={(e) => Handlers.locationInputHandler(e.target.value)}
				onFocus={() => Handlers.handleOpen()}
				onKeyDown={(e) => {
					if (e.key === "Tab") {
						Handlers.handleClose();
					}
				}}
				autoComplete="off"
				autoCorrect="off"
				ref={inputRef}
			/>
			<div
				className={Styles.ResetLocationField}
				style={{
					visibility:
						PostsFilteredState["Location"] !== "" ? "visible" : "hidden",
				}}
				onClick={() => {
					Handlers.clearLocationInputs();
					Handlers.handleOpen();
					inputRef.current.focus();
				}}
			>
				x
			</div>
			<div
				className={Styles.LocationInputList}
				style={{ visibility: FilterInputsState.List ? "visible" : "hidden" }}
			>
				{filteredCountries.map((countryObject) => (
					<LocationRow
						countryObject={countryObject}
						selectedValue={FilterInputsState["LocationListSelectedValue"]}
						locationOnClickHandler={Handlers.locationInputHandler}
						handleClose={Handlers.handleClose}
					/>
				))}
			</div>
		</div>
	);
};
const FilterInputComponent = ({ type, name, placeholder }) => {
	switch (type) {
		case InputTypes.Regular:
			return <RegularInput name={name} placeholder={placeholder} />;
		case InputTypes.Location:
			return <LocationInput name={name} placeholder={placeholder} />;
	}
};

export default FilterInputComponent;
