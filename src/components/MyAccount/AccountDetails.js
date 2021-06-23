import React from "react";
import { FirstLetterCapitalizer } from "../../helpers/Functions";
import Styles from "./MyAccount.module.css";
const AccountDetails = ({ Account }) => {
	return (
		<div className={Styles.DetailsWrapper}>
			<div>
				<b>First Name</b> : {Account.FirstName}
			</div>
			<div>
				<b>Last Name</b> : {Account.LastName}
			</div>
			<div>
				<b>Email</b> : {Account.Email}
			</div>
			<div>
				<b>Country</b>: {Account.Location.Country}
			</div>
			<div>
				<b>City</b> : {Account.Location.City}
			</div>
			<div>
				<b>Account Type</b> : {FirstLetterCapitalizer(Account.UserType)}
			</div>
		</div>
	);
};

export default AccountDetails;
