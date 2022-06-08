import React from "react";

const CommentMenu = ({ post, comment, auth }) => {
    return (
        <div className="menu">
            {(post.user._id === auth.user._id || comment.user._id === auth.user._id) && (
                <div className="nav-item dropdown">
                    <span className="material-icons" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>
                </div>
            )}
        </div>
    );
};

export default CommentMenu;
