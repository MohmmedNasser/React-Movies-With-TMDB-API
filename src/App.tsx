import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "sonner";

function App() {
    return (
        <Layout>
            <Outlet />
            <Toaster richColors />
        </Layout>
    );
}

export default App;
