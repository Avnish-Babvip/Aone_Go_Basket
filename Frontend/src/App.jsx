import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRouter, maintenanceAppRouter } from "./routes/routes";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getMaintenanceStatus } from "./features/actions/maintenance";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { maintenanceData } = useSelector((state) => state.maintenance);
  const status = maintenanceData?.is_active;
  useEffect(() => {
    dispatch(getMaintenanceStatus());
  }, []);

  return (
    <HelmetProvider>
      <Toaster richColors containerClassName="overflow-auto" />
      <RouterProvider
        key={status || "default"} // Ensures re-render when settings change
        router={status ? appRouter : maintenanceAppRouter}
      />
    </HelmetProvider>
  );
}

export default App;
