import { useLayoutEffect, useState } from "react";
import { GenerateTitleByLocationPathName } from "../helpers/Functions";

const useTabTitle = (history) => {
	const [Title, setTitle] = useState("");
	useLayoutEffect(() => {
		setTitle(GenerateTitleByLocationPathName(history.location.pathname));
	}, [history.location.pathname]);
	return Title;
};

export default useTabTitle;
