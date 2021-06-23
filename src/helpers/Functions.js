import OwnerImage from "../assets/Owner.jpg";
import BorrowerImage from "../assets/Borrower.jpg";
import { ActionsCreator } from "../actions/ActionsCreator.js";
import countries from "../countries.json";
import store from "../store/store";
import FirebaseUtilityInstance from "../services/Firebase";
export const Currency_Enum = {
	DOLLAR: "dollar",
	EURO: "euro",
	POUND: "pound",
};
// This Function Returns The Appropriate Card Content According To The Type Passed
export const selectCardsFactory = (type) => {
	const Product = {};
	if (type === "Borrower") {
		Product.Image = BorrowerImage;
		Product.Title = "Borrower";
		Product.Content =
			"Bored Someday And You Love Dogs? Spend Some Time With An Owner’s Dog To Fill The Gap";
		Product.Action = ActionsCreator.signupAsBorrower;
	} else {
		Product.Image = OwnerImage;
		Product.Title = "Owner";
		Product.Content =
			"Busy? Going For A Trip? Borrow Your Dog To Trusted Borrowers And Get Rid Of The Anxiety";
		Product.Action = ActionsCreator.signupAsOwner;
	}
	return Product;
};
export const checkforLoggedInUser = (owner, borrower) =>
	Object.keys(owner).length !== 0 || Object.keys(borrower).length !== 0;
export const DATEFLAGS = {
	DAY: "day",
	MONTH: "month",
	YEAR: "year",
	HOURS: "hours",
	MINUTES: "minutes",
	SECONDS: "seconds",
	MILLISECONDS: "milliseconds",
	FULL: "full",
};
export const todaysDate = (flag) => {
	const today = new Date();
	if (DATEFLAGS.DAY === flag) {
		return today.getDate();
	}
	if (DATEFLAGS.MONTH === flag) {
		return today.getMonth() + 1;
	}
	if (DATEFLAGS.YEAR === flag) {
		return today.getFullYear();
	}
	if (DATEFLAGS.HOURS === flag) {
		return today.getHours();
	}
	if (DATEFLAGS.MINUTES === flag) {
		return today.getMinutes();
	}
	if (DATEFLAGS.SECONDS === flag) {
		return today.getSeconds();
	}
	if (DATEFLAGS.MILLISECONDS === flag) {
		return today.getMilliseconds();
	}
	if (DATEFLAGS.FULL === flag) {
		return (
			today.getDate() +
			"/" +
			(today.getMonth() + 1) +
			"/" +
			today.getFullYear() +
			"|" +
			today.getHours() +
			":" +
			today.getMinutes() +
			":" +
			today.getSeconds()
		);
	}
};
export const isEndingDurationGreaterThanStartingDuration = (
	startingDuration,
	endingDuration
) => {
	const parsedStartingDurationHour = parseInt(
		startingDuration.slice(0, startingDuration.indexOf(":"))
	);

	const parsedEndingDurationHour = parseInt(
		endingDuration.slice(0, endingDuration.indexOf(":"))
	);
	const parsedStartingDurationMinutes = parseInt(
		startingDuration.slice(startingDuration.indexOf(":") + 1)
	);
	const parsedEndingDurationMinutes = parseInt(
		endingDuration.slice(endingDuration.indexOf(":") + 1)
	);
	return parsedStartingDurationHour < parsedEndingDurationHour
		? true
		: parsedStartingDurationHour === parsedEndingDurationHour
		? parsedStartingDurationMinutes < parsedEndingDurationMinutes
		: false;
};
export const ImageToBlob = async (Image) => {
	return await fetch(Image)
		.then((response) => response.blob())
		.then((blob) => blob);
};
export const FormatDurationTo_12HourFormat = (Duration) => {
	const shorthandFunctions = {
		FormatHours: (Hour) => {
			const HourAsInteger = parseInt(Hour);
			return HourAsInteger > 12
				? HourAsInteger % 12 >= 10
					? HourAsInteger % 12
					: "0" + (HourAsInteger % 12)
				: Hour;
		},
		getPeriod: (Hour) => {
			return parseInt(Hour) >= 12 ? "PM" : "AM";
		},
	};
	const IndexOfColon = Duration.indexOf(":");
	const Period = shorthandFunctions.getPeriod(Duration.slice(0, IndexOfColon));
	const Minutes = Duration.slice(IndexOfColon + 1);
	const Hours = shorthandFunctions.FormatHours(Duration.slice(0, IndexOfColon));
	return Hours + ":" + Minutes + Period;
};
export const LineupDate = (day, month, year) => day + "/" + month + "/" + year;
export const getFirstNameAndLastName = (Query) => {
	if (Query.length === 0) {
		return {
			firstName: "",
			lastName: "",
		};
	}
	const SeperatorIndex = Query.indexOf(" ");
	if (SeperatorIndex === -1) {
		return {
			firstName: Query,
			lastName: "",
		};
	} else if (SeperatorIndex === Query.length - 1) {
		return {
			firstName: Query.slice(0, SeperatorIndex),
			lastName: "",
		};
	} else {
		return {
			firstName: Query.slice(0, SeperatorIndex),
			lastName: Query.slice(SeperatorIndex + 1),
		};
	}
};
export const matchStringsUnconditionally = (original, target) => {
	console.log("TARGET : ", target, "ORIGINAL : ", original);
	if (original.length === 0) {
		return false;
	}
	if (original.length > target.length) {
		return false;
	}
	if (original.toUpperCase() !== target.toUpperCase()) {
		return false;
	}

	return true;
};
export const currencyConverter = (Currency) => {
	switch (Currency) {
		case Currency_Enum.DOLLAR:
			return "$";
		case Currency_Enum.EURO:
			return "€";
		case Currency_Enum.POUND:
			return "£";
	}
};
export const Compare_DateAndTime = (firstEntity, secondEntity) => {
	/* Year - Month - Day - Hours - Minutes - Seconds*/
	console.log(firstEntity, secondEntity);
	const firstEntitySplitted = {
		Day: +firstEntity.slice(0, firstEntity.indexOf("/")),
		Month: +firstEntity.slice(
			firstEntity.indexOf("/") + 1,
			firstEntity.lastIndexOf("/")
		),
		Year: +firstEntity.slice(
			firstEntity.lastIndexOf("/") + 1,
			firstEntity.indexOf("|")
		),
		Hours: +firstEntity.slice(
			firstEntity.indexOf("|") + 1,
			firstEntity.indexOf(":")
		),
		Minutes: +firstEntity.slice(
			firstEntity.indexOf(":") + 1,
			firstEntity.lastIndexOf(":")
		),
		Seconds: +firstEntity.slice(firstEntity.lastIndexOf(":") + 1),
	};
	const secondEntitySplitted = {
		Day: +secondEntity.slice(0, secondEntity.indexOf("/")),
		Month: +secondEntity.slice(
			secondEntity.indexOf("/") + 1,
			secondEntity.lastIndexOf("/")
		),
		Year: +secondEntity.slice(
			secondEntity.lastIndexOf("/") + 1,
			secondEntity.indexOf("|")
		),
		Hours: +secondEntity.slice(
			secondEntity.indexOf("|") + 1,
			secondEntity.indexOf(":")
		),
		Minutes: +secondEntity.slice(
			secondEntity.indexOf(":") + 1,
			secondEntity.lastIndexOf(":")
		),
		Seconds: +firstEntity.slice(firstEntity.lastIndexOf(":") + 1),
	};
	if (firstEntitySplitted.Year < secondEntitySplitted.Year) {
		return true;
	} else if (firstEntitySplitted.Year > secondEntitySplitted.Year) {
		return false;
	} else if (firstEntitySplitted.Month < secondEntitySplitted.Month) {
		return true;
	} else if (firstEntitySplitted.Month > secondEntitySplitted.Month) {
		return false;
	} else if (firstEntitySplitted.Day < secondEntitySplitted.Day) {
		return true;
	} else if (firstEntitySplitted.Day > secondEntitySplitted.Day) {
		return false;
	} else if (firstEntitySplitted.Hours < secondEntitySplitted.Hours) {
		return true;
	} else if (firstEntitySplitted.Hours > secondEntitySplitted.Hours) {
		return false;
	} else if (firstEntitySplitted.Minutes < secondEntitySplitted.Minutes) {
		return true;
	} else if (firstEntitySplitted.Minutes > secondEntitySplitted.Seconds) {
		return false;
	} else if (firstEntitySplitted.Seconds < secondEntitySplitted.Seconds) {
		return true;
	} else if (firstEntitySplitted.Seconds > secondEntitySplitted.Seconds) {
		return false;
	} else {
		return true;
	}
};
export const getTime_Hours_Minutes = (Time) => {
	const isThereColumn = Time.indexOf(":") === -1 ? false : true;
	const TimeHoursPart = parseInt(
		Time.slice(0, isThereColumn ? Time.indexOf(":") : Time.length)
	);
	const TimeMinutesPart = parseInt(
		isThereColumn ? Time.slice(Time.indexOf(":") + 1) : 0
	);
	return {
		Hours: TimeHoursPart,
		Minutes: TimeMinutesPart,
	};
};
export const getDate_Day_Month_Year = (date) => {
	const [Day, Month, Year] = date.split("/");
	return {
		Day: parseInt(Day),
		Month: parseInt(Month),
		Year: parseInt(Year),
	};
};
export const getDurationInterval = (StartingDuration, EndingDuration) => {
	const { Hours: StartingHours, Minutes: StartingMinutes } =
		getTime_Hours_Minutes(StartingDuration);
	const { Hours: EndingHours, Minutes: EndingMinutes } =
		getTime_Hours_Minutes(EndingDuration);
	let HoursInterval = EndingHours - StartingHours;
	let MinutesInterval = EndingMinutes - StartingMinutes;
	if (MinutesInterval < 0) {
		HoursInterval -= 1;
		MinutesInterval = 60 + MinutesInterval;
	}
	return {
		HoursDifference: HoursInterval,
		MinutesDifference: MinutesInterval,
	};
};
export const CountryToCountryCodeAdapter = (Country) => {
	const ArrayOfCountriesObjects = countries;
	for (
		let countryIndex = 0;
		countryIndex < ArrayOfCountriesObjects.length;
		countryIndex++
	) {
		const individualCountryObject = ArrayOfCountriesObjects[countryIndex];
		if (individualCountryObject.name.toLowerCase() === Country.toLowerCase()) {
			return individualCountryObject.code;
		}
	}
};
export const isThisNameTheSender = (Name, Message) => {
	const MessageSenderName =
		Message.SendBy.FirstName + " " + Message.SendBy.LastName;
	return Name === MessageSenderName;
};
export const convertFullNameToFirstNameLastNameObject = (FullName) => {
	const splittedName = FullName.split(" ");
	return {
		FirstName: splittedName[0],
		LastName: splittedName[1],
	};
};
export const isEmpty = (object) => {
	return Object.entries(object).length === 0;
};
export const getLastActive = () => {
	const lastActive_Date = {
		Day: todaysDate(DATEFLAGS.DAY),
		Month: todaysDate(DATEFLAGS.MONTH),
		Year: todaysDate(DATEFLAGS.YEAR),
	};
	const HoursAndMinutesGeneratorObject = new Date();
	const lastActiveHours = HoursAndMinutesGeneratorObject.getHours();
	const lastActiveMinutes = HoursAndMinutesGeneratorObject.getMinutes();
	const lastActive_HoursAndMinutes = {
		Hours: lastActiveHours,
		Minutes: lastActiveMinutes,
	};
	return {
		LastActiveDate: lastActive_Date,
		LastActiveHoursAndMinutes: lastActive_HoursAndMinutes,
	};
};
export const GenerateTitleByLocationPathName = (Pathname) => {
	const { Borrower, Owner } = store.getState();
	const User = { ...Borrower, ...Owner };
	const PathNames_enum = {
		HOME: "/home",
		SIGNUP: "/signup",
		SIGNIN: "/signin",
		MAINPAGE: "/mainpage",
		INBOX: "/inbox",
		POSTS: "/posts",
	};
	switch (Pathname) {
		case PathNames_enum.HOME:
			return "Welcome To Walkdog";
		case PathNames_enum.SIGNUP:
			return "Sign Up";
		case PathNames_enum.SIGNIN:
			return "Sign In";
		case PathNames_enum.MAINPAGE:
			return !isEmpty(User) ? "Main Account Page" : "You're Not Logged In";
		case PathNames_enum.INBOX:
			return !isEmpty(User) ? "Your Account Inbox" : "You're Not Logged In";
	}
	if (Pathname.includes(PathNames_enum.POSTS)) {
		return !isEmpty(User) ? "Post Details" : "";
	}
};
export const FirstLetterCapitalizer = (str) => {
	const Words = str.split(" ");
	const ModifiedWord = Words.map((Word) => {
		return Word[0].toUpperCase() + Word.slice(1);
	});
	return ModifiedWord;
};
export const URL_Object_To_BLOB = async (urlobj) => {
	const blob = await fetch(urlobj).then((response) => response.blob());
	return blob;
};
export const GenerateTodayDateAndTimeObject = () => {
	const DateTimeObject = new Date();
	return {
		Year: DateTimeObject.getFullYear(),
		Month: DateTimeObject.getMonth() + 1,
		Day: DateTimeObject.getDate(),
		Hours: DateTimeObject.getHours(),
		Minutes: DateTimeObject.getMinutes(),
		Seconds: DateTimeObject.getSeconds(),
		Milliseconds: DateTimeObject.getMilliseconds(),
	};
};
