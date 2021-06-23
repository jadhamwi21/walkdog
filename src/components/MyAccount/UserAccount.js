import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import AccountDetailsInterface from "./AccountDetailsInterface";
import EditAccountDetailsInterface from "./EditAccountDetailsInterface";
import ChangeAccountPasswordInterface from "./ChangeAccountPasswordInterface";
import Styles from "./MyAccount.module.css";
import AccountInterfacesSwitch from "./AccountInterfacesSwitch";
export const AvailableInterfaces = {
	AccountDetails: 0,
	EditAccountDetails: 1,
	ChangePassword: 2,
};
const RenderInterface = (SelectedInterface, UserAccount, InterfaceSelecter) => {
	const accountProps = { UserAccount: UserAccount };
	if (SelectedInterface === AvailableInterfaces.AccountDetails) {
		return <AccountDetailsInterface {...accountProps} />;
	} else if (SelectedInterface === AvailableInterfaces.EditAccountDetails) {
		return (
			<EditAccountDetailsInterface
				{...accountProps}
				GoBack={() => InterfaceSelecter(AvailableInterfaces.AccountDetails)}
			/>
		);
	} else {
		return (
			<ChangeAccountPasswordInterface
				{...accountProps}
				GoBack={() => InterfaceSelecter(AvailableInterfaces.AccountDetails)}
			/>
		);
	}
};
const UserAccount = ({ UserAccount }) => {
	const [selectedInterface, setSelectedInterface] = useState(
		AvailableInterfaces.AccountDetails
	);
	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className={Styles.UserAccountWrapper}
				key={selectedInterface}
			>
				{RenderInterface(selectedInterface, UserAccount, setSelectedInterface)}
				<AccountInterfacesSwitch
					CurrentInterface={selectedInterface}
					InterfaceSetter={setSelectedInterface}
				/>
			</motion.div>
		</AnimatePresence>
	);
};
export default UserAccount;
