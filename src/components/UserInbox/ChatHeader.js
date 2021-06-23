import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Styles from "./UserInbox.module.css";
import HeaderLastActiveComponent from "./HeaderLastActiveComponent";
import { useMediaQuery } from "@material-ui/core";
import ActionsCreator from "../../actions/ActionsCreator";
const ChatHeader = ({
	SelectedUser,
	ProfilePictureOfThisUser,
	SelectedUserState,
	IsDifferentRoute,
	backButtonHandler,
}) => {
	const SelectedUserDeterminer = IsDifferentRoute === true ? "" : SelectedUser;
	const isMatch = useMediaQuery("(max-width: 764px)");
	return (
		<div
			className={Styles.ChatTextDiv}
			style={SelectedUserDeterminer !== "" ? { display: "block" } : {}}
		>
			<div>
				{SelectedUserDeterminer === "" ? (
					"Chat"
				) : (
					<div className={Styles.SelectedUserDetailsWrapper}>
						{isMatch && (
							<div onClick={backButtonHandler} style={{ marginLeft: "1em" }}>
								back
							</div>
						)}
						<div className={Styles.HeaderSelectedUserImageDiv}>
							<img src={ProfilePictureOfThisUser(SelectedUserDeterminer)} />
						</div>
						<div className={Styles.SelectedUserAndPresenceDiv}>
							<div>{SelectedUserDeterminer}</div>
							<div style={{ color: "white" }}>
								<HeaderLastActiveComponent
									SelectedUserState={SelectedUserState(SelectedUserDeterminer)}
								/>{" "}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	ProfilePictureOfThisUser: (selectedUser) =>
		state.Conversations.profilePictures[selectedUser],
	SelectedUserState: (selectedUser) =>
		state.Conversations.usersLastActiveState[selectedUser],
	IsDifferentRoute: state.Conversations.UserSelectedFromDifferentRoute,
});
const mapDispatchToProps = (dispatch) => ({
	backButtonHandler: () => dispatch(ActionsCreator.setSelectedUser("")),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
