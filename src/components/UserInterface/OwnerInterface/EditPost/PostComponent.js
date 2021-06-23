import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import Styles from "../OwnerInterface.module.css";
import { FormatDurationTo_12HourFormat } from "../../../../helpers/Functions";
import EditPostModal from "./EditPostModal";
import usePost, { postActions } from "../../../../hooks/usePost";
export const editPostContext = React.createContext();
const PostComponent = ({ Post }) => {
	const { Inputs, Errors, Handlers, Modal, Validation, Loading } = usePost(
		postActions.EDIT_POST,
		Post
	);
	return (
		<editPostContext.Provider
			value={{
				Inputs: Inputs,
				Errors: Errors,
				Handlers: Handlers,
				Loading: Loading,
				AddStylesForInvalid: (name) => {
					if (Inputs[name] === "" && Validation === true) {
						return {
							borderColor: "red",
						};
					} else {
						return {};
					}
				},
			}}
		>
			<Card className={Styles.Card}>
				<CardContent className={Styles.CardContent}>
					<div className={Styles.DogPictureWrapper}>
						<img src={Post.DogPicture} className={Styles.DogPictureInCard} />
					</div>
					<Typography variant="h5">Dog Name : {Post.DogName}</Typography>
					<Typography variant="h5">
						Date : {Post.DayOfBorrow}/{Post.MonthOfBorrow}/{Post.YearOfBorrow}
					</Typography>
					<Typography variant="h5">
						Duration : {FormatDurationTo_12HourFormat(Post.StartingDuration)}
						{" - "} {FormatDurationTo_12HourFormat(Post.EndingDuration)}
					</Typography>
					<Button className={Styles.EditButton} onClick={Handlers.toggleModal}>
						Edit
					</Button>
				</CardContent>
			</Card>
			{Modal && <EditPostModal />}
		</editPostContext.Provider>
	);
};

export default PostComponent;
