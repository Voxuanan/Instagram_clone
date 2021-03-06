import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Send from "../../../images/send.svg";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import { LikePost, UnlikePost } from "../../../redux/actions/postAction";

const CardFooter = ({ post }) => {
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post.likes.find((like) => like._id === auth.user._id)) {
            setIsLike(true);
        }
    }, [post.likes, auth.user]);

    const handleLike = async () => {
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(LikePost({ post, auth }));
        setIsLike(true);
        setLoadLike(false);
    };

    const handleUnlike = async () => {
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(UnlikePost({ post, auth }));
        setIsLike(false);
        setLoadLike(false);
    };

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton
                        isLike={isLike}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                    />
                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment" />
                    </Link>
                    <img src={Send} alt="" />
                </div>
                <i className="far fa-bookmark" />
            </div>
            <div className="d-flex justify-content-between">
                <h6 style={{ padding: " 0 25px", cursor: "pointer" }}>{post.likes.length} likes</h6>
                <h6 style={{ padding: " 0 25px", cursor: "pointer" }}>
                    {post.comments.length} comments
                </h6>
            </div>
        </div>
    );
};

export default CardFooter;
