import React from "react";
import Styles from "../../Header.module.css";
const MenuIconComponent = ({ toggleHandler }) => {
	return (
		<div className={Styles.MenuIconContainer} onClick={toggleHandler}>
			<div className={Styles.MenuIconWrapper}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default MenuIconComponent;
