import React, { useEffect, useLayoutEffect } from "react";
import Styles from "./Homepage.module.css";
import { Landing } from "./Landing/Landing.js";
import { GettingStarted } from "./GettingStarted/GettingStarted.js";
import { useDispatch } from "react-redux";
import ActionsCreator from "../../actions/ActionsCreator";
import useHistoryTracker from "../../hooks/useHistoryTracker";
import AnimatedComponentWrapper from "../../router/AnimatedComponentWrapper";
const Homepage = () => {
	const ReduxDispatch = useDispatch();
	useEffect(() => {
		ReduxDispatch(ActionsCreator.resetLoggingOut());
	}, []);
	useHistoryTracker({
		from: "/signup",
		to: "/home",
		id: "cards-reference",
	});
	return (
		<AnimatedComponentWrapper>
			<div className={Styles.HomepageContainer}>
				<Landing />
				<GettingStarted />
			</div>
		</AnimatedComponentWrapper>
	);
};
export default Homepage;
