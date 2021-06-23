import React from "react";
import InputFieldsWrapper from "./InputFieldsWrapper";
import DogPictureUploader from "./DogPictureUploader.js";
import DateToBorrow from "./DateToBorrow.js";
import Styles from "../OwnerInterface.module.css";
import CostComponent from "./CostComponent";
import DurationComponent from "./DurationComponent.js";
import DogBehavior from "./DogBehavior";
import PostButton from "./PostButton.js";
import usePost, { postActions } from "../../../../hooks/usePost.js";
import PostUploadedPopup from "./PostUploadedPopup.js";
export const FormContext = React.createContext();
const NewPost = () => {
	const { Inputs, Errors, Handlers, Validation, Modal, Loading } = usePost(
		postActions.NEW_POST
	);

	return (
		<FormContext.Provider
			value={{
				Inputs: Inputs,
				Errors: Errors,
				Handlers: Handlers,
				Loading: Loading,
				AddStylesForInvalid: (name) => {
					if (Inputs[name] === "" && Validation === true) {
						return {
							borderColor: "red",
						};
					} else {
						return {};
					}
				},
			}}
		>
			<div className={Styles.FormWrapper}>
				<form onSubmit={Handlers.submitHandler}>
					<DogPictureUploader />
					<InputFieldsWrapper />
					<DateToBorrow />
					<CostComponent />
					<DurationComponent />
					<DogBehavior />
					<PostButton />
				</form>
				{Modal && <PostUploadedPopup />}
			</div>
		</FormContext.Provider>
	);
};

export default NewPost;
