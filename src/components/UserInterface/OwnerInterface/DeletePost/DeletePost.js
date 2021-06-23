import React, { useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Styles from "../OwnerInterface.module.css";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { FormatDurationTo_12HourFormat } from "../../../../helpers/Functions";
import FirebaseUtilityInstance from "../../../../services/Firebase";
import ActionsCreator from "../../../../actions/ActionsCreator";
import LoadingIndicator from "../EditPost/LoadingIndicator.js";
import ConfirmationModal from "./ConfirmationModal";
import NoPosts from "../EditPost/NoPosts.js";
const DeletePost = ({ PostsArray, deletePost }) => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
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
	const YesHandler = async (post) => {
		setModal((prevModalState) => !prevModalState);
		setLoading((prevLoadingState) => !prevLoadingState);
		const deleteClickedPost = async () => {
			const deletedPostID = await FirebaseUtilityInstance.DeletePostForLoggedInUser(
				post
			);
			deletePost(deletedPostID);
		};
		await deleteClickedPost();
		setLoading((prevLoadingState) => !prevLoadingState);
	};
	const NoHandler = () => {
		setModal((prevModalState) => !prevModalState);
	};
	return (
		<div
			className={Styles.EditPostContainer}
			style={stylesIfPostsArrayLengthIsZero}
		>
			{PostsArray.length !== 0 ? (
				<>
					{PostsArray.map((Post) => (
						<>
							<Card className={Styles.Card} key={Object.values(Post).join("")}>
								<CardContent className={Styles.CardContent}>
									<div className={Styles.DogPictureWrapper}>
										<img
											src={Post.DogPicture}
											className={Styles.DogPictureInCard}
										/>
									</div>
									<Typography variant="h5">
										Dog Name : {Post.DogName}
									</Typography>
									<Typography variant="h5">
										Date : {Post.DayOfBorrow}/{Post.MonthOfBorrow}/
										{Post.YearOfBorrow}
									</Typography>
									<Typography variant="h5">
										Duration :{" "}
										{FormatDurationTo_12HourFormat(Post.StartingDuration)}
										{" - "} {FormatDurationTo_12HourFormat(Post.EndingDuration)}
									</Typography>
									<Button
										className={Styles.DeleteButton}
										onClick={() => setModal(true)}
									>
										Delete
									</Button>
								</CardContent>
							</Card>
							{modal &&
								ReactDOM.createPortal(
									<ConfirmationModal
										yesHandler={YesHandler}
										noHandler={NoHandler}
										Post={Post}
									/>,
									document.getElementById("portal")
								)}
						</>
					))}
				</>
			) : (
				<NoPosts />
			)}

			{loading &&
				ReactDOM.createPortal(
					<LoadingIndicator />,
					document.getElementById("portal")
				)}
		</div>
	);
};
const mapStateToProps = (state) => ({
	PostsArray:
		state.Owner.Posts === undefined ? [] : Object.values(state.Owner.Posts),
});
const mapDispatchToProps = (dispatch) => ({
	deletePost: (post) => dispatch(ActionsCreator.deletePostToUser(post)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeletePost);
