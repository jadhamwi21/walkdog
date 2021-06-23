import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
process.env.NODE_ENV !== "development" && (console.log = () => {});
ReactDOM.render(
	<Router history={history}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Router>,
	document.getElementById("root")
);
