import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useStyles from "./navbar.styles";
import memories from "../../assets/memories.jpg";
import { useDispatch } from "react-redux";

const Navbar = () => {
	const classes = useStyles();
	const profile = JSON.parse(localStorage.getItem("profile"));
	const [user, setUser] = useState(profile);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	console.log("user::", user);

	useEffect(() => {
		const token = user?.token;

		//jwt check and set if doing manual tokenizing

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const logout = () => {
		try {
			dispatch({ type: "USER_LOGOUT" });

			navigate("/");
			setUser(null);
		} catch (error) {}
	};

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<div className={classes.brandContainer}>
				<Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">
					Memories
				</Typography>
				<img className={classes.image} src={memories} alt="icon" height="60" />
			</div>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to="/auth"
						variant="contained"
						color="primary"
						className={classes.logout}
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
