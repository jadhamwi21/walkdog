import React from "react";
import useHistoryTracker from "../../../hooks/useHistoryTracker";
import Styles from "./BorrowerInterface.module.css";
import LandingImage from "./LandingImage/LandingImage";
import PostsFilteringComponent from "./PostsFilteringComponent/PostsFilteringComponent";
import SearchForOwner from "./SearchForOwner/SearchForOwner";
export const BorrowerInterface = () => {
	useHistoryTracker({
		from: "/posts",
		to: "/mainpage",
		id: "filtercomponentheader",
	});
	return (
		<div className={Styles.BorrowerInterfaceContainer}>
			<SearchForOwner />
			<LandingImage />
			<PostsFilteringComponent />
		</div>
	);
};

export default BorrowerInterface;
