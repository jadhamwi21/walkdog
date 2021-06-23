import { useRef, useState } from "react";
import FirebaseUtilityInstance from "../services/Firebase";

const useSendMessage = ({ LoggedInUser, SelectedUser }) => {
	const MessageFieldRef = useRef(null);
	const [LastPressedKey, setLastPressedKey] = useState("");
	const handleSubmit = () => {
		if (MessageFieldRef.current.value === "") return;
		const MessageValue = MessageFieldRef.current.value;
		FirebaseUtilityInstance.SendMessageTo(
			LoggedInUser,
			SelectedUser,
			MessageValue
		);
		MessageFieldRef.current.value = "";
	};
	const handleKeyPressDown = (e) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
		setLastPressedKey(e.key);
	};
	return {
		LastPressedKey: LastPressedKey,
		FieldRef: MessageFieldRef,
		handleSubmit: handleSubmit,
		handleKeyPressDown: handleKeyPressDown,
	};
};
export default useSendMessage;
