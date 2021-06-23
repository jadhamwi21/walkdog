import { useEffect } from "react";
export const useHtmlScrollToggle = () => {
	useEffect(() => {
		document.documentElement.style.overflow = "hidden";
		return () => {
			document.documentElement.style.overflow = "unset";
		};
	});
};
