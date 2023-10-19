import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/api";

import { OnlyAuth, OnlyUnAuth } from "./components/Protected/Protected";
import Constructor from "./pages/Constructor/Constructor";
import AppHeader from "./components/AppHeader/AppHeader";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPage from "./components/ForgotPage/ForgotPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Router>
          <AppHeader />
          <Routes>
            <Route
              path={ROUTES.CONSTRUCTOR}
              element={<OnlyAuth component={<Constructor />} />}
            />
            <Route
              path={ROUTES.LOGIN}
              element={<OnlyUnAuth component={<Login />} />}
            />
            <Route
              path={ROUTES.REGISTER}
              element={<OnlyUnAuth component={<Register />} />}
            />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              element={<OnlyUnAuth component={<ForgotPage />} />}
            />
            <Route
              path={ROUTES.PROFILE}
              element={<OnlyUnAuth component={<ProfilePage />} />}
            ></Route>
          </Routes>
        </Router>
      </Provider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
