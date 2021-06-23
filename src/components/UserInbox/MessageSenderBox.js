import React, { useRef, useEffect } from "react";
import Styles from "./UserInbox.module.css";
import SendLogo from "../../assets/SendMessageLogo.png";
const MessageSenderBox = ({ FieldRef, handleKeyPressDown, handleSubmit }) => {
	// useEffect(() => {
	// 	FieldRef.current.focus();
	// }, []);
	return (
		<div className={Styles.SendMessageBox}>
			<div>
				<input
					type="text"
					placeholder={"Enter Your Message Here Please"}
					ref={FieldRef}
					onKeyDown={handleKeyPressDown}
				/>
				<button onClick={handleSubmit}>
					<img src={SendLogo} />
				</button>
			</div>
		</div>
	);
};

export default MessageSenderBox;
