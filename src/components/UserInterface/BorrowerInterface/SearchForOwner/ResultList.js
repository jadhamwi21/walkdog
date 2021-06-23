import React, { useState } from "react";
import Styles from "../BorrowerInterface.module.css";
import { Button } from "@material-ui/core";
import UserProfile from "./UserProfile";
const ResultList = ({ Result }) => {
	const [selectedUser, setSelectedUser] = useState("");
	console.log(Result);
	return (
		<>
			<div>
				{Result.map((user) => {
					return (
						<div className={Styles.RowDiv} key={user.Email}>
							<div
								style={{
									height: "90%",
									width: "fit-content",
									borderRadius: "4px",
								}}
							>
								<img
									src={user.ProfilePicture}
									className={Styles.SmallProfilePicture}
								/>
							</div>
							<p>{user.FirstName + " " + user.LastName}</p>
							<Button
								className={Styles.Button}
								onClick={() => setSelectedUser(user)}
							>
								View
							</Button>
						</div>
					);
				})}
			</div>
			{/* When User Clicks On View Button A Modal Should Popup That's The User Profile*/}
			{selectedUser !== "" && (
				<UserProfile
					User={selectedUser}
					CloseModal={() => setSelectedUser("")}
				/>
			)}
		</>
	);
};

export default ResultList;
