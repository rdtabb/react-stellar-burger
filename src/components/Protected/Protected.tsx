import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { authInfoSelector } from "../../services/authSlice";
import { ROUTES } from "../../utils/api";

interface IProtectedProps {
  onlyUnAuth: boolean;
  component: JSX.Element;
}

const Protected = ({
  onlyUnAuth = false,
  component,
}: IProtectedProps): JSX.Element => {
  const { user, status } = useSelector(authInfoSelector);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathName: "/" } };
    console.log("case 1: ", user, onlyUnAuth);

    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    console.log("case 2: ", user, onlyUnAuth);

    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
  }

  console.log("case 3: ", user, onlyUnAuth);
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component,
}: Pick<IProtectedProps, "component">) => (
  <Protected onlyUnAuth={true} component={component} />
);
