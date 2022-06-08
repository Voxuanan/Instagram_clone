import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import CommentMenu from "./CommentMenu";

const CommentCard = ({ comment, post }) => {
    const [content, setContent] = useState("");
    const [readMore, setReadMore] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "inherit" : "none",
    };

    useEffect(() => {
        setContent(comment.content);
    }, [comment]);

    const handleLike = async () => {
        // if (loadLike) return;
        // setLoadLike(true);
        // await dispatch(LikePost({ post, auth }));
        // setIsLike(true);
        // setLoadLike(false);
    };

    const handleUnlike = async () => {
        // if (loadLike) return;
        // setLoadLike(true);
        // await dispatch(UnlikePost({ post, auth }));
        // setIsLike(false);
        // setLoadLike(false);
    };

    return (
        <div className="comment_card mt-3" style={styleCard}>
            <Link to={`profile/${comment.user._id}`} className="d-flex text-dark">
                <Avatar src={comment.user.avatar} size="avatar-small" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>

            <div className="comment_content">
                <div className="flex-fill">
                    <div>
                        <span>
                            {content.length < 100
                                ? content
                                : readMore
                                ? content + " "
                                : content.slice(0, 100) + "..."}
                        </span>
                        {content.length >= 100 && (
                            <span
                                className="readMore"
                                onClick={() => {
                                    setReadMore(!readMore);
                                }}
                            >
                                {readMore ? "Hide content" : "Read more"}
                            </span>
                        )}
                    </div>
                    <div style={{ cursor: "pointer" }}>
                        <small className="text-muted mr-3">
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="text-muted mr-3">{comment.likes.length} likes</small>
                        <small className="text-muted mr-3">reply</small>
                    </div>
                </div>
                <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
                    <LikeButton
                        isLike={isLike}
                        handleUnlike={handleUnlike}
                        handleLike={handleLike}
                    />
                    <CommentMenu post={post} comment={comment} auth={auth} />
                </div>
            </div>
        </div>
    );
};

export default CommentCard;