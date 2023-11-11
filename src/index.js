import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Detail from "./pages/menus/Deatil";

// React18+router6标准写法
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        {/* 根目录 */}
        <Route path="/" element={<App />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </>
);

reportWebVitals();
