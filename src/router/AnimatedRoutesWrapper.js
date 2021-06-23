import React from "react";
import { Switch } from "react-router";
const AnimatedRoutesWrapper = ({ children, keyframe }) => {
	return (
		<div>
			<Switch>{children}</Switch>
		</div>
	);
};

export default AnimatedRoutesWrapper;
