import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Constructor,
  IngredientDetailsPage,
  Profile,
  ResetPassStageTwo,
  RegisterForm,
  LoginForm,
  ResetPassStageOne
} from "./pages";
import { AppHeader } from "./components/app-header/app-header";

import { OnlyAuth, OnlyUnAuth } from "./components/protected/protected";
import { store } from "./store/store";
import { ROUTES } from "./utils/api";

export const App = () => {
  return (
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
              element={<OnlyUnAuth component={<LoginForm />} />}
            />
            <Route
              path={ROUTES.REGISTER}
              element={<OnlyUnAuth component={<RegisterForm />} />}
            />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              element={<OnlyUnAuth component={<ResetPassStageOne />} />}
            />
            <Route
              path={ROUTES.PROFILE}
              element={<OnlyAuth component={<Profile />} />}
            />
            <Route
              path={ROUTES.RESET_PASSWORD}
              element={<OnlyUnAuth component={<ResetPassStageTwo />} />}
            />
            <Route
              path={`${ROUTES.INGREDIENT_DETAILS}/:id`}
              element={<OnlyAuth component={<IngredientDetailsPage />} />}
            />
          </Routes>
        </Router>
      </Provider>
    </DndProvider>
  );
};
