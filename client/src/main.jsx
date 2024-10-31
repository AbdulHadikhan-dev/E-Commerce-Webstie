import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // or any valid color code
    },
  },
});

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-uj3eub3g6fo2poov.us.auth0.com"
    clientId="qkN0ZCwqn1V2mrt083FajexdFACUhIXq"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <StrictMode>
            <App />
          </StrictMode>
        </ThemeProvider>
      </ChakraProvider>
    </Provider>
  </Auth0Provider>
);
