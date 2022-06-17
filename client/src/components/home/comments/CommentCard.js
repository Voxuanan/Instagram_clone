import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import CommentMenu from "./CommentMenu";
import { updateComment, likeComment, unlikeComment } from "../../../redux/actions/commentAction";

const CommentCard = ({ comment, post }) => {
    const [content, setContent] = useState("");
    const [readMore, setReadMore] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "inherit" : "none",
    };

    useEffect(() => {
        setContent(comment.content);
        if (comment.likes.find((like) => like._id === auth.user._id)) setIsLike(true);
    }, [comment, auth.user._id]);

    const handleLike = async () => {
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(likeComment({ comment, post, auth }));
        setIsLike(true);
        setLoadLike(false);
    };

    const handleUnlike = async () => {
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(unlikeComment({ comment, post, auth }));
        setIsLike(false);
        setLoadLike(false);
    };

    const handleUpdate = async () => {
        if (comment.content != content) {
            dispatch(updateComment({ comment, post, content, auth }));
            setOnEdit(false);
        } else {
            setOnEdit(false);
        }
    };

    return (
        <div className="comment_card mt-3" style={styleCard}>
            <Link to={`profile/${comment.user._id}`} className="d-flex text-dark">
                <Avatar src={comment.user.avatar} size="avatar-small" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>

            <div className="comment_content">
                <div className="flex-fill">
                    {onEdit ? (
                        <textarea
                            row="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    ) : (
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
                    )}

                    <div style={{ cursor: "pointer" }}>
                        <small className="text-muted mr-3">
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="text-muted mr-3">{comment.likes.length} likes</small>
                        {onEdit ? (
                            <>
                                <small className="text-muted mr-3" onClick={handleUpdate}>
                                    update
                                </small>
                                <small
                                    className="text-muted mr-3"
                                    onClick={() => {
                                        setOnEdit(false);
                                        setContent(comment.content);
                                    }}
                                >
                                    cancel
                                </small>
                            </>
                        ) : (
                            <small className="text-muted mr-3">reply</small>
                        )}
                    </div>
                </div>
                <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
                    <LikeButton
                        isLike={isLike}
                        handleUnlike={handleUnlike}
                        handleLike={handleLike}
                    />
                    <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
