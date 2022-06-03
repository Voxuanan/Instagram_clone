import { GLOBALTYPES } from "./globalTypes";
import { POST_TYPES } from "./postAction";
import { postDataAPI } from "../../utils/fetchData";

export const createComment = (post, newComment, auth) => async (dispatch) => {
    try {
        const newPost = { ...post, comments: [...post.comments, newComment] };
        const data = { ...newComment, postId: post._id };
        const res = await postDataAPI("comment", data, auth.token);
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
    }
};
