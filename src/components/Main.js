import React, { lazy, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import ActionsCreator from "../actions/ActionsCreator.js";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import useTabTitle from "../hooks/useTabTitle.js";
import { Helmet } from "react-helmet";
import { useLocation, withRouter } from "react-router";
import { Route } from "react-router-dom";
import { AnimatePresence, usePresence } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import PostFallbackComponent from "./Error/PostFallback/PostFallbackComponent.js";
import SuspenseFallbackComponent from "./SuspenseFallbackComponent.js";
import SuspenseThis from "../hoc/SuspenseThis.js";
import Homepage from "./Homepage/Homepage"
const UserInterface = SuspenseThis(
	lazy(() =>
		new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
			import("./UserInterface/UserInterface")
		)
	)
);
const SignIn = SuspenseThis(
	lazy(() =>
		new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
			import("./SignIn/SignIn")
		)
	)
);
const Signup = SuspenseThis(
	lazy(() =>
		new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
			import("./Signup/Signup")
		)
	)
);
const PostDetailsComponent = SuspenseThis(
	lazy(() =>
		new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
			import(
				"./UserInterface/BorrowerInterface/PostsFilteringComponent/PostDetailsComponent"
			)
		)
	)
);
const UserInbox = SuspenseThis(
	lazy(() =>
		new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
			import("./UserInbox/UserInbox")
		)
	)
);
const MyAccount = SuspenseThis(
	lazy(() =>
		new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
			import("./MyAccount/MyAccount")
		)
	)
);
const Main = ({ history }) => {
	const ReduxDispatch = useDispatch();
	useEffect(() => {
		ReduxDispatch(ActionsCreator.initializeHistory());
	}, []);
	const Title = useTabTitle(history);
	const location = useLocation();
	return (
		<>
			<Helmet>
				<title>{Title}</title>
			</Helmet>
			<AnimatePresence initial={false} exitBeforeEnter>
				<Switch location={location} key={location.pathname}>
					<Route path="/mainpage">
						<UserInterface />
					</Route>
					<Route path="/home">
						<Homepage />
					</Route>
					<Route path="/signin">
						<SignIn />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="/posts/:PostKeyUnDashed">
						<ErrorBoundary FallbackComponent={PostFallbackComponent}>
							<PostDetailsComponent />
						</ErrorBoundary>
					</Route>
					<Route path="/inbox">
						<UserInbox />
					</Route>
					<Route path="/myaccount">
						<MyAccount />
					</Route>
				</Switch>
			</AnimatePresence>
		</>
	);
};
const mapStateToProps = (state) => ({
	keyframe: state.Router.keyframe,
});
export default withRouter(connect(mapStateToProps)(Main));
