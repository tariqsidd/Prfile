import React from "react";
import MyProfile from "./screens/MyProfile";
import Profiles from "./screens/Profiles";
import Auth from "./screens/Auth";


export const routes = [
    {
        exact: true,
        element: Auth,
        path:"/auth",
        publicRoute: true
    },

    {
        exact: true,
        element: MyProfile,
        path:"/",
        publicRoute: false
    },
    {
        exact: true,
        element: Profiles,
        path:"/profiles",
        publicRoute: false
    },
];
