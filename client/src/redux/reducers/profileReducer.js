import { PROFILES_TYPES } from "../actions/profileAction";

const initialState = {
    loading: false,
    users: [],
    posts: [],
};
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILES_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case PROFILES_TYPES.GET_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user],
            };
        default:
            return state;
    }
};

export default profileReducer;
