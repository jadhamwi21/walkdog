import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import LoadingIndicator from "./UserInterface/OwnerInterface/EditPost/LoadingIndicator";

const SuspenseFallbackComponent = () => {
	console.log("suspense");
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				style={{
					height: "100vh",
					width: "100%",
					display: "grid",
					placeItems: "center",
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<LoadingIndicator />
			</motion.div>
		</AnimatePresence>
	);
};

export default SuspenseFallbackComponent;
