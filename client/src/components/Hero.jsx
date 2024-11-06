// import Category from "./Category";
import Product from "./Product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const product = useSelector((state) => state.product.value);

  function getData() {
    setProducts(product);
  }

  useEffect(() => {
    getData();
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [product]);

  const favoraites = useSelector((state) => state.favorites.value);
  // const dispatch = useDispatch();

  const handleScrollToShop = () => {
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-section min-h-screen relative">
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')",
            transform: `translateY(${scrollPosition * 0.5}px)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
            Discover Your Style
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-center mb-8">
            Shop the latest trends in fashion and accessories
          </p>
          <Link
            to={"/results/search?q=all"}
            onClick={handleScrollToShop}
            className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold flex items-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200"
          >
            Shop Now
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"
          aria-hidden="true"
        ></div>
      </div>

      <div className="product px-5 lg:px-12 mt-10">
        <div className="1">
          <div className="latest-product sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            Latest Product
          </div>
        </div>
      </div>
      <div className="product-continer flex flex-wrap justify-between xl:justify-start gap-y-6 px-5 lg:px-12 mt-6">
        {products.map((product) => {
          // favoraites.forEach((item) => {
          //   if (item.id === product.id) {
          //     product.favorite = true;
          //   }
          // });
          // console.log(product.favorite);
          return (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              brand={product.brand}
              rating={product.rating}
              price={product.price}
              discount={product.discount}
              reviews={product.reviews}
              stock={product.stock}
              image={product.images[0]}
              // favorite={product.favorite}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
