import React from "react";

const AnimationScrollWrapper = ({ children }) => {
	return (
		<div
			data-aos="fade"
			data-aos-offset="200"
			data-aos-duration="500"
			data-aos-mirror="true"
			style={{ width: "100%", height: "fit-content", margin: "0 auto" }}
		>
			{children}
		</div>
	);
};

export default AnimationScrollWrapper;
