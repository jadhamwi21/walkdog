import React, { useContext } from "react";
import InputField from "./InputField.js";
import Styles from "../OwnerInterface.module.css";
import { FormContext } from "./NewPost.js";
import { Currency_Enum } from "../../../../helpers/Functions.js";
const CostComponent = () => {
	const { Inputs, Handlers } = useContext(FormContext);
	return (
		<div className={Styles.CostComponentWrapper}>
			<InputField
				name="Cost"
				placeholder="Cost"
				width="70%"
				style={{ margin: "0px" }}
			/>
			<select
				value={Inputs["Currency"]}
				className={Styles.CurrencySelector}
				name="Currency"
				onChange={Handlers.inputHandler}
			>
				<option value={Currency_Enum.DOLLAR}>$</option>
				<option value={Currency_Enum.EURO}>€</option>
				<option value={Currency_Enum.POUND}>£</option>
			</select>
		</div>
	);
};

export default CostComponent;
