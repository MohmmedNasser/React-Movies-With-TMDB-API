import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home/index.tsx";
import Movies from "./views/Movies/index.tsx";
import Shows from "./views/Shows/index.tsx";
import Search from "./views/Search/index.tsx";
import { createRoot } from "react-dom/client";
import { GenresProvider } from "./context/GenresProvider.tsx";
import DetailsPage from "./views/DetailsPage.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import Watchlist from "./views/Watchlist/index.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import People from "./views/People/index.tsx";
import PeopleDetails from "./views/People/details.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/shows",
                element: <Shows />,
            },
            {
                path: "/people",
                element: <People />,
            },
            {
                path: "/people/details/:id",
                element: <PeopleDetails />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/details/:type/:id",
                element: <DetailsPage />,
            },
            {
                path: "/watchlist",
                element: (
                    <ProtectedRoute>
                        <Watchlist />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GenresProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </GenresProvider>
    </StrictMode>
);
