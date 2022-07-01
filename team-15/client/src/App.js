import React, { Suspense, useState } from "react";
import { useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import store from "./store/store";
import "antd/dist/antd.min.css";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loader from "./components/Loader";
import Applications from "./pages/employee/Applications";
import EmployeeList from "./pages/hr/employees-list";
import Bargraph from "./pages/hr/Bargraph";
import HRDashboard from "./pages/hr/dashboard";
import About from "./pages/About";
import Probation from "./pages/employee/Probation";
import LoginPage from "./pages/hr/login";
import LoginPageEmployee from "./pages/employee/login";
import RolesPage from "./pages/employee/roles";
import EmployeeDetails from "./pages/employee/details";
import ApplicationsPage from "./pages/employee/Applications";
import Training from "./pages/hr/training";
import Exit from "./pages/hr/exit";
import Goals from "./pages/hr/Goals";

const persistor = persistStore(store);

function App() {
  const MainRoutes = [
    {
      path: "/hr/employees",
      element: <EmployeeList />,
    },
    {
      path: "/hr/bar",
      element: <Bargraph />,
    },
    {
      path: "/employee/applications",
      element: <Applications />,
    },

    {
      path: "/hr/exit",
      element: <Exit />,
    },
    {
      path: "/hr/dashboard",
      element: <HRDashboard />,
    },
    {
      path: "/employee/probation",
      element: <Probation />,
    },
    {
      path: "/",
      element: <About />,
    },
    {
      path: "/hr/login",
      element: <LoginPage />,
    },
    {
      path: "/hr/roles",
      element: <RolesPage />,
    },
    {
      path: "/employee/login",
      element: <LoginPageEmployee />,
    },
    {
      path: "/employee/details",
      element: <EmployeeDetails />,
    },
    {
      path: "/hr/applications",
      element: <ApplicationsPage />,
    },
    {
      path: "/hr/training",
      element: <Training />,
    },
    {
      path: "/hr/goals",
      element: <Goals />,
    },
  ];
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // disabling caching and background reloading during testing
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            retry: false,
          },
        },
      })
  );
  const mainRouting = useRoutes(MainRoutes);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ScrollToTop />
          <Suspense fallback={<Loader />}>{mainRouting}</Suspense>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
