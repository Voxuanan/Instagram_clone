import { GLOBALTYPES } from "./globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import { getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";

export const POST_TYPES = {
    CREATE_POST: "CREATE_POST",
    GET_POSTS: "GET_POSTS",
    LOADING_POST: "LOADING_POST",
    UPDATE_POST: "UPDATE_POST",
};

export const createPost =
    ({ content, images, auth }) =>
    async (dispatch) => {
        try {
            let media = [];
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            if (images.length > 0) media = await imageUpload(images);
            const res = await postDataAPI("posts", { content, images: media }, auth.token);
            dispatch({
                type: POST_TYPES.CREATE_POST,
                payload: { ...res.data.newPost, user: auth.user },
            });
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
        }
    };

export const updatePost =
    ({ content, images, auth, status }) =>
    async (dispatch) => {
        try {
            let media = [];
            const imgNewUrl = images.filter((img) => !img.url);
            const imgOldUrl = images.filter((img) => img.url);
            if (
                status.content === content &&
                imgNewUrl.length === 0 &&
                imgOldUrl.length === images.length
            )
                return;

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);
            const res = await patchDataAPI(
                `posts/${status._id}`,
                { content, images: [...imgOldUrl, ...media] },
                auth.token
            );
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });
            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
        }
    };

export const getPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: { loading: true } });
        const res = await getDataAPI("posts", token);
        dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });
        dispatch({ type: POST_TYPES.LOADING_POST, payload: { loading: false } });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
    }
};
