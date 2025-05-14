import { useAppSelector } from "../hooks/hooks"
 
import { Navigate   } from "react-router-dom"
import { useCurrentUser } from "../redux/features/auth/authSlice"

const PrivateRoute = ({ children }) => {
 

    const user = useAppSelector(useCurrentUser)

    if (!user) {
        return <Navigate to="/login" />
    }

  return children
}

export default PrivateRoute

