import { useState } from "react";
import { FaUpload, FaTags, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../Redux/ProductSlice";

const AddProductPage = () => {
  const product = useSelector((state) => state.product.value);
  const [formData, setFormData] = useState({
    id: product.length + 1,
    title: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
    rating: "",
    discountPercentage: "",
    categories: [],
    images: [],
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Toys",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = formData.categories.includes(category)
      ? formData.categories.filter((c) => c !== category)
      : [...formData.categories, category];
    setFormData({ ...formData, categories: updatedCategories });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: [...formData.images, URL.createObjectURL(...files)],
    });
    console.log(formData);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "title":
        if (!value.trim()) newErrors.title = "Product name is required";
        else delete newErrors.title;
        break;
      case "images":
        if (value.length > 0) newErrors.images = "Product Images is required";
        else delete newErrors.images;
        break;
      case "price":
        if (!value || isNaN(parseFloat(value))) {
          newErrors.price = "Please enter a valid price";
        } else delete newErrors.price;
        break;
      case "quantity":
        if (!value || isNaN(parseInt(value))) {
          newErrors.quantity = "Please enter a valid quantity";
        } else delete newErrors.quantity;
        break;
      case "rating":
        if (!value || isNaN(parseFloat(value))) {
          newErrors.rating = "Please enter a valid rating value";
        } else delete newErrors.rating;
        break;
      case "discountPercentage":
        if (!value || isNaN(parseFloat(value))) {
          newErrors.discountPercentage =
            "Please enter a valid discountPercentage";
        } else delete newErrors.discountPercentage;
        break;
      case "stock":
        if (!value || isNaN(parseFloat(value))) {
          newErrors.stock = "Please enter a valid stock value";
        } else delete newErrors.stock;
        break;
      case "brand":
        if (!value.trim()) {
          newErrors.brand = "Please enter a valid brand";
        } else delete newErrors.brand;
        break;
      case "categories":
        if (value.length > 0)
          newErrors.categories = "Product Categories is required";
        else delete newErrors.categories;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.title.length < 1 ||
      formData.price.length < 1 ||
      formData.stock.length < 1 ||
      formData.rating.length < 1 ||
      formData.discountPercentage.length < 1 ||
      formData.brand.length < 1 ||
      formData.images.length < 1
    ) {
      return false;
    }
    console.log(errors, formData);

    dispatch(addProduct(formData));
    setFormData({
      id: product.length + 1,
      title: "",
      description: "",
      price: "",
      brand: "",
      stock: "",
      rating: "",
      discountPercentage: "",
      categories: [],
      images: [],
    });
  };

  return (
    <div className={`min-h-screen bg-transparent py-6 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.title ? "border-red-500" : ""
                    } py-1`}
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaDollarSign
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                      errors.price ? "border-red-500" : ""
                    } py-1`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black ${
                      errors.brand ? "border-red-500" : ""
                    } py-1`}
                  />
                  {errors.brand && (
                    <p className="mt-2 text-sm text-red-600">{errors.brand}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black${
                      errors.stock ? "border-red-500" : ""
                    } py-1`}
                  />
                  {errors.stock && (
                    <p className="mt-2 text-sm text-red-600">{errors.stock}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="discountPercentage
"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount Percentage
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="discountPercentage"
                    id="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm py-1 border-gray-300 rounded-md text-black ${
                      errors.discountPercentage ? "border-red-500" : ""
                    }`}
                  />
                  {errors.discountPercentage && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.discountPercentage}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black ${
                      errors.rating ? "border-red-500" : ""
                    } py-1`}
                  />
                  {errors.rating && (
                    <p className="mt-2 text-sm text-red-600">{errors.rating}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium text-gray-700"
                >
                  Categories
                </label>
                <div className="mt-1">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategoryChange(category)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          formData.categories.includes(category)
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <FaTags className="mr-2 h-4 w-4" />
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload images</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className=" object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            images: formData.images.filter(
                              (_, i) => i !== index
                            ),
                          })
                        }
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 h-6 w-6 flex justify-center items-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Product
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
