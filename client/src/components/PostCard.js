import React from "react";
import CardHeader from "./home/postCard/CardHeader";
import CardBody from "./home/postCard/CardBody";
import CardFooter from "./home/postCard/CardFooter";
import InputComment from "./home/InputComment";
import Comments from "./home/Comments";

const Post = ({ post }) => {
    return (
        <div className="card my-3">
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />
            <Comments />
            <InputComment post={post} />
        </div>
    );
};

export default Post;
