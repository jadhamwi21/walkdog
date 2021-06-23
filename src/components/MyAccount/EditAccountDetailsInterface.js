import React from "react";
import ReactDOM from "react-dom";
import useEditAccountDetails from "../../hooks/useEditAccountDetails";
import AccountAvatar from "./AccountAvatar";
import EditDetailsFieldsContainer from "./EditDetailsFieldsContainer";
import Styles from "./MyAccount.module.css";
import RelocateButton from "./RelocateButton";
import SuccessModal from "./SuccessModal.js";
import SaveButton from "./SaveButton";
const EditAccountDetailsInterface = ({ UserAccount, GoBack }) => {
	const {
		Avatar,
		FirstName,
		LastName,
		UserType,
		Location,
		onChange,
		ModalToggle,
		AvatarHandler,
		LocationLoading,
		LocationClickHandler,
		LocationError,
		LocationGeo,
		ModalShouldShow,
		onSave,
		IsSavePressed,
	} = useEditAccountDetails(UserAccount);
	return (
		<div className={Styles.EditAccountDetailsContainer}>
			<div className={Styles.EditAccountDetailsWrapper}>
				<form onSubmit={onSave}>
					<AccountAvatar Avatar={Avatar} ChangeAvatarHandler={AvatarHandler} />
					<EditDetailsFieldsContainer
						onChange={onChange}
						FirstName={FirstName}
						LastName={LastName}
						UserType={UserType}
					/>
					<RelocateButton
						LocationState={{
							LocationLoading,
							LocationClickHandler,
							LocationError,
							LocationGeo,
						}}
					/>
					<SaveButton
						Value={IsSavePressed ? "Saving New Details" : "Save Details"}
					/>
					{ModalShouldShow &&
						ReactDOM.createPortal(
							<SuccessModal
								toggleModal={ModalToggle}
								RouteToAccountDetails={GoBack}
								Content={
									<>
										Your Account Details Edited To The Following:
										<br />
										First Name : {FirstName}
										<br />
										Last Name : {LastName}
										<br />
										Country : {Location.Country}
										<br />
										City : {Location.City}
										<br />
									</>
								}
							/>,
							document.getElementById("portal")
						)}
				</form>
			</div>
		</div>
	);
};

export default EditAccountDetailsInterface;
