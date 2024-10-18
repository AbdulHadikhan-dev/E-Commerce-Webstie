import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-wygy0ul738msql5i.us.auth0.com"
    clientId="6xoXGKSsDZkD7PbTMvQ8uKP9Z2CSsyRo"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <ChakraProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ChakraProvider>
    </Provider>
  </Auth0Provider>
);
