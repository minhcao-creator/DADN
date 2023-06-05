import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    //return useRoutes([LoginRoutes , MainRoutes]);

    const loginRoute = useRoutes([LoginRoutes])
    const mainRoute  = useRoutes([MainRoutes])
    if (localStorage.getItem("accessToken")){
        return mainRoute
    }
    else return loginRoute
}
