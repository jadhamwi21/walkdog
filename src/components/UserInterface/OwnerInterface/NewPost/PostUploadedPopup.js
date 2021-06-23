import { Button, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { optionSelectorContext, Options_ENUMS } from "../OwnerInterface";
import Styles from "../OwnerInterface.module.css";
import { FormContext } from "./NewPost";
const PostUploadedPopup = () => {
	const { Handlers } = useContext(FormContext);
	const { select } = useContext(optionSelectorContext);
	return ReactDOM.createPortal(
		<div className={Styles.PopupContainer}>
			<div className={Styles.PostUploadedPopupBox}>
				<div>
					<Typography>Post Uploaded!!</Typography>
					<div className={Styles.CloseButtonWrapper}>
						<Button
							className={Styles.ClosePopupButton}
							onClick={() => {
								Handlers.toggleModal();
								select(Options_ENUMS.EMPTY);
								window.scrollTo(0, 0);
							}}
						>
							Close!
						</Button>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById("portal")
	);
};

export default PostUploadedPopup;
