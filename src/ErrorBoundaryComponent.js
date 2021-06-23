import React, { Component } from "react";
import { connect } from "react-redux";
import ActionsCreator from "./actions/ActionsCreator";
import store from "./store/store";
export const ErrorBoundary_PossibleErrorTypes = {
	Unauthenticated: "Unauthenticated",
	GeneralError: "GeneralError",
};
export class ErrorBoundaryComponent extends Component {
	componentDidCatch() {
		const ErrorType = this.props.errorType;
		const EB_Types = ErrorBoundary_PossibleErrorTypes;
		switch (ErrorType) {
			case EB_Types.Unauthenticated: {
				this.props.StoreAppError(
					"You're Not Authenticated,You Don't Have Access To Posts Without Logging In"
				);
				break;
			}
			case EB_Types.GeneralError: {
				this.props.StoreAppError("Something's Wrong Happened");
				break;
			}
		}
	}
	render() {
		return (
			<>
				{this.props.ErrorMessage === null ? (
					this.props.children
				) : (
					<div
						style={{
							height: "100vh",
							width: "100%",
							display: "grid",
							placeItems: "center",
							color: "red",
							fontWeight: "800",
						}}
					>
						{this.props.ErrorMessage}
					</div>
				)}
			</>
		);
	}
}
const mapStateToProps = (state) => ({
	ErrorMessage: state.ErrorBoundary.errorMessage,
});
const mapDispatchToProps = (dispatch) => ({
	StoreAppError: (errorMessage) =>
		dispatch(ActionsCreator.storeAppError(errorMessage)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ErrorBoundaryComponent);
