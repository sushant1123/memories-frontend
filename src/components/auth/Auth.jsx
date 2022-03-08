import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, Typography, Container } from "@material-ui/core";

import { GoogleLogin } from "react-google-login";

import useStyles from "./auth.styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../redux/actions/auth.actions.js";
import { USER_AUTH } from "../../redux/constants/auth.constants";

const initialUserState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	const classes = useStyles();
	const [isSignup, setIsSignup] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState(initialUserState);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const googleSuccess = async (response) => {
		// const result = response.profileObj; // if we do not have response obj then we get cannot read property profileObj of undefined

		const result = response?.profileObj; //undefined     ? is a chaining operator
		const token = response?.tokenId; //undefined     ? is a chaining operator

		try {
			dispatch({ type: USER_AUTH, payload: { result, token } });

			//after successfully sign in, automatically navigate to home route
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log("Google Sign in was failed. Try Again Later");
		console.log("Error::", error);
	};

	//show signup or signin mode based on onClick
	const switchMode = () => {
		setFormData(initialUserState);
		// setIsSignup(!isSignup);
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};

	//on click on eye icon, show password
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
		// setShowPassword((prevState) => !prevState);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);

		if (isSignup) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};

	return (
		<Container component={"main"} maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				{/* <Typography variant="h5">{isSignup ? "Sign In" : "Sign Up"}</Typography> */}
				<Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
				<form action="" className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									type="text"
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
								/>

								<Input
									type="text"
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							type="email"
							name="email"
							label="Email Address"
							handleChange={handleChange}
							// autoFocus={isSignup ? false : true}
						/>

						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							handleShowPassword={handleShowPassword}
							type={showPassword ? "text" : "password"}
						/>

						{isSignup ? (
							<Input
								type="password"
								name="confirmPassword"
								label="Confirm/Repeat Password"
								handleChange={handleChange}
							/>
						) : null}
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignup ? "Sign Up" : "Sign In"}
					</Button>

					<GoogleLogin
						clientId="491668161378-puek3fed64m85ku4oq60up35ritjbgv7.apps.googleusercontent.com"
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color="primary"
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant="contained"
							>
								Google Sign In
							</Button>
						)}
						onFailure={googleFailure}
						onSuccess={googleSuccess}
						cookiePolicy="single_host_origin"
					/>

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? "Already have an account? Sign In"
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
