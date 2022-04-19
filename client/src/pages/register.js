import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const Register = () => {
    const initialState = {
        fullname: "",
        username: "",
        email: "",
        password: "",
        cf_password: "",
        gender: "male",
    };
    const [userData, setUserData] = useState(initialState);
    const { fullname, username, email, password, cf_password, gender } = userData;
    const [typePassword, setTypePassword] = useState(false);
    const [typeConfirmPassword, setTypeConfirmPassword] = useState(false);

    const { auth, alert } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.token) navigate("/");
    }, [auth.token, navigate]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(userData));
    };

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">Instagram Clone</h3>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        className={alert.fullname ? "invalid_input form-control" : "form-control"}
                        id="fullname"
                        name="fullname"
                        value={fullname}
                        onChange={handleChangeInput}
                    />
                    {alert.fullname && <div className="invalid_feedback">{alert.fullname}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="username">UserName</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username.toLowerCase().replace(/ /g, "")}
                        onChange={handleChangeInput}
                        className={alert.username ? "invalid_input form-control" : "form-control"}
                    />
                    {alert.username && <div className="invalid_feedback">{alert.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className={alert.email ? "invalid_input form-control" : "form-control"}
                        id="exampleInputEmail1"
                        name="email"
                        value={email}
                        onChange={handleChangeInput}
                    />
                    {alert.email && <div className="invalid_feedback">{alert.email}</div>}
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <div className="pass">
                            <input
                                type={typePassword ? "text" : "password"}
                                className={
                                    alert.password
                                        ? "invalid_input_no_logo form-control"
                                        : "form-control"
                                }
                                id="exampleInputPassword1"
                                name="password"
                                value={password}
                                onChange={handleChangeInput}
                            />
                            <small onClick={() => setTypePassword(!typePassword)}>
                                {typePassword ? "Hide" : "Show"}
                            </small>
                        </div>
                        {alert.password && <div className="invalid_feedback">{alert.password}</div>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>
                    <div>
                        <div className="pass">
                            <input
                                type={typeConfirmPassword ? "text" : "password"}
                                id="cf_password"
                                name="cf_password"
                                className={
                                    alert.cf_password
                                        ? "invalid_input_no_logo form-control"
                                        : "form-control"
                                }
                                value={cf_password}
                                onChange={handleChangeInput}
                            />
                            <small onClick={() => setTypeConfirmPassword(!typeConfirmPassword)}>
                                {typeConfirmPassword ? "Hide" : "Show"}
                            </small>
                        </div>
                        {alert.cf_password && (
                            <div className="invalid_feedback">{alert.cf_password}</div>
                        )}
                    </div>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        defaultChecked
                        onChange={handleChangeInput}
                    />
                    <label htmlFor="male" className="form-check-label">
                        Male
                    </label>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="female" className="form-check-label">
                            Female
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="other" className="form-check-label">
                            Other
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>
                <p className="my-2">
                    You already have an account?
                    <Link to="/login"> Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
