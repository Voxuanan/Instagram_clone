import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
    const initialState = { email: "", password: "" };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;
    const [typePassword, setTypePassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { auth } = useSelector((state) => state);
    useEffect(() => {
        if (auth.token) navigate("/");
    }, [auth.token, navigate]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userData));
    };

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">Instagram Clone</h3>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={email}
                        onChange={handleChangeInput}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <div className="pass">
                        <input
                            type={typePassword ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            value={password}
                            onChange={handleChangeInput}
                        />
                        <small onClick={() => setTypePassword(!typePassword)}>
                            {typePassword ? "Hide" : "Show"}
                        </small>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={email && password ? false : true}
                >
                    Login
                </button>
                <p className="my-2">
                    You don't have an account?
                    <Link to="/register"> Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
