import { GLOBALTYPES, EditData, DeleteData } from "./globalTypes";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const PROFILE_TYPES = {
    LOADING: "LOADING",
    GET_USER: "GET_USER",
    FOLLOW: "FOLLOW",
    UNFOLLOW: "UNFOLLOW",
};

export const getProfileUser =
    ({ users, id, auth }) =>
    async (dispatch) => {
        if (users.every((user) => user._id !== id)) {
            try {
                dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
                const res = await getDataAPI(`user/${id}`, auth.token);
                dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
                dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
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

export const follow =
    ({ users, user, auth }) =>
    async (dispatch) => {
        try {
            let newUser = { ...user, followers: [...user.followers, auth.user] };
            await patchDataAPI(`user/${user._id}/follow`, null, auth.token);
            dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    ...auth,
                    user: { ...auth.user, following: [...auth.user.following, newUser] },
                },
            });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
        }
    };

export const unfollow =
    ({ users, user, auth }) =>
    async (dispatch) => {
        try {
            let newUser = {
                ...user,
                followers: DeleteData(user.followers, auth.user._id),
            };
            await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token);
            dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    ...auth,
                    user: {
                        ...auth.user,
                        following: DeleteData(auth.user.following, newUser._id),
                    },
                },
            });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
        }
    };
