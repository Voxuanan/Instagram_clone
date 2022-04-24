import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";

const EditProfile = ({ setOnEdit }) => {
    const initState = {
        fullname: "",
        mobile: "",
        address: "",
        website: "",
        story: "",
        gender: "",
    };
    const [userData, setUserData] = useState(initState);
    const { fullname, mobile, address, website, story, gender } = userData;
    const [avatar, setAvatar] = useState("");
    const { auth, theme } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        setUserData(auth.user);
    }, [auth.user]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const changeAvatar = (e) => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setAvatar(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfileUser({ userData, avatar, auth }));
        setOnEdit(false);
    };

    return (
        <div className="edit-profile">
            <span className="btn_close" onClick={() => setOnEdit(false)}>
                &times;
            </span>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img
                        src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                        alt="avatar"
                        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                    />
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input
                            type="file"
                            name="file"
                            id="file_up"
                            accept="image/*"
                            onChange={changeAvatar}
                        />
                    </span>
                </div>
                <div className="form_group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input
                            type="text"
                            // className={alert.fullname ? "invalid_input form-control" : "form-control"}
                            className="form-control"
                            id="fullname"
                            name="fullname"
                            value={fullname}
                            onChange={handleChangeInput}
                        />
                        <small
                            className="text-danger position-absolute"
                            style={{ top: "50%", right: "5px", transform: "translateY(-50%)" }}
                        >
                            {fullname.length}/25
                        </small>
                    </div>
                </div>
                <div className="form_group">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="number"
                        // className={alert.fullname ? "invalid_input form-control" : "form-control"}
                        className="form-control"
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        // className={alert.fullname ? "invalid_input form-control" : "form-control"}
                        className="form-control"
                        id="address"
                        name="address"
                        value={address}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="website">Website</label>
                    <input
                        type="text"
                        // className={alert.fullname ? "invalid_input form-control" : "form-control"}
                        className="form-control"
                        id="website"
                        name="website"
                        value={website}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="story">Story</label>
                    <textarea
                        type="text"
                        // className={alert.fullname ? "invalid_input form-control" : "form-control"}
                        className="form-control"
                        id="story"
                        name="story"
                        cols="30"
                        rows="4"
                        value={story}
                        onChange={handleChangeInput}
                    ></textarea>
                    <small className="text-danger d-block text-right">{story.length}/200</small>
                </div>
                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select
                        name="gender"
                        id="gender"
                        className="custom-select"
                        onChange={handleChangeInput}
                        value={gender}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button className="btn btn-info w-100">Save</button>
            </form>
        </div>
    );
};

export default EditProfile;
