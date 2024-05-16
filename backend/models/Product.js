import mongoose from "mongoose";

const discountedPrice = (price, discountPercentage) => {
  const dp = price - (price * discountPercentage) / 100;
  return dp.toFixed(2);
};
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      default: function () {
        return discountedPrice(this.price, this.discountPercentage);
      },
    },
    rating: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand : { 
      type : String,
      required : true,
    },
    category: {
      type : String,
      required : true,
    },
    images: {
      type: [String],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    color : {
      type : String,
    },
    sizes : [
      {
        type : mongoose.Schema.Types.Mixed,
      }
    ],
    deleted : {
      type : Boolean,
      default : false,
    },
    deletedAt : {
      type : Date,
    },
  },
  { timestamps: true }
);

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id.toHexString();
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
