import { Typography, Button } from "@material-ui/core";
import React, { useContext } from "react";
import Styles from "../../Signup.module.css";
import { FormContext } from "../../Signup.js";
export const ProfilePicture = ({ Picture }) => {
	const { Inputs, Handlers, StylesForEmptyFields } = useContext(FormContext);
	const MuiButton_HTMLButton_Adapter = () => {
		document.getElementById("prof-picture-upload-element").click();
	};
	return (
		<>
			<div
				className={Styles.ProfilePictureBox}
				style={StylesForEmptyFields("ProfilePicture")}
			>
				{Inputs["ProfilePicture"] === "" ? (
					<div>
						<Typography variant="h5" className={Styles.UploadText}>
							Profile Picture
						</Typography>
					</div>
				) : (
					<img src={Picture} className={Styles.ProfilePicturePreview} />
				)}
			</div>
			<div className={Styles.UploadButtonWrapper}>
				<Button
					className={Styles.UploadButton}
					onClick={MuiButton_HTMLButton_Adapter}
				>
					<input
						type="file"
						accept="image/"
						onChange={Handlers.pictureHandler}
						name="ProfilePicture"
						className={Styles.UploadHTMLelement}
						id="prof-picture-upload-element"
					/>
					Upload
				</Button>
			</div>
		</>
	);
};

export default ProfilePicture;
