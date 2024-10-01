import Category from "./Category";
import Product from "./Product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";


const Hero = () => {
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  async function getData() {
    const url = "http://localhost:3005/product/all";
    const response = await fetch(url);
    let r = await response.json();
    setProducts(r);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    getData();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <button
            onClick={handleScrollToShop}
            className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold flex items-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200"
          >
            Shop Now
            <FaArrowRight className="ml-2" />
          </button>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"
          aria-hidden="true"
        ></div>
      </div>
      <div className="shop-catgory p-5 lg:px-12 lg:py-6">
        <div className="1 flex justify-between items-center">
          <div className="shop-by-category font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            Shop by Category
          </div>
          <div className="see-all text-gray-400 text-[12px] font-semibold sm:text-sm md:text-base lg:text-lg xl:text-xl cursor-pointer">
            See All
          </div>
        </div>
        <div className="2 overflow-y-hidden flex gap-4 mt-6 md:mt-8 lg:my-12 md:justify-around">
          <Category
            name={"Women"}
            image={
              "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724284800&semt=ais_hybrid"
            }
          />
          <Category
            name={"Men"}
            image={
              "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
            }
          />
          <Category
            name={"Kids"}
            image={
              "https://www.shutterstock.com/image-photo/cute-mixed-race-boy-smiling-600nw-2157922251.jpg"
            }
          />
          <Category
            name={"Baby"}
            image={
              "https://www.familyeducation.com/sites/default/files/styles/max_920w/public/2021-07/100%20Beautiful%20Girl%20Names_Featured.jpg"
            }
          />
          <Category
            name={"Teen"}
            image={
              "https://static.vecteezy.com/system/resources/previews/033/333/394/non_2x/cute-teen-boy-wearing-blank-empty-white-t-shirt-mockup-for-design-template-ai-generated-free-photo.jpg"
            }
          />
        </div>
      </div>
      <div className="product px-5 lg:px-12">
        <div className="1">
          <div className="Curated for you font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            Curated for you
          </div>
        </div>
      </div>
      <div className="product-continer flex flex-wrap justify-between xl:justify-start gap-y-6 px-5 lg:px-12 mt-6">
        {products.map((product) => {
          favoraites.forEach((item) => {
            if (item.id === product._id) {
              product.favorite = true;
            }
          });
          console.log(product.favorite);
          return (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              company={product.company}
              rate={product.rate}
              price={product.price}
              discount={product.discount}
              review={product.review}
              image={product.image}
              favorite={product.favorite}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
