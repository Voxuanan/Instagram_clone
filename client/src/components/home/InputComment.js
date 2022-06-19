import React, { useState } from "react";
import Send from "../../images/send.svg";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";

const InputComment = ({ children, post, onReply, setOnReply }) => {
    const [content, setContent] = useState("");
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) {
            if (setOnReply) return setOnReply(false);
            return;
        }
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user,
        };
        setContent("");
        dispatch(createComment({ post, newComment, auth }));
        if (setOnReply) return setOnReply(false);
    };
    return (
        <form className="card-footer comment_input" onSubmit={handleSubmit}>
            {children}
            <input
                type="text"
                placeholder="Add your comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" className="postBtn" disabled={!content.trim()}>
                <img src={Send} alt="Send" />
            </button>
        </form>
    );
};

export default InputComment;
