import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Constructor,
  IngredientDetailsPage,
  Profile,
  ResetPassStageTwo,
  RegisterForm,
  LoginForm,
  ResetPassStageOne,
} from "../../pages";
import { AppHeader } from "../app-header/app-header";
import { OnlyAuth, OnlyUnAuth } from "../protected/protected";

import styles from "../../pages/ingredient-details/ingredient-details.module.css";
import { initAuthCheck } from "../../services";
import { ROUTES } from "../../utils";
import { Modal } from "../modal/modal";

export const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const navigateToConstructor = useCallback(() => {
    setTimeout(() => navigate(ROUTES.CONSTRUCTOR), 200);
  }, []);

  useEffect(() => {
    dispatch(initAuthCheck());
  }, []);

  return (
    <>
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
    </>
  );
};
