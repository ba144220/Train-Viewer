import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import View from "./pages/View";
import Test from "./pages/Test";

function MainRouter() {
    // const [figure, setFigure] = useState();
    // const [pin, setPin] = useState();
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/view" element={<View />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;
