import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Styles from "./MyAccount.module.css";
const SuccessModal = ({ toggleModal, RouteToAccountDetails, Content }) => {
	return (
		<AnimatePresence>
			<div
				className={Styles.ModalContainer}
				onClick={() => {
					toggleModal();
					RouteToAccountDetails();
				}}
			>
				<div className={Styles.ModalBox} onClick={(e) => e.stopPropagation()}>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						{Content}
					</motion.div>
				</div>
			</div>
		</AnimatePresence>
	);
};

export default SuccessModal;
