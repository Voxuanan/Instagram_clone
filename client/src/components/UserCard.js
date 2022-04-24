import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserCard = ({ user, handleClose, children, setShowFollowers, setShowFollowing }) => {
    const handleCloseAll = () => {
        if (handleClose) handleClose();
        if (setShowFollowers) setShowFollowers(false);
        if (setShowFollowing) setShowFollowing(false);
    };
    return (
        <div className="d-flex p-2 border align-items-center justify-content-between">
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
            {children}
        </div>
    );
};

export default UserCard;
