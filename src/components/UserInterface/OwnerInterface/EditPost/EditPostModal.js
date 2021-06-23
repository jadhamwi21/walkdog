import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHtmlScrollToggle } from "../../../../hooks/useHtmlScrollToggle";
import Styles from "../OwnerInterface.module.css";
import LoadingIndicator from "./LoadingIndicator";
import ModalLeftDiv from "./ModalLeftDiv";
import ModalRightDiv from "./ModalRightDiv";
import { editPostContext } from "./PostComponent";
const EditPostModal = () => {
	const {
		Handlers: { toggleModal },
		Loading,
	} = useContext(editPostContext);
	useHtmlScrollToggle();
	return ReactDOM.createPortal(
		<>
			<div
				className={Styles.ModalContainer}
				onClick={Loading === false ? toggleModal : null}
			>
				<div className={Styles.Modal} onClick={(e) => e.stopPropagation()}>
					<ModalLeftDiv />
					<ModalRightDiv />
					{Loading && <LoadingIndicator />}
				</div>
			</div>
		</>,
		document.getElementById("portal")
	);
};

export default EditPostModal;
