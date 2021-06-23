import React from "react";
import Styles from "./PostFallback.module.css";
import ModifiedLink from "../../../helpers/ModifiedLink";
const PostFallbackComponent = () => {
	return (
		<div className={Styles.PostFallbackContainer}>
			<div className={Styles.Flexbox}>
				<div>You're Not Signed In</div>
				<ModifiedLink to="/signin" className={Styles.Link}>
					Sign In
				</ModifiedLink>
			</div>
		</div>
	);
};

export default PostFallbackComponent;
