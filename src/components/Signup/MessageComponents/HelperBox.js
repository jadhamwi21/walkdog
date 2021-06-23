import { Typography } from "@material-ui/core";
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Styles from "../Signup.module.css";
import ExitLogo from "../../../assets/ExitLogo.png";
const HelperBox = ({ CloseBoxHandler, Message }) => {
	const BoxRef = useRef();
	return ReactDOM.createPortal(
		<div className={Styles.Overlay}>
			<div className={Styles.HelperBox} ref={BoxRef}>
				<span
					className={Styles.ExitButtonContainer}
					onClick={() => {
						// setTimout Just To Add A Bit Of Delay After Clicking
						setTimeout(() => {
							BoxRef.current.style.animationTimingFunction =
								"cubic-bezier(0.46,0.44,0.46,0.44)";
							BoxRef.current.style.animationName = Styles.ScaleOut;
							CloseBoxHandler();
						}, 100);
					}}
				>
					<img src={ExitLogo} className={Styles.ExitButton} />
				</span>

				<Typography
					variant="h6"
					align="center"
					className={Styles.HelperBoxContent}
				>
					{Message}
				</Typography>
			</div>
		</div>,
		document.getElementById("portal")
	);
};

export default HelperBox;
