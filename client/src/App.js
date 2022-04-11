import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
    return (
        <>
            <input type="checkbox" id="theme" />
            <div className="App">
                <div className="main">
                    <BrowserRouter>
                        <Routes>
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
