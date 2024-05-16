import Brand from "../models/Brand.js";

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).exec();
    res.status(200).json({
        success : true, 
        brands,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success : false, 
        message: "Error while fetching brands",
        err: error, 
    });
  }
};

const createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({ brand });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success : false, 
        message: "Error while creating brand",
        err: error, 
    });
  }
};


export {getAllBrands,createBrand}