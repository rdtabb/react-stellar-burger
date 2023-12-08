import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

import { authInfoSelector } from "../../services";

import { ROUTES } from "../../utils";

interface IProtectedProps {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

const Protected = ({
  onlyUnAuth = false,
  component,
}: IProtectedProps): JSX.Element => {
  const { isAuth } = useSelector(authInfoSelector);
  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    return <Navigate to={{ pathname: ROUTES.CONSTRUCTOR }} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component,
}: Pick<IProtectedProps, "component">) => (
  <Protected onlyUnAuth={true} component={component} />
);
