import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import memories from "../../assets/memories.jpg";
import { USER_LOGOUT } from "../../redux/constants/auth.constants";
import useStyles from "./navbar.styles";

const Navbar = () => {
	const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		dispatch({ type: USER_LOGOUT });

		navigate("/auth");
		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<div className={classes.brandContainer}>
				<Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">
					Memories
				</Typography>
				<img className={classes.image} src={memories} alt="icon" height="60" />
			</div>
			<Toolbar className={classes.toolbar}>
				{user?.result ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user?.result.name}
							src={user?.result.imageUrl}
						>
							{user?.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user?.result.name}
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
					<Button component={Link} to="/auth" variant="contained" color="primary">
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
