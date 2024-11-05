import { useEffect, useState } from "react";
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
// import NotFound from "./components/NotFound";

import { Login } from "./Redux/authenticated";

function App() {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  const admin = useSelector((state) => state.admin.value);
  const authenticated = useSelector((state) => state.authenticated.value);
  const dispatch = useDispatch();

  const [User, setUser] = useState({});
  const [addDetails, setAddDetails] = useState({
    name: "",
    location: "",
    bio: "",
    contact: "",
    address: "",
    sub: "",
  });

  const [image, setImage] = useState("");
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

  const fetchUser = (user) => {
    fetch(
      `${import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL}/api/user/${user.sub}`,
      { mode: "no-cors" }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
        setAddDetails({
          ...addDetails,
          sub: user.sub,
          bio: data.bio ? data.bio : "",
          location: data.location ? data.location : "",
          address: data.address ? data.address : "",
          contact: data.contact ? data.contact : "",
          name: data.name ? data.name : "",
        });
        // console.log("data", data);
        setImage(data.image);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  useEffect(() => {
    if (
      localStorage.getItem("user") !== undefined &&
      localStorage.getItem("user") !== null &&
      localStorage.getItem("user")
    ) {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log("user from local storage", user);

      fetchUser(user);
      checkUser(user);

      console.log(user);
      dispatch(Login());
    }
    if (isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(Login());
    }
  }, [isAuthenticated, user]);

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
          {authenticated ? (
            <main>
              {/* <Navbar1 icons={"text-gray-500"} /> */}
              <Profile
                User={User}
                setUser={setUser}
                addDetails={addDetails}
                setAddDetails={setAddDetails}
                image={image}
                setImage={setImage}
                fetchUser={fetchUser}
              />
              <Footer />
              <Navbar2 varients="fixed bottom-0" />
            </main>
          ) : (
            <button onClick={loginWithRedirect}>Login</button>
          )}
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
          <main>{authenticated && <AdminDashboard />}</main>,
        </ChakraProvider>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
