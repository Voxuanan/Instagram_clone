import React from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

const CardHeader = ({ post }) => {
    const { auth } = useSelector((state) => state);
    return (
        <div className="card-header">
            <div className="d-flex justify-content-between">
                <Link to={`/profile/${post.user._id}`} className="d-flex align-item-center">
                    <Avatar src={post.user.avatar} size="avatar-big" />
                    <div className="ml-1">
                        <span className="d-block text-dark">{post.user.fullname}</span>
                        <small className="text-muted">{moment(post.createdAt).fromNow()}</small>
                    </div>
                </Link>
                <div>
                    <div className="nav-item dropdown">
                        <span className="material-icons" id="moreLink" data-toggle="dropdown">
                            more_horiz
                        </span>

                        <div className="dropdown-menu">
                            {auth.user._id === post.user._id && (
                                <>
                                    <div className="dropdown-item">
                                        <span className="material-icons">create</span> Edit post
                                    </div>
                                    <div className="dropdown-item">
                                        <span className="material-icons">delete</span>
                                        Remove post
                                    </div>
                                </>
                            )}
                            <div className="dropdown-item">
                                <span className="material-icons">content_copy</span>
                                Copy link
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardHeader;
