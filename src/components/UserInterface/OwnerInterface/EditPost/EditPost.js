import React from "react";
import { connect } from "react-redux";
import Styles from "../OwnerInterface.module.css";
import PostComponent from "./PostComponent.js";
import NoPosts from "./NoPosts.js";
const EditPost = ({ PostsArray }) => {
	const stylesIfPostsArrayLengthIsZero = (() => {
		if (PostsArray.length === 0) {
			return {
				display: "grid",
				placeItems: "center",
			};
		}
		if (PostsArray.length !== 0) {
			return {};
		}
	})();
	return (
		<div
			className={Styles.EditPostContainer}
			style={stylesIfPostsArrayLengthIsZero}
		>
			{PostsArray.length !== 0 ? (
				<>
					{PostsArray.map((Post) => (
						<PostComponent Post={Post} key={Object.values(Post).join("")} />
					))}
				</>
			) : (
				<NoPosts />
			)}
		</div>
	);
};
const mapStateToProps = (state) => ({
	PostsArray:
		state.Owner.Posts === undefined ? [] : Object.values(state.Owner.Posts),
});
export default connect(mapStateToProps)(EditPost);
