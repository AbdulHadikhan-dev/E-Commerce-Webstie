import { useState } from "react";
import { FaUpload, FaTags, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";

const AddProductPage = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
    colors: [],
    sizes: [],
    categories: [],
    images: [],
  });
  const [errors, setErrors] = useState({});

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
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "name":
        if (!value.trim()) newErrors.name = "Product name is required";
        else delete newErrors.name;
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
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform final validation and submit
    // fetch("https://dummyjson.com/products/add", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     title: "BMW Pencil",
    //     /* other product data */
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(console.log);
    console.log("Form submitted:", formData);
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
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.name ? "border-red-500" : ""
                    } py-1`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
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
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="barnd"
                    id="barnd"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black ${
                      errors.brand ? "border-red-500" : ""
                    } py-1`}
                  />
                
                </div>
              </div>
              <div>
                <label
                  htmlFor="quantity"
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
                </div>
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Colors (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="color"
                    id="color"
                    value={formData.colors}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm py-1 border-gray-300 rounded-md text-black ${
                      errors.colors ? "border-red-500" : ""
                    }`}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="sizes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sizes (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="size"
                    id="size"
                    value={formData.sizes}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black ${
                      errors.sizes ? "border-red-500" : ""
                    } py-1`}
                  />
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
                        src={URL.createObjectURL(image)}
                        alt={`Product image ${index + 1}`}
                        className="h-24 w-24 object-cover rounded-md"
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
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
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
