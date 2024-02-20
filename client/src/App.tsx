import { useMemo } from "react";
import { themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  PaletteColor,
  SimplePaletteColorOptions,
} from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "@/scenes/register";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Login from "./scenes/login";
import PrivateRoute from "@/components/Routes/PrivateRoute";
import AddProject from "./scenes/project/AddProject";
import TransactionAdd from "./scenes/transactionAdd";
import Explore from "./scenes/explore";
import ProjectPage from "./scenes/XProject";
import Profile from "./scenes/profile";
import HowItWorks from "./scenes/howItWorks";
import { SnackbarProvider } from "./contexts/snackbarContext";
import { CookiesProvider } from "./contexts/cookiesContext";
import Footer from "./scenes/footer";
import CharityPage from "./scenes/XCharity";

declare module "@mui/material/styles" {
  interface Palette {
    white: PaletteColor;
  }

  interface PaletteOptions {
    white: SimplePaletteColorOptions;
  }
}

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CookiesProvider>
            <CssBaseline />
            <Box
              display="flex"
              flexDirection="column"
              minHeight="100vh"
              padding="1rem 2rem"
            >
              {" "}
              <Box flexShrink={0}>
                <Navbar />
              </Box>
              <Box flex="1 0 auto" padding="2rem 2rem">
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Explore />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/project/:projectId" element={<ProjectPage />} />
                  <Route
                    path="/charity/:ukCharityNumber"
                    element={<CharityPage />}
                  />

                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/addproject" element={<AddProject />} />
                    <Route
                      path="/addtransaction"
                      element={<TransactionAdd />}
                    />

                    <Route path="/profile" element={<Profile />} />
                  </Route>
                </Routes>{" "}
              </Box>
              <Box flexShrink={0}>
                <Footer />
              </Box>
            </Box>
          </CookiesProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
