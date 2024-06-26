import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import memoriesLogo from "../../assets/memories-Logo.png";
import memoriesText from "../../assets/memories-Text.png";
import { logoutUser } from "../../redux/reducers/authReducer/auth.slice";
import { classes } from "./navbar.styles";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch(logoutUser());

    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppBar sx={classes.appBar} position="static" color="inherit">
      <Link sx={classes.brandContainer} to="/">
        <img src={memoriesText} alt="Memories Text" height="45px" />
        <img style={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar sx={classes.toolbar}>
        {user?.result ? (
          <div style={classes.profile}>
            <Avatar sx={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography sx={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button variant="contained" sx={classes.logout} color="secondary" onClick={logout}>
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
