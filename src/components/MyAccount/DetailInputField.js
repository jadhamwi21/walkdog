import React from "react";
import Styles from "./MyAccount.module.css";
const DetailInputField = ({ label, name, select, value, onChange }) => {
	return (
		<tr>
			<td>{label}</td>
			<td>
				{!select ? (
					<input type="text" name={name} value={value} onChange={onChange} />
				) : (
					<div className={Styles.AccountTypesContainer}>
						<div className={Styles.AccountTypeIndividualWrapper}>
							<input
								type="radio"
								name={name}
								value="owner"
								checked={"owner" === value}
								onChange={onChange}
							/>
							<span>Owner</span>
						</div>
						<div className={Styles.AccountTypeIndividualWrapper}>
							<input
								type="radio"
								name={name}
								value="borrower"
								checked={"borrower" === value}
								onChange={onChange}
							/>
							<span>Borrower</span>
						</div>
					</div>
				)}
			</td>
		</tr>
	);
};

export default DetailInputField;
