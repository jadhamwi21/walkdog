import React from "react";
import FilterInputComponent, { InputTypes } from "./FilterInputComponent.js";
import Styles from "../BorrowerInterface.module.css";
import FilterButton from "./FilterButton.js";
const FilterContainer = () => {
	return (
		<>
			<div className={Styles.FieldsContainer}>
				<FilterInputComponent
					name="Location"
					type={InputTypes.Location}
					placeholder={"Location"}
				/>
				<FilterInputComponent
					name="Date"
					type={InputTypes.Regular}
					placeholder="Date"
				/>
				<FilterInputComponent
					name="Duration"
					type={InputTypes.Regular}
					placeholder="Duration"
				/>
				<FilterInputComponent
					name="Cost"
					type={InputTypes.Regular}
					placeholder="Cost"
				/>
			</div>
			<FilterButton />
		</>
	);
};

export default FilterContainer;
