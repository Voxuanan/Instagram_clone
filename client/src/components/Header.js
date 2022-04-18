import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";
import { GLOBALTYPES } from "../redux/actions/globalType";
import Avatar from "./Avatar";

const Header = () => {
    const navLinks = [
        { label: "Home", icon: "home", path: "/" },
        { label: "Message", icon: "near_me", path: "/message" },
        { label: "Discover", icon: "explore", path: "/discover" },
        { label: "Notify", icon: "favorite", path: "/notify" },
    ];

    const { auth, theme } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
                <Link className="navbar-brand" to="/">
                    <h1 className="navbar-brand">Instagram Clone</h1>
                </Link>

                <div className="menu">
                    <ul className="navbar-nav flex-row">
                        {navLinks.map((link, index) => {
                            return (
                                <li
                                    className={
                                        pathname == link.path ? "nav-item active" : "nav-item"
                                    }
                                    key={link.label}
                                >
                                    <Link className="nav-link" to={link.path}>
                                        <span className="material-icons">{link.icon}</span>
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <Avatar src={auth.user.avatar} />
                            </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`/profle/${auth.user._id}`}>
                                    Profile
                                </Link>
                                <label
                                    htmlFor="theme"
                                    className="dropdown-item"
                                    onClick={() =>
                                        dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
                                    }
                                >
                                    {theme ? "Light Mode" : "Dark Mode"}
                                </label>

                                <div className="dropdown-divider" />
                                <Link className="dropdown-item" to="/" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
