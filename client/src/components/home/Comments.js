import React, { useState, useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";

const Comments = ({ post }) => {
    const [comment, setComment] = useState([]);
    const [showComment, setShowComment] = useState([]);
    const [next, setNext] = useState(2);
    const [replyComments, setReplyComments] = useState([]);

    useEffect(() => {
        const newComment = post.comments.filter((comment) => !comment.reply);
        setComment(newComment);
        setShowComment(newComment.slice(newComment.length - next));
    }, [post.comments, next]);

    useEffect(() => {
        const newReply = post.comments.filter((comment) => comment.reply);
        setReplyComments(newReply);
    }, [post.comments]);
    return (
        <div className="comments">
            {showComment.map((comment) => (
                <CommentDisplay
                    key={comment._id}
                    comment={comment}
                    post={post}
                    replyComments={replyComments.filter((item) => item.reply === comment._id)}
                />
            ))}
            {comment.length - next > 0 ? (
                <div
                    className="p-2 border-top "
                    style={{ cursor: "pointer", color: "rgb(17, 17, 140)" }}
                    onClick={() => setNext(next + 10)}
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
