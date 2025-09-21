import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/page";
import SignupPage from "./components/SignUp";
import { ProtectedRoute } from "./components/protected-route";

// Placeholder Dashboard component
const Dashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p>Welcome to your secure dashboard!</p>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other protected routes here */}
      </Route>
    </Routes>
  );
}

export default App;
