import { Button } from "@material-ui/core";
import React, { useContext, useRef } from "react";
import Styles from "../OwnerInterface.module.css";
import { editPostContext } from "./PostComponent";
const ModalLeftDiv = () => {
	const { Inputs, Handlers } = useContext(editPostContext);
	const buttonRef = useRef();
	return (
		<div className={Styles.ModalLeftDiv}>
			<div className={Styles.EditDogPictureWrapper}>
				<img src={Inputs.DogPicture} className={Styles.DogPictureInEditPost} />
				<br />
				<Button
					className={Styles.UploadButton}
					onClick={() => buttonRef.current.click()}
				>
					Upload
				</Button>
				<input
					type="file"
					accept="image"
					name="DogPicture"
					onChange={Handlers.pictureHandler}
					className={Styles.EditPostDogP}
					ref={buttonRef}
					style={{ visibility: "hidden" }}
				/>
			</div>
		</div>
	);
};

export default ModalLeftDiv;
