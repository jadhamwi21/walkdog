import React from "react";
import { AvailableInterfaces } from "./UserAccount";
import Styles from "./MyAccount.module.css";
import InterfacesSwitchButton from "./InterfacesSwitchButton";
const AccountInterfacesSwitch = ({ CurrentInterface, InterfaceSetter }) => {
	const InterfaceSwitchButtonsGenerator = () => {
		const InterfacesENUM_For_State = Object.values(AvailableInterfaces);
		const Interfaces = [
			"Account Details",
			"Edit Account Details",
			"Change Password",
		];
		return Interfaces.map((Interface, index) => (
			<InterfacesSwitchButton
				SwitchTo={() => InterfaceSetter(InterfacesENUM_For_State[index])}
				isSelected={InterfacesENUM_For_State[index] === CurrentInterface}
			>
				{Interface}
			</InterfacesSwitchButton>
		));
	};
	return (
		<div className={Styles.InterfacesSwitchContainer}>
			{InterfaceSwitchButtonsGenerator()}
		</div>
	);
};

export default AccountInterfacesSwitch;
