import { Button } from "@material-ui/core";
import React from "react";
import Styles from "../OwnerInterface.module.css";
const ConfirmationModal = ({ yesHandler, noHandler, Post }) => {
	return (
		<div className={Styles.ConfirmationModalContainer}>
			<div className={Styles.ConfirmationModalDiv}>
				<div>
					<div className={Styles.ConfirmationText}>
						Are You Sure You Want To Delete This Post?
					</div>
					<div className={Styles.ConfirmationChoicesWrapper}>
						<Button
							className={Styles.ConfirmationChoiceButton}
							onClick={() => yesHandler(Post)}
						>
							Yes!
						</Button>
						<Button
							className={Styles.ConfirmationChoiceButton}
							onClick={noHandler}
						>
							No!
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
