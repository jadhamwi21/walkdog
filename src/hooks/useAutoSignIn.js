import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import ActionsCreator from "../actions/ActionsCreator.js";
import { FirebaseUtilityInstance } from "../services/Firebase.js";
const useAutoSignIn = ({ flag }) => {
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		const signOutUser = () => {
			FirebaseUtilityInstance.SignOutUser();
		};
		window.addEventListener("beforeunload", signOutUser);

		const signin = async () => {
			if (flag === 0) {
				const Response = await FirebaseUtilityInstance.SignInUser(
					"borrower@hotmail.com",
					"123123123"
				);
				dispatch(ActionsCreator.borrowerLogin(Response));
			}
			if (flag === 1) {
				const Response = await FirebaseUtilityInstance.SignInUser(
					"jadhamwi21@hotmail.com",
					"123123123"
				);
				dispatch(ActionsCreator.borrowerLogin(Response));
			}
		};
		signin();
		return () => {
			window.removeEventListener("beforeunload", signOutUser);
		};
	}, [flag]);
};

export default useAutoSignIn;
