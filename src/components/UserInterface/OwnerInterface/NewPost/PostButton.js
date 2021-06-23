import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import Styles from "../OwnerInterface.module.css";
import { FormContext } from "./NewPost";
const PostButton = () => {
	const { Loading } = useContext(FormContext);
	return (
		<div
			style={{
				width: "fit-content",
				height: "fit-content",
				margin: "20px auto",
			}}
		>
			<Button className={Styles.PostButton} type="submit">
				{Loading ? "Posting" : "Post"}
			</Button>
		</div>
	);
};

export default PostButton;
