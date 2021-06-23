import React, { useContext } from "react";
import Styles from "../BorrowerInterface.module.css";
import { FilterContext } from "./PostsFilteringComponent.js";
import PostCard from "./PostCard.js";
import { AnimatePresence, motion } from "framer-motion";
import LoadingPosts from "../LoadingPosts";
import NoResultsFoundComponent from "./NoResultsFoundComponent";
const FilteredPosts = () => {
	const {
		PostsFilteredState: { loading, data, error, currentStatus },
	} = useContext(FilterContext);
	console.log(data);
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				className={Styles.FilteredPostsContainer}
				key={currentStatus}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				{loading && <LoadingPosts />}
				{error && <div>{error}</div>}
				{data !== "init" && data.length !== 0 ? (
					<div className={Styles.FilteredPostsWrapper}>
						{data.map((post) => {
							return <PostCard Post={post} />;
						})}
					</div>
				) : (
					data !== "init" && <NoResultsFoundComponent />
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default FilteredPosts;
