import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ActionsCreator from "../actions/ActionsCreator";
const ModifiedLink = ({
	className,
	to,
	children,
	style,
	component,
	ReactTo,
	disabled,
	additionalFunction,
	postAdditionalFunction,
}) => {
	const LinkRef = useRef();
	const history = useHistory();
	const ReduxDispatch = useDispatch();
	// This Effect To Handle Page Transition Once The User Is Signed In
	useEffect(() => {
		if (ReactTo === true) {
			LinkRef.current.click();
		}
	}, [ReactTo]);

	const componentProp =
		component !== undefined
			? {
					component: component,
			  }
			: {};
	return (
		<>
			<Link
				ref={LinkRef}
				className={className}
				style={{ ...style }}
				{...componentProp}
				onClick={async () => {
					if (disabled) return;
					if (history.location.pathname === to) return;
					ReduxDispatch(ActionsCreator.updateHistory(to));
					if (additionalFunction !== undefined) {
						await additionalFunction();
					}
					if (to !== undefined) {
						history.push(to);
					}

					if (postAdditionalFunction !== undefined)
						await postAdditionalFunction();
				}}
			>
				{children}
			</Link>
		</>
	);
};
export default ModifiedLink;
