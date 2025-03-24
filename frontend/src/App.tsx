import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import Layout from "./components/Layout"; // New layout component
import SearchPage from "./pages/Search";

function App() {
  const router = createBrowserRouter([
    { path: "/signup", element: <SignUpPage /> },
    { path: "/login", element: <LoginPage /> },
    {
      path: "/",
      element: <ProtectedRoute />, // Protect routes
      children: [
        {
          index: true,
          element: (
            <Layout> {/* Wrap all pages in a layout */}
              <HomePage />
            </Layout>
          ),
        },
        {
          path: "profile/:username",
          element: (
            <Layout>
              <ProfilePage />
            </Layout>
          ),
        },
        {
          path: "search",
          element: (
            <Layout>
              <SearchPage />
            </Layout>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
