import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";

function App() {
    const { auth, status, modal } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshToken());
    }, [dispatch]);

    useEffect(() => {
        if (auth.token) dispatch(getPosts(auth.token));
    }, [dispatch, auth.token]);
    return (
        <>
            <input type="checkbox" id="theme" />
            <div className="App">
                <div className="main">
                    <BrowserRouter>
                        <Alert />
                        {auth.token && <Header />}
                        {status && <StatusModal />}
                        <Routes>
                            <Route exact path="/" element={auth.token ? <Home /> : <Login />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/register" element={<Register />} />
                            <Route exact path="/:page" element={<PrivateRouter />}>
                                <Route exact path="/:page" element={<PageRender />} />
                            </Route>
                            <Route exact path="/:page/:id" element={<PrivateRouter />}>
                                <Route exact path="/:page/:id" element={<PageRender />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}

export default App;
