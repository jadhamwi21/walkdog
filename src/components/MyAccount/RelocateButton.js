import { Button } from "@material-ui/core";
import React from "react";
import Styles from "./MyAccount.module.css";
import { isEmpty } from "../../helpers/Functions.js";
import { AnimatePresence, motion } from "framer-motion";
const RelocateButton = ({ LocationState }) => {
	return (
		<AnimatePresence exitBeforeEnter>
			<div>
				<Button
					className={
						LocationState.LocationLoading
							? [Styles.RelocateButton, Styles.RelocateButtonGray].join(" ")
							: Styles.RelocateButton
					}
					onClick={LocationState.LocationClickHandler}
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.75 }}
						key={LocationState.LocationLoading}
					>
						{isEmpty(LocationState.LocationGeo) ? (
							LocationState.LocationLoading === true ? (
								"Relocating..."
							) : (
								"Relocate"
							)
						) : (
							<>
								Your New Location Is: <br />
								Country : {LocationState.LocationGeo.Country}
								<br />
								City : {LocationState.LocationGeo.City}
							</>
						)}
					</motion.div>
				</Button>
			</div>
		</AnimatePresence>
	);
};

export default RelocateButton;
