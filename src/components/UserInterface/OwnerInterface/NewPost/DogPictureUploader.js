import React, { useContext, useRef } from "react";
import Styles from "../OwnerInterface.module.css";
import { FormContext } from "./NewPost";
const DogPictureUploader = () => {
	const { Inputs, Handlers, AddStylesForInvalid } = useContext(FormContext);
	const htmlPictureInputElement = useRef();
	const frameOnClickHandler = () => {
		htmlPictureInputElement.current.click();
	};
	return (
		<div
			className={Styles.DogPictureFrame}
			onClick={frameOnClickHandler}
			style={{ ...AddStylesForInvalid("DogPicture") }}
		>
			{Inputs.DogPicture === "" ? (
				<div className={Styles.ClickToUploadText}>Click To Upload</div>
			) : (
				<img src={Inputs.DogPicture} className={Styles.DogPicture} />
			)}
			<input
				type="file"
				accept="image"
				ref={htmlPictureInputElement}
				name="DogPicture"
				onChange={Handlers.pictureHandler}
				style={{ visibility: "hidden", position: "absolute" }}
			/>
		</div>
	);
};

export default DogPictureUploader;
