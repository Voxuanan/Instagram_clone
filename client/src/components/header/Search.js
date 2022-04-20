import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalType";
import { Link } from "react-router-dom";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (search && auth.token) {
            setLoad(true);
            getDataAPI(`search?username=${search}`, auth.token)
                .then((res) => {
                    setUsers(res.data.users);
                    setLoad(false);
                })
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
        <form className="search_form" onSubmit={(e) => e.preventDefault()}>
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
            {load || (
                <div
                    className="close_search"
                    onClick={handleClose}
                    style={search.length === 0 ? { opacity: 0 } : { opacity: 1 }}
                >
                    &times;
                </div>
            )}
            {load && <img src={LoadIcon} alt="loading" className="loading" />}

            <div className="users">
                {users.map((user) => (
                    <UserCard user={user} key={user._id} handleClose={handleClose} />
                ))}
            </div>
        </form>
    );
};

export default Search;
