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
import App from "./components/app/app";
import AppHeader from "./components/AppHeader/AppHeader";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ForgotPage from "./components/ForgotPage/ForgotPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ResetPage from "./components/ResetPage/ResetPage";

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Router>
          <AppHeader />
          <Routes>
            <Route
              path={ROUTES.CONSTRUCTOR}
              element={<OnlyAuth component={<App />} />}
            />
            <Route
              path={ROUTES.LOGIN}
              element={<OnlyUnAuth component={<LoginPage />} />}
            />
            <Route
              path={ROUTES.REGISTER}
              element={<OnlyUnAuth component={<RegisterPage />} />}
            />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              element={<OnlyUnAuth component={<ForgotPage />} />}
            />
            <Route
              path={ROUTES.PROFILE}
              element={<OnlyAuth component={<ProfilePage />} />}
            ></Route>
            <Route
              path={ROUTES.RESET_PASSWORD}
              element={<OnlyUnAuth component={<ResetPage />} />}
            ></Route>
          </Routes>
        </Router>
      </Provider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
