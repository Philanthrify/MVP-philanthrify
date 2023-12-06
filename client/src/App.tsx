import { useMemo } from "react";
import { themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "@/scenes/register";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Login from "./scenes/login";
import PrivateRoute from "@/components/Routes/PrivateRoute";
import AddProject from "./scenes/project/AddProject";
import Explore from "./scenes/explore";
import ProjectPage from "./scenes/project/XProject";
import Profile from "./scenes/profile";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<Explore />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addproject" element={<AddProject />} />
              <Route path="/project/:projectId" element={<ProjectPage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
