import React from "react";
import ModifiedLink from "../../../helpers/ModifiedLink.js";
import Styles from "../Signin.module.css";
export const SignInFinish = () => {
	return (
		<div className={Styles.SignInFinishContainer}>
			<div className={Styles.SignInFinishFlexItem}>Not A Member ? </div>
			<div className={Styles.SignInFinishFlexItem}>
				<ModifiedLink to="/signup" className={Styles.SignUpLink}>
					Sign Up
				</ModifiedLink>
			</div>
		</div>
	);
};

export default SignInFinish;
