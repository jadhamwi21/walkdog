import React from "react";
import { motion } from "framer-motion";
const myVariant = {
	init: {
		opacity: 0,
	},
	in: { opacity: 1 },
	out: { opacity: 0 },
};
const AnimatedComponentWrapper = ({ children, className }) => {
	return (
		<motion.div
			initial="init"
			animate="in"
			exit="out"
			variants={myVariant}
			transition={{ duration: 0.3 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};

export default AnimatedComponentWrapper;
