import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { GenerateTodayDateAndTimeObject } from "../../helpers/Functions";
import FirebaseUtilityInstance from "../../services/Firebase";
const HeaderLastActiveComponent = ({ SelectedUserState, isTyping }) => {
	console.log("SELECTED USER STATE", SelectedUserState);
	const HeaderLastActiveUIGenerator = () => {
		const LastActiveLiteralStringGenerator = (ValueDifference, Value) => {
			const LastActiveLiteral = `Last Seen ${ValueDifference} ${
				ValueDifference === 1 ? Value : Value.concat("s")
			} Ago`;
			return LastActiveLiteral;
		};
		const { status, Day, Month, Year, Hours, Minutes, Seconds, Milliseconds } =
			SelectedUserState;
		const {
			Day: currentDay,
			Month: currentMonth,
			Year: currentYear,
			Hours: currentHours,
			Minutes: currentMinutes,
		} = GenerateTodayDateAndTimeObject();
		console.log(Day, Month, Year, Hours, Minutes, Seconds, Milliseconds);
		console.log(SelectedUserState);
		if (isTyping) {
			return "Typing...";
		} else if (
			status === FirebaseUtilityInstance.LoggedInStatuses_Enum.ONLINE
		) {
			return "Online";
		} else if (currentYear - Year >= 1) {
			return LastActiveLiteralStringGenerator(currentYear - Year, "Year");
		} else if (currentMonth - Month >= 1) {
			return LastActiveLiteralStringGenerator(currentMonth - Month, "Month");
		} else if (currentDay - Day >= 1) {
			return LastActiveLiteralStringGenerator(currentDay - Day, "Day");
		} else if (currentHours - Hours >= 1) {
			return LastActiveLiteralStringGenerator(currentHours - Hours, "Hour");
		} else if (currentMinutes - Minutes >= 1) {
			return LastActiveLiteralStringGenerator(
				currentMinutes - Minutes,
				"Minute"
			);
		} else {
			return "Last Active Few Seconds Ago";
		}
	};
	const [SelectedUserHeaderUI, setSelectedUserHeaderUI] = useState(
		HeaderLastActiveUIGenerator
	);
	useEffect(() => {
		const newInterface = HeaderLastActiveUIGenerator();
		setSelectedUserHeaderUI(newInterface);
	}, [isTyping, SelectedUserState.status]);
	console.log(SelectedUserState);
	useEffect(() => {
		if (
			SelectedUserState.status ===
			FirebaseUtilityInstance.LoggedInStatuses_Enum.OFFLINE
		) {
			const clearIntervalToken = setInterval(() => {
				const newInterface = HeaderLastActiveUIGenerator();
				setSelectedUserHeaderUI(newInterface);
			}, 60 * 1000);
			return () => {
				clearInterval(clearIntervalToken);
			};
		}
	}, [SelectedUserState.status]);
	return <>{SelectedUserHeaderUI}</>;
};
const mapStateToProps = (state) => ({
	isTyping: state.Conversations.isTyping,
});

export default connect(mapStateToProps)(HeaderLastActiveComponent);
