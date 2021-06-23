import Styles from "../OwnerInterface.module.css";
import React, { useContext } from "react";
import { editPostContext } from "./PostComponent";
import InputField from "./InputField";
import RightArrow from "../../../../assets/ArrowRight.png";
import { Button, Typography, useMediaQuery } from "@material-ui/core";
const ModalRightDiv = () => {
	const { Inputs, Handlers, AddStylesForInvalid } = useContext(editPostContext);
	const isMobile = useMediaQuery("(max-width:764px)");
	return (
		<div className={Styles.ModalRightDiv}>
			<div className={Styles.ModalRightDivFormContainer}>
				<InputField
					type="text"
					className={Styles.InputField}
					value={Inputs["DogType"]}
					name="DogType"
					onChange={Handlers.inputHandler}
					style={{ ...AddStylesForInvalid("DogType") }}
					width={isMobile ? "100%" : "90%"}
					placeholder="Dog Type"
				/>
				<InputField
					type="text"
					className={Styles.InputField}
					value={Inputs["DogName"]}
					name="DogName"
					onChange={Handlers.inputHandler}
					style={{ ...AddStylesForInvalid("DogName") }}
					width={isMobile ? "100%" : "90%"}
					placeholder="Dog Name"
				/>
				<div
					style={{
						display: "flex",
						flexDirection: isMobile ? "column" : "row",
						justifyContent: "space-between",
						alignItems: "center",
						width: isMobile ? "100%" : "90%",
					}}
				>
					<InputField
						type="text"
						className={Styles.InputField}
						value={Inputs["DayOfBorrow"]}
						name="DayOfBorrow"
						onChange={Handlers.inputHandler}
						style={{ ...AddStylesForInvalid("DayOfBorrow") }}
						width={isMobile ? "100%" : "28%"}
						maxlength="2"
						placeholder="DD"
						withError
					/>
					<InputField
						type="text"
						className={Styles.InputField}
						value={Inputs["MonthOfBorrow"]}
						name="MonthOfBorrow"
						onChange={Handlers.inputHandler}
						style={{ ...AddStylesForInvalid("MonthOfBorrow") }}
						width={isMobile ? "100%" : "28%"}
						maxlength="2"
						placeholder="MM"
						withError
					/>
					<InputField
						type="text"
						className={Styles.InputField}
						value={Inputs["YearOfBorrow"]}
						name="YearOfBorrow"
						onChange={Handlers.inputHandler}
						style={{ ...AddStylesForInvalid("YearOfBorrow") }}
						width={isMobile ? "100%" : "28%"}
						maxlength="4"
						placeholder="YY"
						withError
					/>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: isMobile ? "center" : "space-between",
						alignItems: "center",
						width: isMobile ? "100%" : "90%",
					}}
				>
					<InputField
						type="text"
						className={Styles.InputField}
						value={Inputs["Cost"]}
						name="Cost"
						onChange={Handlers.inputHandler}
						style={{ ...AddStylesForInvalid("Cost") }}
						width="58%"
						placeholder="Cost"
					/>
					<select
						name="Currency"
						onChange={Handlers.inputHandler}
						value={Inputs["Currency"]}
						className={Styles.CurrencySelector}
						style={{ width: "26%" }}
					>
						<option value="dollar">$</option>
						<option value="euro">€</option>
						<option value="pound">£</option>
					</select>
				</div>
				<div
					style={{
						width: isMobile ? "100%" : "90%",
						height: isMobile ? "fit-content" : "60px",
						display: "flex",
						flexDirection: isMobile ? "column" : "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<InputField
						type="time"
						name="StartingDuration"
						withError
						width={isMobile ? "100%" : "35%"}
					/>
					<img
						src={RightArrow}
						style={{
							height: "70%",
							width: "14%",
							transform: isMobile ? "rotateZ(90deg)" : "initial",
						}}
					/>
					<InputField
						type="time"
						name="EndingDuration"
						withError
						width={isMobile ? "100%" : "35%"}
					/>
				</div>

				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography variant="subtitle1" className={Styles.AggresiveText}>
						Aggressive
					</Typography>
					<input
						type="checkbox"
						style={{ margin: "0px", marginLeft: "20px" }}
						name="Aggresive"
						checked={Inputs.Aggresive}
						onClick={Handlers.checkboxHandler}
					/>
				</div>

				<Button className={Styles.SaveButton} onClick={Handlers.submitHandler}>
					Save
				</Button>
			</div>
		</div>
	);
};

export default ModalRightDiv;
