import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post, replyComments }) => {
    const [showComment, setShowComment] = useState([]);
    const [next, setNext] = useState(2);

    useEffect(() => {
        setShowComment(replyComments.slice(replyComments.length - next));
    }, [replyComments, next]);
    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} commentId={comment._id}>
                <div className="pl-4">
                    {replyComments.length - next > 0 ? (
                        <div
                            style={{ cursor: "pointer", color: "rgb(17, 17, 140)" }}
                            onClick={() => setNext(next + 10)}
                        >
                            See more comments
                        </div>
                    ) : (
                        replyComments.length > 2 && (
                            <div
                                style={{ cursor: "pointer", color: "rgb(17, 17, 140)" }}
                                onClick={() => setNext(2)}
                            >
                                Hide comments
                            </div>
                        )
                    )}

                    {showComment.map(
                        (item, index) =>
                            item.reply && (
                                <CommentCard
                                    key={index}
                                    comment={item}
                                    post={post}
                                    commentId={comment._id}
                                />
                            )
                    )}
                </div>
            </CommentCard>
        </div>
    );
};

export default CommentDisplay;
