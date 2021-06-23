import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import Message from "../helpers/Message.js";
import BlankProfilePicture from "../assets/BlankProfilePicture.png";
import ActionsCreator from "../actions/ActionsCreator.js";
import {
	Compare_DateAndTime,
	CountryToCountryCodeAdapter,
	GenerateTodayDateAndTimeObject,
	Generate_N_Digits,
	getDate_Day_Month_Year,
	getDurationInterval,
	getFirstNameAndLastName,
	getLastActive,
	getTime_Hours_Minutes,
	matchStringsUnconditionally,
	URL_Object_To_BLOB,
} from "../helpers/Functions.js";
import { NewVisitor_Choice } from "../reducers/SignupReducer.js";
import store from "../store/store.js";
const firebaseConfig = {
	apiKey: "AIzaSyDsZJXnUyNdYyzk8H2sqReK-6OI0yuklCM",
	authDomain: "walkdog-1b001.firebaseapp.com",
	databaseURL: "https://walkdog-1b001-default-rtdb.firebaseio.com",
	projectId: "walkdog-1b001",
	storageBucket: "walkdog-1b001.appspot.com",
	messagingSenderId: "1083849808401",
	appId: "1:1083849808401:web:1cc925b76cf7939049afb0",
	measurementId: "G-RVDFSZFWLM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class FirebaseUtilityClass {
	Auth = firebase.auth;
	Database = firebase.database;
	Storage = firebase.storage;
	LoggedInUserUniqueID_Database = null;
	LoggedInStatuses_Enum = {
		ONLINE: "online",
		OFFLINE: "offline",
	};
	IsSigningUp = false;
	constructor() {
		this.Auth().onAuthStateChanged((User) => {
			if (User && !this.IsSigningUp) {
				this.LoggedInUserStatusObserver(User);
			} else {
				this.MakeStatusOfflineWithLastActive();
			}
		});
	}

	ImageToStorage = async (ImageAsDOMString) => {
		const ImageBlob = await fetch(ImageAsDOMString).then((response) =>
			response.blob()
		);
		const generatePictureID = () => {
			const today = new Date();
			const uniqueValueCarry = [
				today.getFullYear(),
				today.getMonth(),
				today.getDate(),
				today.getHours(),
				today.getMinutes(),
				today.getSeconds(),
				today.getMilliseconds(),
			];
			const uniqueValue = uniqueValueCarry.join("");
			return uniqueValue;
		};
		const ImageURL = await this.Storage()
			.ref()
			.child(generatePictureID())
			.put(ImageBlob)
			.then(async (snapshot) => {
				return await snapshot.ref.getDownloadURL().then((URL) => URL);
			})
			.catch((error) => {
				console.log(error);
			});
		return ImageURL;
	};
	CreateNewUser = async (FormInputsAsObject) => {
		this.IsSigningUp = true;
		const StoreInRealtimeDatabase = async (Data) => {
			const TargetNode = this.Database().ref("users");
			await TargetNode.once("value", () => {
				TargetNode.push(Data);
			});
		};
		const {
			Email,
			Password,
			FirstName,
			LastName,
			Location,
			ProfilePicture,
			UserType,
		} = FormInputsAsObject;
		const ProfilePictureURL =
			ProfilePicture === ""
				? await this.ImageToStorage(BlankProfilePicture)
				: await this.ImageToStorage(ProfilePicture);
		return await this.Auth()
			.createUserWithEmailAndPassword(Email, Password)
			.then(async (userCredential) => {
				this.Auth().signOut();
				const DataToBeStored = {
					FirstName: FirstName,
					LastName: LastName,
					Location: Location,
					ProfilePicture: ProfilePictureURL,
					Email: userCredential.user.email,
					UserType: UserType,
					Password: Password,
				};

				await StoreInRealtimeDatabase(DataToBeStored);
				return true;
			})
			.catch((error) => {
				return error.message;
			})
			.finally(() => {
				this.IsSigningUp = false;
			});
	};
	ChangePassword = async (Email, Password) => {
		let uniqueUserID = null;
		await this.Database()
			.ref("users")
			.orderByChild("Email")
			.equalTo(Email)
			.once("value", (snapshot) => {
				uniqueUserID = Object.keys(snapshot.val())[0];
			});
		await this.Database().ref(`users/${uniqueUserID}/Password`).set(Password);
		this.Auth().currentUser.updatePassword(Password);
	};
	SignInUser = async (Email, Password) => {
		let Response;
		await this.Auth()
			.signInWithEmailAndPassword(Email, Password)
			.then(async (userCredential) => {
				await this.Database()
					.ref("users/")
					.orderByChild("Email")
					.equalTo(userCredential.user.email)
					.once("value", (snapshot) => {
						const UserInformations = Object.values(snapshot.val())[0];
						Response = { ...UserInformations };
						if (
							Response.UserType === NewVisitor_Choice.OWNER &&
							Response.Posts === undefined
						) {
							Response.Posts = [];
						}
					});
			})
			.catch((error) => {
				Response = error.message;
			});
		return Response;
	};
	SignOutUser = () => {
		this.Auth().signOut();
	};
	checkIfUserSignedIn = () => {
		return this.Auth().currentUser !== null;
	};
	AddPostForLoggedInUser = async (Post) => {
		let userUniqueID = null;
		let postID = null;
		const DogPictureURL = await this.ImageToStorage(Post.DogPicture);
		Post = { ...Post, DogPicture: DogPictureURL };
		await this.Database()
			.ref("users/")
			.orderByChild("Email")
			.equalTo(this.Auth().currentUser.email)
			.once("value", (snapshot) => {
				userUniqueID = Object.keys(snapshot.val())[0];
			});
		await this.Database()
			.ref(`users/${userUniqueID}/Posts`)
			.once("value", (snapshot) => {
				postID = snapshot.ref.push(Post).key;
			});
		return { [postID]: Post };
	};
	EditPostForLoggedInUser = async (PostBeforeEdit, PostAfterEdit) => {
		let userUniqueID = null;
		let DogPictureURL;
		let targetPostID = null;
		if (PostBeforeEdit.DogPicture === PostAfterEdit.DogPicture) {
			DogPictureURL = PostBeforeEdit.DogPicture;
		} else {
			DogPictureURL = await this.ImageToStorage(PostAfterEdit.DogPicture);
		}
		PostAfterEdit = { ...PostAfterEdit, DogPicture: DogPictureURL };
		await this.Database()
			.ref("users/")
			.orderByChild("Email")
			.equalTo(this.Auth().currentUser.email)
			.once("value", (snapshot) => {
				userUniqueID = Object.keys(snapshot.val())[0];
			});
		await this.Database()
			.ref(`users/${userUniqueID}/Posts`)
			.once("value", (snapshot) => {
				const PostsBranch = snapshot.val();
				const PostsObjectAsArrayOfKeys = Object.keys(PostsBranch);
				for (let i = 0; i < PostsObjectAsArrayOfKeys.length; i++) {
					if (
						PostsBranch[PostsObjectAsArrayOfKeys[i]]["DogPicture"] ===
						PostBeforeEdit["DogPicture"]
					) {
						targetPostID = PostsObjectAsArrayOfKeys[i];
						break;
					}
				}
			});

		await this.Database()
			.ref(`users/${userUniqueID}/Posts/${targetPostID}`)
			.set({
				...PostAfterEdit,
			});
		return {
			[targetPostID]: {
				...PostAfterEdit,
			},
		};
	};
	DeletePostForLoggedInUser = async (Post) => {
		let userUniqueID = null;
		let targetPostID = null;
		await this.Database()
			.ref("users/")
			.orderByChild("Email")
			.equalTo(this.Auth().currentUser.email)
			.once("value", (snapshot) => {
				userUniqueID = Object.keys(snapshot.val())[0];
			});
		await this.Database()
			.ref(`users/${userUniqueID}/Posts`)
			.once("value", (snapshot) => {
				const PostsBranch = snapshot.val();
				const PostsObjectAsArrayOfKeys = Object.keys(PostsBranch);
				for (let i = 0; i < PostsObjectAsArrayOfKeys.length; i++) {
					if (
						PostsBranch[PostsObjectAsArrayOfKeys[i]]["DogPicture"] ===
						Post["DogPicture"]
					) {
						targetPostID = PostsObjectAsArrayOfKeys[i];
						break;
					}
				}
			});
		this.Database().ref(`users/${userUniqueID}/Posts/${targetPostID}`).remove();
		return targetPostID;
	};
	GetOwnerPosts = async (OwnerEmail) => {
		let PostsObject;
		await this.Database()
			.ref(`users/`)
			.orderByChild("Email")
			.equalTo(OwnerEmail)
			.once("value", (snapshot) => {
				const UserObject = Object.values(snapshot.val())[0];
				if (UserObject.Posts === undefined) {
					PostsObject = [];
				} else {
					PostsObject = UserObject.Posts;
				}
			});
		return PostsObject;
	};
	SearchOwnerResult = async (Query) => {
		const { firstName, lastName } = getFirstNameAndLastName(Query);
		let ArrayOfOwners = [];
		await this.Database()
			.ref("users")
			.orderByChild("UserType")
			.equalTo("owner")
			.once("value", (snapshot) => {
				const OwnersContainer = snapshot.val();
				const keys = Object.keys(OwnersContainer);
				for (let i = 0; i < keys.length; i++) {
					const CurrentOwner = OwnersContainer[keys[i]];
					if (
						matchStringsUnconditionally(firstName, CurrentOwner.FirstName) ||
						matchStringsUnconditionally(lastName, CurrentOwner.LastName)
					) {
						ArrayOfOwners.push(OwnersContainer[keys[i]]);
					}
				}
			});
		console.log(ArrayOfOwners);
		return ArrayOfOwners;
	};
	GetAllPostsOrderedByDateAndTime = async () => {
		let ArrayOfPosts = [];
		let PostsSorted = [];
		await this.Database()
			.ref("users")
			.once("value", (snapshot) => {
				const UsersArray = Object.values(snapshot.val());
				UsersArray.forEach((User) => {
					if (User.Posts !== undefined) {
						const postsKeys = Object.keys(User.Posts);
						postsKeys.forEach((postKey) => {
							const post = User.Posts[postKey];
							post.City = User.Location.City;
							post.Country = User.Location.Country;
							post.CountryCode = User.Location.CountryCode;
							post.User = User;
							post.postKey = postKey;
							ArrayOfPosts = [...ArrayOfPosts, post];
						});
					}
				});
			});
		const arrayTotalLength = ArrayOfPosts.length;
		for (let i = 0; i < arrayTotalLength; i++) {
			let newestPost = ArrayOfPosts[0];
			let newestPostIndex = 0;
			for (let j = 0; j < ArrayOfPosts.length; j++) {
				if (
					Compare_DateAndTime(newestPost.createdAt, ArrayOfPosts[j].createdAt)
				) {
					newestPost = ArrayOfPosts[j];
					newestPostIndex = j;
				}
			}
			PostsSorted.push(newestPost);
			ArrayOfPosts.splice(newestPostIndex, 1);
		}
		return PostsSorted;
	};
	FilteredPostsByDuration = (Posts, Duration) => {
		let NeededPosts = [];
		const { Hours, Minutes } = getTime_Hours_Minutes(Duration);
		Posts.forEach((post) => {
			const { HoursDifference, MinutesDifference } = getDurationInterval(
				post.StartingDuration,
				post.EndingDuration
			);
			if (HoursDifference === Hours && MinutesDifference === Minutes) {
				NeededPosts.push(post);
			}
		});
		return NeededPosts;
	};
	FilteredPostsByDate = (Posts, date) => {
		let NeededPosts = [];
		const { Day, Month, Year } = getDate_Day_Month_Year(date);
		Posts.forEach((post) => {
			if (
				parseInt(post.DayOfBorrow) === Day &&
				parseInt(post.MonthOfBorrow) === Month &&
				parseInt(post.YearOfBorrow) === Year
			) {
				NeededPosts.push(post);
			}
		});
		return NeededPosts;
	};
	FilteredPostsByCost = (Posts, Cost) => {
		let NeededPosts = [];
		Posts.forEach((post) => {
			if (parseInt(post.Cost) === parseInt(Cost)) {
				NeededPosts.push(post);
			}
		});
		return NeededPosts;
	};
	FilteredPostsByLocation = (Posts, Location) => {
		let NeededPosts = [];
		if (Location.toLowerCase() === "Near Me".toLowerCase()) {
			const { Latitude: BorrowerLatitude, Longitude: BorrowerLongitude } =
				store.getState().Borrower.Location;
			NeededPosts = Posts.sort((firstPost, secondPost) => {
				if (
					Math.abs(BorrowerLongitude - firstPost.Longitude) <
						Math.abs(BorrowerLongitude - secondPost.Longitude) &&
					Math.abs(BorrowerLatitude - firstPost.Latitude) <
						Math.abs(BorrowerLatitude - secondPost.Latitude)
				) {
					return -1;
				} else {
					return +1;
				}
			});
		} else {
			NeededPosts = Posts.filter(
				(post) =>
					post.CountryCode.toString().toLowerCase() ===
					CountryToCountryCodeAdapter(Location).toString().toLowerCase()
			);
		}
		return NeededPosts;
	};
	FilterThesePostsBy_Duration_Date_Cost_Location = (Posts) => {
		return (duration) => {
			if (duration !== "")
				Posts = this.FilteredPostsByDuration(Posts, duration);
			return (date) => {
				if (date !== "") Posts = this.FilteredPostsByDate(Posts, date);
				return (cost) => {
					if (cost !== "") Posts = this.FilteredPostsByCost(Posts, cost);
					return (location) => {
						if (location !== "")
							Posts = this.FilteredPostsByLocation(Posts, location);
						return Posts;
					};
				};
			};
		};
	};
	FilterPostsBy = async (Inputs) => {
		const { Duration, Date: date, Cost, Location } = Inputs;
		let AllPosts = [];
		await this.Database()
			.ref("/users")
			.orderByChild("UserType")
			.equalTo("owner")
			.once("value", (snapshot) => {
				const SnapshotValue = snapshot.val();
				const UsersArrayOfObjects = Object.values(SnapshotValue);
				UsersArrayOfObjects.forEach((userProperties) => {
					if (userProperties.hasOwnProperty("Posts")) {
						const postKeys = Object.keys(userProperties["Posts"]);
						postKeys.forEach((postKey) => {
							const post = userProperties.Posts[postKey];
							post.City = userProperties.Location.City;
							post.Country = userProperties.Location.Country;
							post.CountryCode = userProperties.Location.CountryCode;
							post.User = userProperties;
							post.postKey = postKey;
							AllPosts = [...AllPosts, post];
						});
					}
				});
			});
		console.log(AllPosts);
		const PostsAfterFiltering =
			this.FilterThesePostsBy_Duration_Date_Cost_Location(AllPosts)(Duration)(
				date
			)(Cost)(Location);
		return PostsAfterFiltering;
	};
	GetProfilePictureOfThisUser = async (FullNameWithSpace) => {
		const [FirstName, LastName] = FullNameWithSpace.split(" ");
		let profilepicture;
		await this.Database()
			.ref(`users`)
			.once("value", (snapshot) => {
				const ArrayOfUsersObject = Object.values(snapshot.val());
				let SkipNextIterations = false;
				ArrayOfUsersObject.forEach((UserObj) => {
					if (SkipNextIterations) return;
					if (
						UserObj.FirstName.toLowerCase() === FirstName.toLowerCase() &&
						UserObj.LastName.toLowerCase() === LastName.toLowerCase()
					) {
						profilepicture = UserObj.ProfilePicture;
						SkipNextIterations = true;
					}
				});
			});
		return profilepicture;
	};
	StoreNumberOfConversations = async (User) => {
		await this.Database()
			.ref(`messages/${User.FirstName} ${User.LastName}`)
			.once("value", (snapshot) => {
				const Count = Object.entries(snapshot.val()).length;
				store.dispatch(ActionsCreator.storeNumberOfConversations(Count));
			});
	};
	AddConversationsChildListeners = async (User) => {
		await this.StoreNumberOfConversations(User);
		this.Database()
			.ref(`messages/${User.FirstName} ${User.LastName}`)
			.on("child_added", async (snapshot) => {
				const loadedConversationObject = {
					[snapshot.key]: {},
				};
				store.dispatch(
					ActionsCreator.loadConversation(loadedConversationObject)
				);
				const messagedUserFullName = snapshot.key;
				const profilePicture = await this.GetProfilePictureOfThisUser(
					messagedUserFullName
				);
				store.dispatch(
					ActionsCreator.appendProfilePicture(
						messagedUserFullName,
						profilePicture
					)
				);
				this.Database()
					.ref(
						`messages/${User.FirstName} ${User.LastName}/${messagedUserFullName}`
					)
					.child("list")
					.on("child_added", (snapshot) => {
						const sentMessageObject = {
							[snapshot.key]: { ...snapshot.val() },
						};
						const selectedUserFullName = snapshot.ref.parent.parent.key;
						if (store.getState().Samples.SamplesList.length !== 0) {
							store.dispatch(ActionsCreator.throwSample());
						}
						store.dispatch(
							ActionsCreator.AppendMessage(
								selectedUserFullName,
								sentMessageObject
							)
						);
					});
				this.Database()
					.ref(
						`messages/${User.FirstName} ${User.LastName}/${messagedUserFullName}`
					)
					.child("list")
					.on("child_changed", (snapshot) => {
						const messageKey = snapshot.key;
						const messageObject = snapshot.val();
						const messagedUserFullName = snapshot.ref.parent.parent.key;
						store.dispatch(
							ActionsCreator.UpdateMessage(
								messageKey,
								messageObject,
								messagedUserFullName
							)
						);
					});
			});
	};
	SendMessageTo = async (LoggedInUser, MessagedUser, Content) => {
		const theNewMessage = new Message(Content, LoggedInUser);
		store.dispatch(ActionsCreator.pushSample(theNewMessage));
		await new Promise((resolve) => setTimeout(resolve, 300));
		const KeyForBothTrees = await this.Database()
			.ref(
				`messages/${LoggedInUser.FirstName} ${LoggedInUser.LastName}/${MessagedUser.FirstName} ${MessagedUser.LastName}`
			)
			.child("list")
			.push(theNewMessage);
		await this.Database()
			.ref(
				`messages/${MessagedUser.FirstName} ${MessagedUser.LastName}/${LoggedInUser.FirstName} ${LoggedInUser.LastName}`
			)
			.child("list")
			.child(KeyForBothTrees.key)
			.push();
		await this.Database()
			.ref(
				`messages/${MessagedUser.FirstName} ${MessagedUser.LastName}/${LoggedInUser.FirstName} ${LoggedInUser.LastName}`
			)
			.child("list")
			.child(KeyForBothTrees.key)
			.set(theNewMessage);
	};
	RemoveConversationsChildListeners = (User) => {
		this.Database().ref(`messages/${User.FirstName} ${User.LastName}`).off();
	};
	MarkSelectedUserMessagesAsRead = async (LoggedInUser, SelectedUserName) => {
		await this.Database()
			.ref(
				`messages/${LoggedInUser.FirstName} ${LoggedInUser.LastName}/${SelectedUserName}`
			)
			.child("list")
			.once("value", (snapshot) => {
				const MessagesAsEntries = Object.entries(snapshot.val());
				MessagesAsEntries.forEach((MessageIndividualEntry) => {
					const MessageObject = MessageIndividualEntry[1];
					const MessageKey = MessageIndividualEntry[0];
					if (
						MessageObject.isRead === false &&
						MessageObject.SendBy.FirstName +
							" " +
							MessageObject.SendBy.LastName !==
							LoggedInUser.FirstName + " " + LoggedInUser.LastName
					) {
						this.Database()
							.ref(
								`messages/${SelectedUserName}/${LoggedInUser.FirstName} ${LoggedInUser.LastName}`
							)
							.child("list")
							.child(MessageKey)
							.update({ isRead: true });
						this.Database()
							.ref(
								`messages/${LoggedInUser.FirstName} ${LoggedInUser.LastName}/${SelectedUserName}`
							)
							.child("list")
							.child(MessageKey)
							.update({ isRead: true });
					}
				});
			});
	};
	IsTypingToFalse = async (LoggedInUser, MessagedUser) => {
		await this.Database()
			.ref(
				`messages/${MessagedUser}/${LoggedInUser.FirstName} ${LoggedInUser.LastName}`
			)
			.child(`isTyping`)
			.set(false);
	};
	IsTypingToTrue = async (LoggedInUser, MessagedUser) => {
		await this.Database()
			.ref(
				`messages/${MessagedUser}/${LoggedInUser.FirstName} ${LoggedInUser.LastName}`
			)
			.child(`isTyping`)
			.set(true);
	};
	ListenForTypingChanges = (LoggedInUser, MessagedUser) => {
		this.Database()
			.ref(
				`messages/${LoggedInUser.FirstName} ${LoggedInUser.LastName}/${MessagedUser}`
			)
			.child("isTyping")
			.on("value", (snapshot) => {
				console.log(snapshot.val());
				const isMessagedUserTyping = snapshot.val() === true;
				if (isMessagedUserTyping) {
					store.dispatch(ActionsCreator.isTypingOn());
				} else {
					store.dispatch(ActionsCreator.isTypingOff());
				}
			});
	};
	RemoveTypingListeners = (LoggedInUser, MessagedUser) => {
		this.Database()
			.ref(
				`messages/${LoggedInUser.FirstName} ${LoggedInUser.LastName}/${MessagedUser}`
			)
			.child("isTyping")
			.off();
	};
	MakeStatusOnline = async (User) => {
		let UserUniqueID_Database;
		await this.Database()
			.ref(`users`)
			.orderByChild("Email")
			.equalTo(User.email)
			.once("value", (snapshot) => {
				UserUniqueID_Database = Object.keys(snapshot.val())[0];
			});
		this.LoggedInUserUniqueID_Database = UserUniqueID_Database;
		await this.Database()
			.ref(`users/${UserUniqueID_Database}/status`)
			.set(this.LoggedInStatuses_Enum.ONLINE);
	};
	MakeStatusOfflineWithLastActive = async () => {
		const lastActiveObject = GenerateTodayDateAndTimeObject();
		await this.Database()
			.ref(`users/${this.LoggedInUserUniqueID_Database}/lastActive`)
			.set(lastActiveObject);
		await this.Database()
			.ref(`users/${this.LoggedInUserUniqueID_Database}/status`)
			.set(this.LoggedInStatuses_Enum.OFFLINE);
	};
	GetUserIDByFirstNameAndLastName = async (UserFullName) => {
		const [FirstName, LastName] = UserFullName.split(" ");
		let SameFirstNameArray;
		await this.Database()
			.ref(`users`)
			.orderByChild("FirstName")
			.equalTo(FirstName)
			.once("value", (snapshot) => {
				SameFirstNameArray = Object.entries(snapshot.val());
			});
		let UserUniqueID = null;
		const UserKey = 0;
		const UserObject = 1;
		for (let i = 0; i < SameFirstNameArray.length; i++) {
			console.log(LastName, SameFirstNameArray[i][UserObject].LastName);
			if (LastName === SameFirstNameArray[i][UserObject].LastName) {
				UserUniqueID = SameFirstNameArray[i][UserKey];
				break;
			}
		}
		return UserUniqueID;
	};
	LastActiveListener = async (UserFullName) => {
		const UserUniqueID = await this.GetUserIDByFirstNameAndLastName(
			UserFullName
		);
		this.Database()
			.ref(`users/${UserUniqueID}/status`)
			.on("value", (snapshot) => {
				const userStatus = snapshot.val();
				store.dispatch(
					ActionsCreator.appendUserStatus(UserFullName, userStatus)
				);
			});
		this.Database()
			.ref(`users/${UserUniqueID}/lastActive`)
			.on("value", (snapshot) => {
				const lastActiveValue = snapshot.val();
				console.log(lastActiveValue);
				store.dispatch(
					ActionsCreator.appendLastActive(UserFullName, lastActiveValue)
				);
			});
	};
	GetAccountPassword = async (Email) => {
		let Password = null;
		await this.Database()
			.ref("users")
			.orderByChild("Email")
			.equalTo(Email.toLowerCase())
			.once("value", (snapshot) => {
				Password = Object.values(snapshot.val())[0].Password;
			});
		return Password;
	};
	LoggedInUserStatusObserver = async (User) => {
		let uid;
		await this.Database()
			.ref(`users`)
			.orderByChild("Email")
			.equalTo(User.email)
			.once("value", (snapshot) => {
				uid = Object.keys(snapshot.val())[0];
			});
		this.LoggedInUserUniqueID_Database = uid;
		const UserStatusRef = this.Database().ref(`users/${uid}`);
		UserStatusRef.child("status").set(this.LoggedInStatuses_Enum.ONLINE);
		const lastSeenTimestamp = GenerateTodayDateAndTimeObject();
		UserStatusRef.child("lastActive").onDisconnect().set(lastSeenTimestamp);
	};
	EditUserDetails = async (PrevFullName, Inputs) => {
		const UserUniqueID = await this.GetUserIDByFirstNameAndLastName(
			PrevFullName
		);
		const AvatarDownloadLink = await this.ImageToStorage(Inputs.Avatar);
		await this.Database()
			.ref(`users/${UserUniqueID}`)
			.update({
				ProfilePicture: AvatarDownloadLink,
				FirstName: Inputs.FirstName,
				LastName: Inputs.LastName,
				UserType: Inputs.UserType,
				Location: Inputs.Location,
			})
			.then(() => {
				const ModifiedInputs = {
					...Inputs,
					ProfilePicture: AvatarDownloadLink,
				};
				Object.entries(ModifiedInputs).forEach((entry) => {
					store.dispatch(
						ActionsCreator.updateLoggedInUserAttribute(entry[0], entry[1])
					);
				});
			});
	};
}
export const FirebaseUtilityInstance = new FirebaseUtilityClass();
export default FirebaseUtilityInstance;
