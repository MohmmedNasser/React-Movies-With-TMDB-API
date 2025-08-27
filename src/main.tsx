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
                path: "/search",
                element: <Search />,
            },
            {
                path: "/details/:type/:id",
                element: <DetailsPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GenresProvider>
            <RouterProvider router={router} />
        </GenresProvider>
    </StrictMode>
);
