import Category from "../models/Category.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json({
        success : true, 
        categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success : false, 
        message: "Error in getting categories",
        err: error, 
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ 
      success : true,
      category,
     });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success : false, 
        message: "Error while creating category",
        err: error, 
    });
  }
};

export { getAllCategories,createCategory };
