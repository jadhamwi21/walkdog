import React, { useRef } from "react";
import Styles from "./MyAccount.module.css";
const AccountAvatar = ({ Avatar, ChangeAvatarHandler }) => {
	return (
		<div>
			<img
				src={Avatar}
				className={Styles.UserAccountAvatar}
				onClick={() => {
					document
						.getElementById("edit-account-details-upload-avatar-input-element")
						.click();
				}}
			/>
			<input
				type="file"
				accept="image/"
				style={{ display: "none" }}
				id="edit-account-details-upload-avatar-input-element"
				onChange={ChangeAvatarHandler}
			/>
		</div>
	);
};

export default AccountAvatar;
