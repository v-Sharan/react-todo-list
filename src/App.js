import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Edit, View, EditById, Post } from "./components/CURD";
import Completed from "./components/completed/Completed";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import ViewComplted from "./components/completed/ViewCompleted";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <>
      <Router>
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <div className={`${darkTheme ? "dark" : ""}`}>
          <div className="min-h-screen dark:bg-slate-800">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route path="/AddTodo" element={<Post />} />
            </Routes>
            <Routes>
              <Route path="/Edit" element={<Edit />} />
            </Routes>
            <Routes>
              <Route path="/Edit/:id" element={<EditById />} />
            </Routes>
            <Routes>
              <Route path="/Completed" element={<Completed />} />
            </Routes>
            <Routes>
              <Route path="/view/:id" element={<View />} />
            </Routes>
            <Routes>
              <Route path="/Completed/:id" element={<ViewComplted />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;
