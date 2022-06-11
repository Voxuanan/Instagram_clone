import { EditData, GLOBALTYPES } from "./globalTypes";
import { POST_TYPES } from "./postAction";
import { patchDataAPI, postDataAPI } from "../../utils/fetchData";

export const createComment =
    ({ post, newComment, auth }) =>
    async (dispatch) => {
        try {
            const data = { ...newComment, postId: post._id };
            const res = await postDataAPI("comment", data, auth.token);

            const newData = { ...res.data.newComment, user: auth.user };
            const newPost = { ...post, comments: [...post.comments, newData] };

            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
        }
    };

export const updateComment =
    ({ comment, post, content, auth }) =>
    async (dispatch) => {
        try {
            const newComment = EditData(post.comments, comment._id, { ...comment, content });
            const newPost = { ...post, comments: newComment };
            const res = await patchDataAPI(`comment/${comment._id}`, { content }, auth.token);
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
        }
    };
