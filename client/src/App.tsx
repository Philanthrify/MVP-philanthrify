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
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/predictions"
                element={<div>predictions page</div>}
              />
            </Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
