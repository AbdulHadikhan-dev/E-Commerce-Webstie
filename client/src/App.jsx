import { useEffect } from "react";
import "./App.css";
import Navbar1 from "./components/Navbar1";
import Navbar2 from "./components/Navbar2";
import Hero from "./components/Hero";
import ProductDetail from "./components/ProductDetail";
import CartProduct from "./components/CartProduct";
import Profile from "./components/Profile";
import WishList from "./components/WishList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import Result from "./components/Result";
import Search from "./components/Search";
import Navigation from "./components/Navigation";

import { useAuth0 } from "@auth0/auth0-react";

import { ChakraProvider } from "@chakra-ui/react";
import AdminDashboard from "./components/Dashboard";

import { useSelector, useDispatch } from "react-redux";
import { createdAdmin } from "./Redux/isAdminSlice";
import NotFound from "./components/NotFound";

function App() {
  const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } =
    useAuth0();

  const admin = useSelector((state) => state.admin.value);
  const dispatch = useDispatch();

  // console.log(user, "env",import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL);

  const checkUser = async (user) => {
    let request = await fetch(
      `${import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL}/api/user/find/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, isAdmin: false }),
      }
    );
    let response = await request.json();
    console.log(response);
    if (response.findUser.isAdmin) {
      dispatch(createdAdmin());
      console.log("Admin", admin);
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      // Check if the user is already logged in by looking at localStorage
      const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");

      if (isUserLoggedIn) {
        try {
          // Try to get a token silently to verify if the session is still active
          await getAccessTokenSilently();
          if (!localStorage.getItem("user") && user) {
            // If the user is authenticated and not stored in localStorage, save them
            localStorage.setItem("user", JSON.stringify(user));
          }
        } catch (error) {
          console.error("Silent authentication failed:", error);
          // If silent auth fails, clear the logged-in status and redirect to login
          localStorage.removeItem("isUserLoggedIn");
          localStorage.removeItem("user");
          loginWithRedirect();
        }
      } else if (!isAuthenticated) {
        // If not logged in, do nothing. User remains logged out.
        console.log("User is not logged in.");
      }
    };

    authenticateUser();
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect, user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <main>
          <Navbar1
            varients={"absolute w-full top-0 z-20 bg-black"}
            icons={"text-white"}
            logo={"text-white"}
          />
          <Hero />
          <Footer />
          <Navbar2 varients="fixed bottom-0" />
        </main>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <main>
          <Navbar1 varients="max-lg:hidden" icons={"text-gray-500"} />
          <ProductDetail />
          <Footer />
          <Navbar2 varients="fixed bottom-0" />
        </main>
      ),
    },
    {
      path: "/cart",
      element: (
        <ChakraProvider>
          <main>
            <Navbar1 varients={"max-lg:hidden"} icons={"text-gray-500"} />
            <CartProduct />
            <Footer />
            <Navbar2 varients="fixed bottom-0" />
          </main>
        </ChakraProvider>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <ChakraProvider>
          <main>
            <Navbar1 icons={"text-gray-500"} />
            <WishList />
            <Footer />
            <Navbar2 varients="fixed bottom-0" />
          </main>
        </ChakraProvider>
      ),
    },
    {
      path: "/profile",
      element: (
        <ChakraProvider>
          <main>
            {/* <Navbar1 icons={"text-gray-500"} /> */}
            <Profile />
            <Footer />
            <Navbar2 varients="fixed bottom-0" />
          </main>
        </ChakraProvider>
      ),
    },
    {
      path: "/search",
      element: (
        <main>
          <Navigation heading="Search Product" />
          <Search />
        </main>
      ),
    },
    {
      path: "/results/:search",
      element: (
        <ChakraProvider>
          <main>
            <Navbar1 icons={"text-gray-500"} />
            <Result />
            <Footer />
            <Navbar2 varients="fixed bottom-0" />
          </main>
        </ChakraProvider>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ChakraProvider>
          <main>{admin ? <AdminDashboard /> : <NotFound />}</main>,
        </ChakraProvider>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
