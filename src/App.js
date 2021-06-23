import React from "react";
import Header from "./components/Header/Header.js";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer/Footer.js";
import useRedirect from "./hooks/useRedirect.js";
const Theme = createMuiTheme({
	typography: {
		fontFamily: "Montserrat, sans-serif",
	},
});
const App = () => {
	useRedirect({
		from: "/",
		to: "/home",
	});
	return (
		<Provider store={store}>
			<ThemeProvider theme={Theme}>
				<Header />

				<Main />
				<Footer />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
