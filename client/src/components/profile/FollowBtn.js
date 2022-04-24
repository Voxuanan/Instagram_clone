import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
    const [followed, setFollowed] = useState(false);
    const [load, setLoad] = useState(false);

    const { auth, profile } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.user.following.find((item) => item._id === user._id)) {
            setFollowed(true);
        }
    }, [auth.user.following, user._id]);
    const handleFollow = async () => {
        if (load) return;
        setLoad(true);
        await dispatch(follow({ users: profile.users, user, auth }));
        setFollowed(true);
        setLoad(false);
    };
    const handleUnfollow = async () => {
        if (load) return;
        setLoad(true);
        await dispatch(unfollow({ users: profile.users, user, auth }));
        setFollowed(false);
        setLoad(false);
    };

    return (
        <>
            {followed ? (
                <button className="btn btn-outline-secondary" onClick={handleUnfollow}>
                    Unfollow
                </button>
            ) : (
                <button className="btn btn-outline-info" onClick={handleFollow}>
                    Follow
                </button>
            )}
        </>
    );
};

export default FollowBtn;
