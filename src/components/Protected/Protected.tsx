import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'

import { authInfoSelector } from '@services/index'
import { ROUTES } from '@utils/index'

interface IProtectedProps {
    onlyUnAuth?: boolean
    component: JSX.Element
}

const Protected = ({ onlyUnAuth = false, component }: IProtectedProps): JSX.Element | null => {
    const { isAuth, tokens } = useSelector(authInfoSelector)
    const location = useLocation()

    // if (!isAuthChecked) {
    //     return null
    // }

    console.log(isAuth, tokens)

    if (onlyUnAuth && isAuth) {
        const pathname = location.state?.from.pathname || ROUTES.CONSTRUCTOR

        return <Navigate to={{ pathname }} />
    }

    if (!onlyUnAuth && !isAuth) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />
    }

    return component
}

export const OnlyAuth = Protected
export const OnlyUnAuth = ({ component }: Pick<IProtectedProps, 'component'>) => (
    <Protected onlyUnAuth={true} component={component} />
)
