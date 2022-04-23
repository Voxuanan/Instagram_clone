import { GLOBALTYPES } from "./globalType";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const PROFILES_TYPES = {
    LOADING: "LOADING",
    GET_USER: "GET_USER",
};

export const getProfileUser =
    ({ users, id, auth }) =>
    async (dispatch) => {
        if (users.every((user) => user._id !== id)) {
            try {
                dispatch({ type: PROFILES_TYPES.LOADING, payload: true });
                const res = await getDataAPI(`user/${id}`, auth.token);
                dispatch({ type: PROFILES_TYPES.GET_USER, payload: res.data });
                dispatch({ type: PROFILES_TYPES.LOADING, payload: false });
            } catch (error) {
                dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
            }
        }
    };

export const updateProfileUser =
    ({ userData, avatar, auth }) =>
    async (dispatch) => {
        if (!userData.fullname)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Please add your fullname." },
            });
        if (userData.fullname.length > 25)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Fullname is up to 25 characters long." },
            });
        if (userData.story.length > 200)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Story is up to 200 characters long." },
            });
        try {
            let media;
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            if (avatar) media = await imageUpload([avatar]);
            const res = await patchDataAPI(
                "user",
                {
                    ...userData,
                    avatar: avatar ? media[0].url : auth.user.avatar,
                },
                auth.token
            );
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    ...auth,
                    user: {
                        ...auth.user,
                        ...userData,
                        avatar: avatar ? media[0].url : auth.user.avatar,
                    },
                },
            });
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
        }
    };
