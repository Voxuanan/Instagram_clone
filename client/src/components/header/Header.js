import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

const Header = () => {
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light justify-content-between align-middle">
                <Link className="navbar-brand" to="/">
                    <h1 className="navbar-brand" onClick={() => window.scrollTo({ top: 0 })}>
                        Instagram Clone
                    </h1>
                </Link>
                <Search />
                <Menu />
            </nav>
        </div>
    );
};

export default Header;
