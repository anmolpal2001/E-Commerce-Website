import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectMessage,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  description: "",
  brand: "",
  colors: [],
  sizes: [],
  rating: 0,
  category: "",
  price: "",
  discountPercentage: "",
  stock: "",
  thumbnail: "",
  images: [],
  highlights: [],
};

function ProductForm() {
  const [formData, setFormData] = useState(initialState);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const message = useSelector(selectMessage);
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    // dispatch(clearSelectedProduct());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!", formData);
    dispatch(createProductAsync(formData));
    setFormData(initialState);
    console.log("Form submitted!", message);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <div className="space-y-12 bg-white p-8 md:p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 xs:grid-cols-6">

              <Input
                label="Product Name"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-full"
              />
              {/* description */}
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    onChange={handleInputChange}
                    name="description"
                    value={formData.description}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>

              {/* brand */}
              <Select
                name="Brand"
                id="brand"
                value={formData.brand}
                onChange={handleInputChange}
                inputOptions={brands}
              />

              {/* category */}
              <Select
                name="Category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                inputOptions={categories}
              />

              <Input
                label="Rating"
                id="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="xs:col-span-full sm:col-span-2"
                type="number"
              />

              {/* colors */}
              <ColorForm formData={formData} setFormData={setFormData} />

              {/* sizes */}
              <SizeForm formData={formData} setFormData={setFormData} />

              {/* price */}
              <Input
                label="Price"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
                className="xs:col-span-full sm:col-span-2"
                type="number"
              />

              {/* discountPercentage */}
              <Input
                label="Discount Percentage"
                id="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                className="xs:col-span-full sm:col-span-2"
                type="number"
              />

              {/* stock */}
              <Input
                label="Stock"
                id="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="xs:col-span-full sm:col-span-2"
                type="number"
              />

              {/* thumbnail */}
              <Input
                label="Thumbnail"
                id="thumbnail"
                value={formData.thumbnail}
                className="xs:col-span-full sm:col-span-6"
                onChange={handleInputChange}
              />

              {/* images */}
              <ImageForm formData={formData} setFormData={setFormData} />

              {/* highlights */}
              <HighlightForm formData={formData} setFormData={setFormData} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to="/">
            <button
              type="button"
              className="text-sm font-semibold px-6 py-1.5 rounded-full bg-gray-300 leading-6 text-gray-900"
            >
              Cancel
            </button>
          </Link>

          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="rounded-full bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="rounded-full bg-indigo-600 px-8 mr-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      )}
    </>
  );
}

export default ProductForm;

const Select = ({ name, id, value, onChange, inputOptions }) => {
  return (
    <div className="xs:col-span-full sm:col-span-3">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {name}
      </label>
      <div className="mt-2">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">{` -- Choose ${name} -- `}</option>
          {inputOptions.map((child) => (
            <option key={child.value} value={child.value}>
              {child.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Input = ({ label, id, value, onChange, className, type }) => {
  return (
    <div className={`${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
          <input
            type={type || "text"}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};

const ColorForm = ({ formData, setFormData }) => {
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [showColorInput, setShowColorInput] = useState(false);

  const handleAddColor = () => {
    if (newColor.trim() !== "") {
      setColors((prevColors) => [...prevColors, newColor.trim()]);
      setNewColor("");
      setShowColorInput(false);
    }
  };

  const handleCheckboxChange = (color) => {
    if (formData.colors.includes(color)) {
      setFormData({
        ...formData,
        colors: formData.colors.filter((c) => c !== color),
      });
    } else {
      setFormData({
        ...formData,
        colors: [...formData.colors, color],
      });
    }
  };

  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="colors"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Colors
        </label>
        <div className="mt-2">
          <div>
            {colors.map((color, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`color-${index}`}
                  value={color}
                  checked={formData.colors.includes(color)}
                  onChange={() => handleCheckboxChange(color)}
                />
                <label htmlFor={`color-${index}`}>{color}</label>
              </div>
            ))}
          </div>
          <div>
            {showColorInput && (
              <div className="flex items-start flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter color name"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="mr-2 w-full sm:w-1/3 "
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-2 bg-[#1F2937] text-white py-2 rounded-md hover:bg-gray-300"
                  >
                    Add New Color
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      setShowColorInput(false);
                      setNewColor("");
                    }}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <span
              className="text-blue-500 cursor-pointer hover:text-blue-700 flex items-center gap-1"
              onClick={() => setShowColorInput(true)}
            >
              Add Color
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const SizeForm = ({ formData, setFormData }) => {
  const sizes = [
    { name: "XXS", inStock: true, id: "xxs" },
    { name: "XS", inStock: true, id: "xs" },
    { name: "S", inStock: true, id: "s" },
    { name: "M", inStock: true, id: "m" },
    { name: "L", inStock: true, id: "l" },
    { name: "XL", inStock: true, id: "xl" },
    { name: "2XL", inStock: true, id: "2xl" },
    { name: "3XL", inStock: true, id: "3xl" },
  ];

  const handleSizeCheckboxChange = (size) => {
    if (formData.sizes.find((s) => s.id === size.id)) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((s) => s.id !== size.id),
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, size],
      });
    }
  };

  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="sizes"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Sizes
        </label>
        <div className="mt-2">
          {sizes.map((size) => (
            <div key={size.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`size-${size.id}`}
                value={formData}
                checked={formData.sizes.find((s) => s.id === size.id)}
                onChange={() => handleSizeCheckboxChange(size)}
              />{" "}
              <label className="mr-3" htmlFor={`size-${size.id}`}>
                {size.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const HighlightForm = ({ formData, setFormData }) => {
  const handleAddHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  const handleHighlightInputChange = (index, value) => {
    const updatedHighlights = [...formData.highlights];
    updatedHighlights[index] = value;
    setFormData((prev) => ({
      ...prev,
      highlights: updatedHighlights,
    }));
  };

  const handleRemoveHighlight = (index) => {
    const updatedHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      highlights: updatedHighlights,
    }));
  };
  return (
    <>
      <div className="xs:col-span-full sm:col-span-6">
        <h3 className="block text-lg my-2 font-medium leading-6 text-gray-900">
          Highlights :
        </h3>
        {formData.highlights.map((image, index) => (
          <div key={index}>
            <label
              htmlFor={`highlight${index}`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image {index + 1}
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  type="text"
                  defaultValue={image}
                  value={formData.highlights[index]}
                  id={`highlight${index}`}
                  onChange={(e) =>
                    handleHighlightInputChange(index, e.target.value)
                  }
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHighlight(index)}
                  className="px-2 bg-[#bd3a3a] text-white py-2 rounded-md hover:bg-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="px-2 bg-[#1F2937] text-white py-2 rounded-md hover:bg-gray-300"
          onClick={handleAddHighlight}
        >
          Add Highlight
        </button>
      </div>
    </>
  );
};

const ImageForm = ({ formData, setFormData }) => {
  const handleImageInputChange = (index, value) => {
    const updatedImages = [...formData.images]; // Create a copy of the images array
    updatedImages[index] = value; // Update the image link at the specified index
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    })); // Update the state with the new images array
  };

  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  return (
    <div className="xs:col-span-full sm:col-span-6">
      <h3 className="block text-lg my-2 font-medium leading-6 text-gray-900">
        Images :
      </h3>
      {formData.images.map((image, index) => (
        <div key={index}>
          <label
            htmlFor={`image${index}`}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Image {index + 1}
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
              <input
                type="text"
                value={formData.images[index]}
                onChange={(e) => handleImageInputChange(index, e.target.value)}
                id={`image${index}`}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="px-2 bg-[#bd3a3a] text-white py-2 rounded-md hover:bg-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="px-2 my-3 bg-[#1F2937] text-white py-2 rounded-md hover:bg-gray-300"
        onClick={handleAddImage}
      >
        Add Image
      </button>
    </div>
  );
};
