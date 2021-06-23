import React from "react";
import Styles from "./BorrowerInterface.module.css";
import MinHeightAdjuster from "./PostsFilteringComponent/MinHeightAdjuster.js";
const LoadingPosts = () => {
	return (
		<MinHeightAdjuster>
			<div className={Styles.Loader}></div>
		</MinHeightAdjuster>
	);
};

export default LoadingPosts;
