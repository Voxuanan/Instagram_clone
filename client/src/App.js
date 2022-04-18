import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";

function App() {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshToken());
    }, [dispatch]);
    return (
        <>
            <input type="checkbox" id="theme" />
            <div className="App">
                <div className="main">
                    <BrowserRouter>
                        <Alert />
                        <Routes>
                            <Route exact path="/" element={auth.token ? <Home /> : <Login />} />
                            <Route exact path="/:page" element={<PageRender />} />
                            <Route exact path="/:page/:id" element={<PageRender />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}

export default App;
