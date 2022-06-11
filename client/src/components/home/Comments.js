import React, { useState, useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";

const Comments = ({ post }) => {
    const [comment, setComment] = useState([]);
    const [showComment, setShowComment] = useState([]);
    const [next, setNext] = useState(2);

    useEffect(() => {
        const newComment = post.comments.filter((comment) => !comment.reply);
        setComment(newComment);
        setShowComment(newComment.slice(newComment.length - next));
    }, [post.comments, next]);
    return (
        <div className="comments">
            {showComment.map((comment) => (
                <CommentDisplay key={comment._id} comment={comment} post={post} />
            ))}
            {comment.length - next > 0 ? (
                <div
                    className="p-2 border-top "
                    style={{ cursor: "pointer", color: "rgb(17, 17, 140)" }}
                    onClick={() => setNext(next + 1)}
                >
                    See more comments
                </div>
            ) : (
                comment.length > 2 && (
                    <div
                        className="p-2 border-top "
                        style={{ cursor: "pointer", color: "rgb(17, 17, 140)" }}
                        onClick={() => setNext(2)}
                    >
                        Hide comments
                    </div>
                )
            )}
        </div>
    );
};

export default Comments;
