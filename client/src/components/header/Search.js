import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalType";
import { Link } from "react-router-dom";
import UserCard from "../UserCard";

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (search && auth.token) {
            getDataAPI(`search?username=${search}`, auth.token)
                .then((res) => setUsers(res.data.users))
                .catch((err) => {
                    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.message } });
                });
        }
    }, [search, auth.token, dispatch]);

    const handleChangeInput = (e) => {
        const { value } = e.target;
        setSearch(value);
        setUsers([]);
    };

    const handleClose = () => {
        setUsers([]);
        setSearch("");
    };

    return (
        <form className="search_form">
            <input
                type="text"
                id="search"
                name="search"
                value={search}
                onChange={handleChangeInput}
            />
            <div className="search_icon" style={search ? { opacity: 0 } : { opacity: 0.3 }}>
                <span className="material-icons">search</span>
                <span>Search</span>
            </div>
            <div
                className="close_search"
                onClick={handleClose}
                style={search.length === 0 ? { opacity: 0 } : { opacity: 1 }}
            >
                &times;
            </div>
            <div className="users">
                {users.map((user) => (
                    <Link key={user._id} to={`/profile/${user._id}`}>
                        <UserCard user={user} />
                    </Link>
                ))}
            </div>
        </form>
    );
};

export default Search;
