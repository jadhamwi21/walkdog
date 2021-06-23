import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
	currencyConverter,
	FormatDurationTo_12HourFormat,
	LineupDate,
} from "../../../../helpers/Functions";
import ModifiedLink from "../../../../helpers/ModifiedLink";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import Styles from "../BorrowerInterface.module.css";
import ArrowRight from "../../../../assets/ArrowRight.png";
import DetailComponent from "./DetailComponent";
import SeperatorDiv from "../SearchForOwner/SeperatorDiv";
import LeafletMap from "./LeafletMap";
import ActionsCreator from "../../../../actions/ActionsCreator";
import { useHistory } from "react-router";
import AOS from "aos";
import AnimationScrollWrapper from "./AnimationScrollWrapper";
const PostDetailsComponent = ({
	SelectedPost,
	LatitudeAndLongitudeOfBorrower,
	SelectThisUserForChat,
}) => {
	useScrollToTop();
	useEffect(() => {
		AOS.init();
	}, []);
	const history = useHistory();
	return (
		<div className={Styles.PostDetailsContainer}>
			<ModifiedLink to="/mainpage" className={Styles.BackButton}>
				<img src={ArrowRight} style={{ height: "100%", width: "100%" }} />
			</ModifiedLink>
			<div className={Styles.DetailsContainer}>
				<AnimationScrollWrapper>
					<div className={Styles.PostPart}>
						<div>
							<img
								src={SelectedPost.DogPicture}
								style={{
									height: "250px",
									width: "250px",
									borderRadius: "8px",
								}}
							/>
						</div>
						<div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									height: "50%",
								}}
							>
								<DetailComponent
									leftpart="Dog Name"
									rightpart={SelectedPost.DogName}
								/>
								<DetailComponent
									leftpart="Dog Type"
									rightpart={SelectedPost.DogType}
								/>
								<DetailComponent
									leftpart="City"
									rightpart={SelectedPost.City}
								/>
								<DetailComponent
									leftpart="Date"
									rightpart={LineupDate(
										SelectedPost.DayOfBorrow,
										SelectedPost.MonthOfBorrow,
										SelectedPost.YearOfBorrow
									)}
								/>
								<DetailComponent
									leftpart="Cost"
									rightpart={
										SelectedPost.Cost + currencyConverter(SelectedPost.Currency)
									}
								/>
								<DetailComponent
									leftpart="Duration"
									rightpart={
										FormatDurationTo_12HourFormat(
											SelectedPost.StartingDuration
										) +
										" -- " +
										FormatDurationTo_12HourFormat(SelectedPost.EndingDuration)
									}
								/>
							</div>
						</div>
					</div>
				</AnimationScrollWrapper>
				<SeperatorDiv />

				<AnimationScrollWrapper>
					<div className={Styles.OwnerPart}>
						<div>Owner :</div>
						<div className={Styles.OwnerPartFlexbox}>
							<div>
								<img
									src={SelectedPost.User.ProfilePicture}
									style={{
										height: "200px",
										width: "200px",
										borderRadius: "10px",
									}}
								/>
							</div>
							<div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<DetailComponent
										leftpart="Name"
										rightpart={
											SelectedPost.User.FirstName +
											" " +
											SelectedPost.User.LastName
										}
									/>
									<DetailComponent
										leftpart="Email"
										rightpart={SelectedPost.User.Email}
									/>
									<ModifiedLink
										to="/inbox"
										className={Styles.SendMessageButton}
										additionalFunction={async () => {
											SelectThisUserForChat(
												SelectedPost.User,
												history.location.pathname
											);
											await new Promise((resolve) => setTimeout(resolve, 400));
										}}
										component={Button}
									>
										Send Message
									</ModifiedLink>
								</div>
							</div>
						</div>
					</div>
				</AnimationScrollWrapper>
				<SeperatorDiv />
				<AnimationScrollWrapper>
					<LeafletMap
						OwnerPosition={{
							Latitude: SelectedPost.Latitude,
							Longitude: SelectedPost.Longitude,
						}}
						BorrowerPosition={LatitudeAndLongitudeOfBorrower}
					/>
				</AnimationScrollWrapper>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	SelectedPost: state.Post.storedPost,
	LatitudeAndLongitudeOfBorrower: {
		Latitude: state.Borrower.Location.Latitude,
		Longitude: state.Borrower.Location.Longitude,
	},
});
const mapDispatchToProps = (dispatch) => ({
	SelectThisUserForChat: (User, Path) =>
		dispatch(
			ActionsCreator.selectUserForChat(
				User.FirstName + " " + User.LastName,
				Path
			)
		),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostDetailsComponent);
