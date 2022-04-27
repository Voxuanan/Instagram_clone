import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    return (
        <div className="status my-3 d-flex">
            <Avatar src={auth.user.avatar} alt="avatar" size="avatar-big" />
            <button
                className="statusBtn flex-fill ml-2"
                onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
            >
                {auth.user.username} What are you thinking ?
            </button>
        </div>
    );
};

export default Status;
