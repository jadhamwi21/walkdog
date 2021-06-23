import React from "react";
import GrayMark from "../../assets/GrayMark.png";
import BlueMark from "../../assets/BlueMark.png";
import Styles from "./UserInbox.module.css";
const LoggedInUserMessage = ({ Message, sample }) => {
	return (
		<div className={Styles.LoggedInUserMessageContainer}>
			{!sample ? (
				<>
					{Message.MessageContent}
					<div className={Styles.MarksContainer}>
						{Message.isRead ? (
							<>
								<img
									src={BlueMark}
									style={{ position: "relative", left: "8px" }}
								/>
								<img src={BlueMark} />
							</>
						) : (
							<>
								<img
									src={GrayMark}
									style={{ position: "relative", left: "8px" }}
								/>
								<img src={GrayMark} />
							</>
						)}
					</div>
				</>
			) : (
				<>
					{Message.MessageContent}
					<div className={Styles.MarksContainer}>
						<img src={GrayMark} />
					</div>
				</>
			)}
		</div>
	);
};
export default LoggedInUserMessage;
