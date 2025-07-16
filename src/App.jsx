import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EventsPage from "./pages/Events";
import Sidebar from "./components/SideBar";
import PrivateRoute from "./components/PrivateRoutes";
import AuthPage from "./pages/Authpage";
import { EventsProvider } from "./context/context";

function App() {
  return (
    <EventsProvider>
      <Router>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 h-screen overflow-y-auto bg-gray-50 p-4">
            <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/events"
                element={
                  <PrivateRoute>
                    <EventsPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </EventsProvider>
  );
}

export default App;
