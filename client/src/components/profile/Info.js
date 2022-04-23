import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../Avatar";
import { getProfileUser } from "../../redux/actions/profileAction";
import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";

const Info = () => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);

    const { id } = useParams();
    const { auth, profile } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user]);
        } else {
            dispatch(getProfileUser({ users: profile.users, id, auth }));
            const newData = profile.users.filter((user) => user._id === id);
            setUserData(newData);
        }
    }, [id, auth.user, dispatch, profile.users]);

    return (
        <div className="info">
            {userData.map((user) => (
                <div className="info_container" key={user._id}>
                    <div className="info_avatar">
                        <Avatar src={user.avatar} alt="avatar" size="avatar-supper" />
                    </div>
                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{user.username}</h2>
                            {auth.user._id == user._id ? (
                                <button
                                    className="btn btn-outline-info"
                                    onClick={() => setOnEdit(true)}
                                >
                                    Edit profile
                                </button>
                            ) : (
                                <FollowBtn />
                            )}
                        </div>

                        <div className="follow_btn">
                            <span className="mr-4">{user.followers.length} Followers</span>
                            <span className="mr-4">{user.following.length} Following</span>
                        </div>
                        <p>
                            {user.fullname} <span className="text-warning">{user.mobile}</span>
                        </p>
                        <p className="mr-0">{user.address}</p>
                        <p>{user.email}</p>
                        <a href={user.website} target="_blank">
                            {user.website}
                        </a>
                        <p>{user.story}</p>
                    </div>

                    {onEdit && <EditProfile setOnEdit={setOnEdit} />}
                </div>
            ))}
        </div>
    );
};

export default Info;
