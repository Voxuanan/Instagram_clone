import React from "react";
import Avatar from "./Avatar";

const UserCard = ({ user }) => {
    return (
        <div className="d-flex p-2 align-item-center border">
            <Avatar src={user.avatar} size="avatar-big" />
            <div className="ml-1">
                <span className="d-block">{user.username}</span>
                <small>{user.fullname}</small>
            </div>
        </div>
    );
};

export default UserCard;
