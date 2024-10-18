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
    domain="dev-uj3eub3g6fo2poov.us.auth0.com"
    clientId="qkN0ZCwqn1V2mrt083FajexdFACUhIXq"
    authorizationParams={{
      redirect_uri: window.location.origin
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
