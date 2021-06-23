import React, { useState } from "react";
import MenuComponent from "./MenuComponent";
import MenuIconComponent from "./MenuIconComponent";

const UserNavigationMINI = () => {
	const [open, setOpen] = useState(false);
	const menuToggleHandler = () => {
		setOpen((open) => !open);
	};
	return (
		<>
			<MenuIconComponent toggleHandler={menuToggleHandler} />
			<MenuComponent shouldOpen={open} toggleHandler={menuToggleHandler} />
		</>
	);
};

export default UserNavigationMINI;
