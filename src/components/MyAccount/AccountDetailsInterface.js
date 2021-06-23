import React from "react";
import AccountAvatar from "./AccountAvatar";
import AccountDetails from "./AccountDetails";
const AccountDetailsInterface = ({ UserAccount }) => {
	return (
		<>
			<AccountAvatar Avatar={UserAccount.ProfilePicture} />
			<AccountDetails Account={UserAccount} />
		</>
	);
};

export default AccountDetailsInterface;
