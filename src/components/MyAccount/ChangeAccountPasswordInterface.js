import React from "react";
import NewPasswordComponent from "./NewPasswordComponent";
import OldPasswordComponent from "./OldPasswordComponent";
import Styles from "./MyAccount.module.css";
import SaveButton from "./SaveButton.js";
import useChangePassword, { FIELDS } from "../../hooks/useChangePassword";
import SuccessModal from "./SuccessModal";
import ReactDOM from "react-dom";
const ChangeAccountPasswordInterface = ({ UserAccount, GoBack }) => {
	const {
		OldPassword,
		NewPassword,
		ConfirmNewPassword,
		onChange,
		Errors,
		onSave,
		shouldShowModal,
		toggleModal,
		ButtonText,
	} = useChangePassword(UserAccount);
	return (
		<div className={Styles.ChangePasswordFieldsWrapper}>
			<form onSubmit={onSave}>
				<OldPasswordComponent
					placeholder="Current Password"
					value={OldPassword}
					onChange={onChange}
					error={Errors[FIELDS.OLD]}
				/>
				<NewPasswordComponent
					placeholder="New Password"
					name="new"
					value={NewPassword}
					onChange={onChange}
					error={Errors[FIELDS.NEW]}
				/>
				<NewPasswordComponent
					placeholder="Confirm New Password"
					name="confirm"
					value={ConfirmNewPassword}
					onChange={onChange}
					error={Errors[FIELDS.CONFIRM]}
				/>
				<SaveButton Value={ButtonText} />
			</form>
			{shouldShowModal &&
				ReactDOM.createPortal(
					<SuccessModal
						toggleModal={toggleModal}
						RouteToAccountDetails={GoBack}
						Content={"Your Password Changed Successfully :)"}
					/>,
					document.getElementById("portal")
				)}
		</div>
	);
};

export default ChangeAccountPasswordInterface;
