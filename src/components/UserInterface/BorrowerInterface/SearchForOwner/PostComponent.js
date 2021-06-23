import React from "react";
import {
	currencyConverter,
	FormatDurationTo_12HourFormat,
} from "../../../../helpers/Functions";
import Styles from "../BorrowerInterface.module.css";
const PostComponent = ({ Post, currentDelay }) => {
	return (
		<div
			className={Styles.PostCard}
			style={{ animationDelay: `${currentDelay()}s` }}
		>
			<img src={Post.DogPicture} className={Styles.PostDogPicture} />
			<div className={Styles.PostCardContentWrapper}>
				<p>Dog Type : {Post.DogType}</p>
				<p>Dog Name : {Post.DogName}</p>
				<p>
					Duration :
					{" " +
						FormatDurationTo_12HourFormat(Post.StartingDuration) +
						" -- " +
						FormatDurationTo_12HourFormat(Post.EndingDuration)}
				</p>
				<p>
					Date :
					{` ${Post.DayOfBorrow}/${Post.MonthOfBorrow}/${Post.YearOfBorrow}`}
				</p>
				<p>Cost : {` ${Post.Cost}${currencyConverter(Post.Currency)}`}</p>
				<p>Aggresive : {` ${Post.Aggresive ? "Yes" : "No"}`}</p>
			</div>
		</div>
	);
};

export default PostComponent;
