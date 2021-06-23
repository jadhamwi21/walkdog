import React from "react";
import { InterfaceAsPropsENUMS } from "./MobileChatUI";
import { motion } from "framer-motion";
const MobileChatTransitionWrapper = ({ children }) => {
	return (
		<motion.div
			initial={{ left: "+100%", top: "0px" }}
			animate={{ left: "0%", top: "0px" }}
			exit={{ left: "+100%", top: "0px" }}
			style={{ position: "absolute" }}
			transition={{ duration: 0.4 }}
		>
			{children}
		</motion.div>
	);
};

export default MobileChatTransitionWrapper;
