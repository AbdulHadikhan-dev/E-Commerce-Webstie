import "./App.css";
import "swiper/css";
import Navbar1 from "./components/Navbar1";
import Navbar2 from "./components/Navbar2";
import Hero from "./components/Hero";
import ProductDetail from "./components/ProductDetail";
import CartProduct from "./components/CartProduct";
import Profile from "./components/Profile";
import WishList from "./components/WishList";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import Result from "./components/Result";
import Search from "./components/Search";
import Navigation from "./components/Navigation";
import Login from "./components/Login";

import { ChakraProvider } from "@chakra-ui/react";
import AdminDashboard from "./components/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Provider store={store}>
          <main>
            <Navbar1 varients={"absolute w-full top-0 z-20 bg-black"} icons={"text-white"} logo={"text-white"}/>
            <Hero />
            <Footer />
            <Navbar2 varients="fixed bottom-0" />
          </main>
        </Provider>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <ChakraProvider>
          <Provider store={store}>
            <main>
              <Navbar1 varients="max-lg:hidden" icons={"text-gray-500"}/>
              <ProductDetail />
              <Footer />
              <Navbar2 varients="fixed bottom-0" />
            </main>
          </Provider>
        </ChakraProvider>
      ),
    },
    {
      path: "/cart",
      element: (
        <ChakraProvider>
          <Provider store={store}>
            <main>
            <Navbar1 varients={"max-lg:hidden"} icons={"text-gray-500"}/>
              <CartProduct />
              <Footer />
              <Navbar2 varients="fixed bottom-0" />
            </main>
          </Provider>
        </ChakraProvider>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <ChakraProvider>
          <Provider store={store}>
            <main>
              <Navbar1 icons={"text-gray-500"}/>
              <WishList />
              <Footer />
              <Navbar2 varients="fixed bottom-0" />
            </main>
          </Provider>
        </ChakraProvider>
      ),
    },
    {
      path: "/profile",
      element: (
        <ChakraProvider>
          <Provider store={store}>
            <main>
              <Navbar1 icons={"text-gray-500"}/>
              <Profile />
              <Footer />
              <Navbar2 varients="fixed bottom-0" />
            </main>
          </Provider>
        </ChakraProvider>
      ),
    },
    {
      path: "/search",
      element: (
        <Provider store={store}>
          <main>
            <Navigation heading="Search Product" />
            <Search />
          </main>
        </Provider>
      ),
    },
    {
      path: "/results/:search",
      element: (
        <ChakraProvider>
          <Provider store={store}>
            <main>
              <Navbar1 icons={"text-gray-500"} logo={"text-white"}/>
              <Result />
              <Footer />
              <Navbar2 varients="fixed bottom-0" />
            </main>
          </Provider>
        </ChakraProvider>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Provider store={store}>
          <main>
            <AdminDashboard />
          </main>
        </Provider>
      ),
    },
    {
      path: "/login",
      element: (
        <Provider store={store}>
          <main>
            <Login />
          </main>
        </Provider>)
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
