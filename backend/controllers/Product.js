import Product from "../models/Product.js";

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Product with this name already exists",
      });
    }
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating product, Please try again",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { _sort, _order, brand, category } = req.query;
    const query = {};
    if(!req.query.admin){
      query.deleted={$ne:true}
    }
    let categoryArray = [];
    let brandArray = [];
    let sortQuery = {};
    if (brand) {
      brandArray = brand.split(",");
      query.brand = brandArray;
    }
    if (category) {
      categoryArray = category.split(",");
      query.category = categoryArray;
    }
    if (_sort && _order) {
      sortQuery[_sort] = _order === 'asc' ? 1 : -1;
    }
    console.log(sortQuery)
    const products = await Product.find(query).sort(sortQuery || null);
    const totalDocs = await Product.countDocuments(query);
    res.set("X-Total-Count", totalDocs);
    res.status(200).json({
      success: true,
      products,
      totalDocs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting products, Please try again",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Product not found" });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (req.body.deleted) {
      console.log("Deleted");
      const deletedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { deleted: true, deletedAt: Date.now() },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        deletedProduct,
        message: "Product deleted successfully",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    console.log(updatedProduct);
    res.status(200).json({
      success: true,
      updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
};

export { createProduct, getAllProducts, getProductById, updateProduct };
