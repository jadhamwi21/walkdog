import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export const useHistoryTracker = ({ from, to, id, delay }) => {
	const { prev, cur } = useSelector((state) => ({
		prev: state.History.previous,
		cur: state.History.current,
	}));
	useEffect(() => {
		if (prev.includes(from) && cur.includes(to)) {
			const addDelayBeforeScroll = async () => {
				if (delay !== undefined)
					await new Promise((resolve) => setTimeout(resolve, delay));
				document.getElementById(id).scrollIntoView({
					behavior: "smooth",
				});
			};
			addDelayBeforeScroll();
		}
	});
};

export default useHistoryTracker;
