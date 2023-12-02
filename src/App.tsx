import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";

import {
  Constructor,
  IngredientDetailsPage,
  Profile,
  ResetPassStageTwo,
  RegisterForm,
  LoginForm,
  ResetPassStageOne,
} from "./pages";
import { AppHeader } from "./components/app-header/app-header";
import { IngredientDetails } from "./components/ingredient-details/ingredient-details";
import { OnlyAuth, OnlyUnAuth } from "./components/protected/protected";

import styles from "./pages/ingredient-details/ingredient-details.module.css";
import { store } from "./store/store";
import { initAuthCheck } from "./services/authSlice";
import { ROUTES } from "./utils/api";
import { Modal } from "./components/modal/modal";

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = location.state?.previousLocation;

  const navigateToConstructor = useCallback(() => {
    setTimeout(() => navigate(ROUTES.CONSTRUCTOR), 200);
  }, []);

  useEffect(() => {
    store.dispatch(initAuthCheck());
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <AppHeader />
        <Routes location={previousLocation || location}>
          <Route path={ROUTES.CONSTRUCTOR} element={<Constructor />} />
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
            element={<IngredientDetailsPage enableRedirect={false} />}
          />
        </Routes>
        {previousLocation && (
          <Routes>
            <Route
              path={`${ROUTES.INGREDIENT_DETAILS}/:id`}
              element={
                <Modal
                  modalContentClass={styles.modalContent}
                  close={navigateToConstructor}
                >
                  <IngredientDetailsPage enableRedirect={true} />
                </Modal>
              }
            />
          </Routes>
        )}
      </Provider>
    </DndProvider>
  );
};
