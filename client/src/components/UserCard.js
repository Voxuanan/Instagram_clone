import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserCard = ({ user, handleClose }) => {
    return (
        <div className="d-flex p-2  border">
            <Link
                to={`/profile/${user._id}`}
                onClick={handleClose}
                className="d-flex align-item-center"
            >
                <Avatar src={user.avatar} size="avatar-big" />
                <div className="ml-1">
                    <span className="d-block">{user.username}</span>
                    <small>{user.fullname}</small>
                </div>
            </Link>
        </div>
    );
};

export default UserCard;
