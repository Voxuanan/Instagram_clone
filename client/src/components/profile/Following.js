import React from "react";
import UserCard from "../UserCard";
import FollowBtn from "./FollowBtn";
import { useSelector } from "react-redux";

const Following = ({ users, setShowFollowing }) => {
    const { auth } = useSelector((state) => state);
    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Following</h5>
                <hr />
                {users.map((user) => (
                    <UserCard user={user} key={user._id}>
                        {auth.user._id !== user._id && (
                            <FollowBtn user={user} setShowFollowing={setShowFollowing} />
                        )}
                    </UserCard>
                ))}
                <div className="close" onClick={() => setShowFollowing(false)}>
                    &times;
                </div>
            </div>
        </div>
    );
};

export default Following;
