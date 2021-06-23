import { useMediaQuery } from "@material-ui/core";
import React from "react";

export const SeperatorDiv = () => {
	const isMobile = useMediaQuery("(max-width: 764px)");
	return (
		<div
			style={{
				height: "1px",
				width: "100vw",
				backgroundColor: "black",
				...(isMobile ? { marginTop: "10em" } : {}),
			}}
		/>
	);
};

export default SeperatorDiv;
