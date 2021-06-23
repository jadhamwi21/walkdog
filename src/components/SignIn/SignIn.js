import React, { useLayoutEffect } from "react";
import Header from "./Header/Header";
import Form from "./Form/Form.js";
import Styles from "./Signin.module.css";
import { SignInFinish } from "./SignInFinish/SignInFinish.js";
import { motion } from "framer-motion";
import AnimatedComponentWrapper from "../../router/AnimatedComponentWrapper";
export const SignIn = () => {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<AnimatedComponentWrapper className={Styles.Container}>
			<div className={Styles.FormContainer}>
				<Header />
				<Form />
				<SignInFinish />
			</div>
		</AnimatedComponentWrapper>
	);
};

export default SignIn;
