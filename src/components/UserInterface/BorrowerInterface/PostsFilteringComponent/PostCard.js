import React from "react";
import {
	currencyConverter,
	FormatDurationTo_12HourFormat,
	LineupDate,
} from "../../../../helpers/Functions";
import Styles from "../BorrowerInterface.module.css";
import { Button } from "@material-ui/core";
import ModifiedLink from "../../../../helpers/ModifiedLink.js";
import PostDetailsComponent from "./PostDetailsComponent";
import ActionsCreator from "../../../../actions/ActionsCreator";
import { connect } from "react-redux";
const PostCard = ({ Post, StoreThisPost }) => {
	return (
		<div className={Styles.PostCard}>
			<div className={Styles.CardContentFlex}>
				<img src={Post.DogPicture} className={Styles.CardPicture} />
				<p>City : {Post.City}</p>
				<p>
					Date :{" "}
					{LineupDate(Post.DayOfBorrow, Post.MonthOfBorrow, Post.YearOfBorrow)}
				</p>
				<p>Cost : {Post.Cost + currencyConverter(Post.Currency)}</p>
				<p>
					Duration :{" "}
					{FormatDurationTo_12HourFormat(Post.StartingDuration) +
						" -- " +
						FormatDurationTo_12HourFormat(Post.EndingDuration)}
				</p>
				<ModifiedLink
					className={Styles.DetailsButton}
					component={Button}
					to={`/posts/${Post.postKey.slice(Post.postKey.indexOf("-") + 1)}`}
					additionalFunction={() => StoreThisPost(Post)}
				>
					Details
				</ModifiedLink>
			</div>
		</div>
	);
};
const mapDispatchToProps = (dispatch) => ({
	StoreThisPost: (Post) => dispatch(ActionsCreator.storePostDetails(Post)),
});
export default connect(null, mapDispatchToProps)(PostCard);
