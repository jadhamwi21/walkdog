import React from "react";
const CardOnScrollWrapper = ({ children, delay }) => {
	return (
		<div
			data-aos="fade-right"
			data-aos-offset="200"
			data-aos-delay={delay}
			data-aos-duration="500"
			data-aos-mirror="true"
		>
			{children}
		</div>
	);
};

export default CardOnScrollWrapper;
