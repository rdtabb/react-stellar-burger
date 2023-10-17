import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Constructor from "./pages/Constructor/Constructor";
import AppHeader from "./components/AppHeader/AppHeader";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPage from "./components/ForgotPage/ForgotPage";

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <AppHeader />
        <Router>
          <Routes>
            <Route path="/" element={<Constructor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPage />} />
          </Routes>
        </Router>
      </Provider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
