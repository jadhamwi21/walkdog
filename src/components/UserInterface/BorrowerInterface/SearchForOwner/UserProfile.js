import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Styles from "../BorrowerInterface.module.css";
import { Button } from "@material-ui/core";
import FirebaseUtilityInstance from "../../../../services/Firebase";
import PostComponent from "./PostComponent.js";
import SeperatorDiv from "./SeperatorDiv";
import { AnimatePresence, motion } from "framer-motion";
import ActionsCreator from "../../../../actions/ActionsCreator";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import ModifiedLink from "../../../../helpers/ModifiedLink";
import LoadingPosts from "../LoadingPosts";
import { useHtmlScrollToggle } from "../../../../hooks/useHtmlScrollToggle";
const delayValuesGenerator = () => {
	let currentDelay = -0.5;
	return () => {
		currentDelay += 0.5;
		return currentDelay;
	};
};
const LoadingStatuses = {
	NO_POST: "no-post",
	LOADING_POSTS: "loading-posts",
	SHOWING_POSTS: "showing-posts",
};
const UserProfile = ({ User, CloseModal, SelectThisUserForChat }) => {
	const [posts, setPosts] = useState("");
	const [loadingStatus, setLoadingStatus] = useState();
	useEffect(() => {
		const getUserPosts = async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			setPosts(await FirebaseUtilityInstance.GetOwnerPosts(User.Email));
		};
		setLoadingStatus(LoadingStatuses.LOADING_POSTS);
		getUserPosts();
	}, []);
	useEffect(() => {
		if (posts === "") return;
		if (posts.length === 0) {
			setLoadingStatus(LoadingStatuses.NO_POST);
		} else {
			setLoadingStatus(LoadingStatuses.SHOWING_POSTS);
		}
	}, [posts]);
	useHtmlScrollToggle();
	const getCurrentDelay = delayValuesGenerator(posts);
	return ReactDOM.createPortal(
		<div className={Styles.UserProfileModalContainer}>
			<div className={Styles.UserProfileModal}>
				{/* User Profilepicture And Name */}
				<div className={Styles.UserProfileModal_Picture_Name_Container}>
					<img
						src={User.ProfilePicture}
						className={Styles.UserProfilePicture}
					/>
					<div className={Styles.NameContainer}>
						<div>
							<p>First Name : {User.FirstName}</p>
							<p>Last Name : {User.LastName}</p>
							<p>Country : {User.Location.Country}</p>
							<p>City : {User.Location.City}</p>
							<div
								style={{
									height: "fit-content",
									width: "fit-content",
								}}
							>
								<ModifiedLink
									to="/inbox"
									className={Styles.SendMessageButton}
									additionalFunction={async () => {
										SelectThisUserForChat(User.FirstName + " " + User.LastName);
										CloseModal();
										await new Promise((resolve) => setTimeout(resolve, 300));
									}}
									component={Button}
								>
									Send Message
								</ModifiedLink>
							</div>
						</div>
					</div>
				</div>

				{/* Seperator Div */}
				<SeperatorDiv />

				{/* Close Modal Button */}
				<div style={{ position: "absolute", top: "25px", right: "25px" }}>
					<Button className={Styles.Button} onClick={CloseModal}>
						Close
					</Button>
				</div>

				{/* User Posts */}
				<div className={Styles.PostsContainer}>
					<header>
						<h1>User Posts</h1>
					</header>
					<section>
						<AnimatePresence exitBeforeEnter>
							<motion.div
								key={loadingStatus}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								{loadingStatus === LoadingStatuses.NO_POST && (
									<div style={{ display: "grid", placeItems: "center" }}>
										NO POSTS
									</div>
								)}
								{loadingStatus === LoadingStatuses.LOADING_POSTS && (
									<LoadingPosts />
								)}
								{loadingStatus === LoadingStatuses.SHOWING_POSTS && (
									<div className={Styles.PostsFlex}>
										{Object.values(posts).map((post) => (
											<PostComponent
												Post={post}
												currentDelay={getCurrentDelay}
											/>
										))}
									</div>
								)}
							</motion.div>
						</AnimatePresence>
					</section>
				</div>
			</div>
		</div>,
		document.getElementById("portal")
	);
};
const mapDispatchToProps = (dispatch) => ({
	SelectThisUserForChat: (User) =>
		dispatch(ActionsCreator.selectUserForChat(User)),
});
export default connect(null, mapDispatchToProps)(UserProfile);
