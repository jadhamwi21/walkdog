import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useRedirect = ({ from, to }) => {
	const history = useHistory();
	useEffect(() => {
		if (history.location.pathname === from) {
			history.push(to);
		}
	}, [history.location.pathname]);
};

export default useRedirect;
